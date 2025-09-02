"use client";

import React from "react";
import { InlineWidget } from "react-calendly";

interface CalendarProps {
  calendlyUrl?: string;
}

export default function Calendar({ calendlyUrl }: CalendarProps) {
  const url = calendlyUrl || "https://calendly.com/shinsekai-contacto";

  return (
    <section id="contacto-demo" className="bg-dark-bg">
      <div className="w-full pt-20">
        {/* <div className="mb-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Agenda una demo</h2>
          <p className="text-muted-foreground">Selecciona el mejor horario para ti y nuestro equipo te confirmará al instante.</p>
        </div> */}

        {/* Wrapper a pantalla completa menos el header (~80px). Ajusta el 80px si tu header cambia */}
        <div className="w-full h-[calc(100vh-80px)] overflow-hidden">
          <InlineWidget
            url={url}
            styles={{ height: "100%", width: "100%" }}
            pageSettings={{
              backgroundColor: "#0b0d12",
              hideEventTypeDetails: false,
              hideGdprBanner: true,
              primaryColor: "#00FF9D",
              textColor: "#ffffff"
            }}
          />
        </div>
      </div>
    </section>
  );
}


