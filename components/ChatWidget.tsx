"use client";

import { useState } from "react";
import { MessageCircle } from "lucide-react";
import ChatModal from "./ChatModal";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 flex h-14 items-center gap-2 rounded-full bg-primary px-4 pr-5 text-primary-foreground shadow-lg shadow-primary/30 transition-all hover:scale-105 hover:shadow-primary/40 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-dark-bg"
          aria-label="Conversa con nuestro asistente de IA!"
        >
          <MessageCircle size={26} aria-hidden="true" />
          <span className="text-sm font-medium">¿Tienes dudas? ¡Pregúntame!</span>
        </button>
      )}
      <ChatModal open={open} onClose={() => setOpen(false)} floating />
    </>
  );
}
