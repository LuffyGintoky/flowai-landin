'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';

const CHAT_API_URL = process.env.NEXT_PUBLIC_CHAT_API_URL || 'http://localhost:3000';

type Message = { role: 'user' | 'assistant'; content: string };

function parseSSEData(raw: string): string {
  if (raw.startsWith('"')) {
    try { return JSON.parse(raw); } catch { /* fallback */ }
  }
  return raw;
}

function normalizeMarkdown(text: string): string {
  let out = text.replace(/\*\*\s*([^*]+?)\s*\*\*/g, '**$1**');
  out = out.replace(/([a-záéíóúñ])(\*\*)(?=[a-záéíóúñA-Z])/gi, '$1 $2');
  return out;
}

const IconChat = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
  </svg>
);

const IconSend = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <line x1="22" y1="2" x2="11" y2="13"/>
    <polygon points="22 2 15 22 11 13 2 9 22 2"/>
  </svg>
);

const IconLoader = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="la-chatw-spin" aria-hidden="true">
    <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
  </svg>
);

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [streaming, setStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const text = input.trim();
    if (!text || streaming) return;

    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);
    setStreaming(true);

    try {
      const res = await fetch(`${CHAT_API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok || !res.body) throw new Error(res.statusText || 'Error al conectar');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantContent = '';
      let buffer = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });
        const parts = buffer.split('\n\n');
        buffer = parts.pop() ?? '';
        for (const part of parts) {
          const trimmed = part.trim();
          if (trimmed.startsWith('data: ')) {
            const raw = trimmed.slice(6).trim();
            if (raw === '[DONE]' || raw === '[ERROR]') continue;
            assistantContent += parseSSEData(raw);
            setMessages(prev => {
              const next = [...prev];
              const last = next[next.length - 1];
              if (last?.role === 'assistant') next[next.length - 1] = { ...last, content: assistantContent };
              return next;
            });
          }
        }
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error de conexión';
      setError(message);
      setMessages(prev => {
        const next = [...prev];
        const last = next[next.length - 1];
        if (last?.role === 'assistant' && last.content === '') {
          next[next.length - 1] = { role: 'assistant', content: `No pude conectar con el asistente. (${message})` };
        }
        return next;
      });
    } finally {
      setStreaming(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className={`la-chatw-btn${open ? ' is-open' : ''}`}
        aria-label={open ? 'Cerrar asistente' : 'Abrir asistente Flow AI'}
        aria-expanded={open}
      >
        <IconChat />
        {!open && <span>¿Tienes dudas?</span>}
        {open && <span>✕</span>}
      </button>

      <div className={`la-chatw-modal${open ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="chatw-title" aria-hidden={!open}>
        <div className="la-chatw-hd">
          <div className="la-chatw-hd-left">
            <div className="la-chatw-avatar">FA</div>
            <div>
              <div className="la-chatw-hd-name" id="chatw-title">Asistente Flow AI</div>
              <div className="la-chatw-hd-status">
                <span className="la-chatw-dot" aria-hidden="true" />
                En línea
              </div>
            </div>
          </div>
          <button
            type="button"
            className="la-chatw-close"
            onClick={() => setOpen(false)}
            aria-label="Cerrar"
          >✕</button>
        </div>

        <div className="la-chatw-body">
          {messages.length === 0 && (
            <p className="la-chatw-empty">
              Hola. Escribí tu pregunta sobre Flow AI o cómo agendar una demo.
            </p>
          )}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`la-chatw-msg ${msg.role === 'user' ? 'la-chatw-msg-user' : 'la-chatw-msg-ai'}`}
            >
              {msg.role === 'assistant' && msg.content ? (
                <div className="la-chatw-markdown">
                  <ReactMarkdown>{normalizeMarkdown(msg.content)}</ReactMarkdown>
                  {streaming && i === messages.length - 1 && (
                    <span className="la-chatw-cursor" aria-hidden="true" />
                  )}
                </div>
              ) : msg.role === 'assistant' && streaming && i === messages.length - 1 ? (
                <span className="la-chatw-typing">Escribiendo…</span>
              ) : msg.role === 'user' ? (
                msg.content
              ) : null}
            </div>
          ))}
          {error && <p className="la-chatw-error">{error}</p>}
          <div ref={messagesEndRef} />
        </div>

        <form className="la-chatw-foot" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Escribí tu pregunta…"
            disabled={streaming}
            className="la-chatw-input"
            aria-label="Mensaje"
          />
          <button
            type="submit"
            disabled={!input.trim() || streaming}
            className="la-chatw-send"
            aria-label="Enviar"
          >
            {streaming ? <IconLoader /> : <IconSend />}
          </button>
        </form>
      </div>
    </>
  );
}
