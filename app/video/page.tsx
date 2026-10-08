"use client";

import { useEffect, useState } from "react";

const scenes = [
  { kicker: "TRABAJO INDUSTRIAL", title: "¿Trabajas con maquinaria?", body: "Carretillas · Grúas · Plataformas · Movimiento de tierras", icon: "⚙️" },
  { kicker: "NACE UNA NUEVA FORMA", title: "SINDICATO DE OPERARIOS", body: "Una plataforma creada para los profesionales de la industria.", icon: "🏭" },
  { kicker: "FORMACIÓN GRATUITA", title: "Afíliate gratis", body: "Accede a formación gratuita y descubre tus cursos antes de empezar.", icon: "✓" },
  { kicker: "TODO EN UN MISMO LUGAR", title: "Cursos · Temarios · Test", body: "Explora, fórmate y demuestra tus conocimientos.", icon: "▣" },
  { kicker: "TU PROFESIÓN CUENTA", title: "Protección y formación", body: "Una comunidad pensada para quienes hacen posible la industria.", icon: "🛡️" },
  { kicker: "SINDICATO DE OPERARIOS", title: "FORMA PARTE", body: "Afíliate gratis.", icon: "→" },
];

export default function VideoPage() {
  const [scene, setScene] = useState(0);
  const [playing, setPlaying] = useState(true);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => {
      setScene((s) => (s + 1) % scenes.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [playing]);

  const current = scenes[scene];

  return (
    <main className="min-h-screen bg-[#071018] text-white">
      <style jsx global>{`
        @keyframes videoIn {
          from { opacity: 0; transform: translateY(28px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes pulseRing {
          0%,100% { transform: scale(.92); opacity:.45; }
          50% { transform: scale(1.08); opacity:.9; }
        }
        @keyframes industrialMove {
          from { transform: translateX(-3%); }
          to { transform: translateX(3%); }
        }
        .video-in { animation: videoIn .7s ease both; }
        .pulse-ring { animation: pulseRing 2.4s ease-in-out infinite; }
        .industrial-move { animation: industrialMove 6s ease-in-out infinite alternate; }
      `}</style>

      <section className="relative mx-auto flex min-h-screen max-w-[430px] flex-col overflow-hidden bg-[#0a151d]">
        <div className="absolute inset-0 opacity-20 industrial-move"
          style={{backgroundImage:"linear-gradient(135deg,transparent 0 45%,#f3b51b 45.2% 45.6%,transparent 45.8% 100%),repeating-linear-gradient(90deg,transparent 0 38px,rgba(255,255,255,.05) 39px 40px)"}} />
        <div className="absolute -right-28 top-20 h-72 w-72 rounded-full border border-[#f3b51b]/30 pulse-ring" />
        <div className="absolute -left-32 bottom-10 h-80 w-80 rounded-full border border-[#f3b51b]/10" />

        <header className="relative z-10 flex items-center justify-between px-7 pt-7">
          <div>
            <div className="text-[10px] font-black uppercase tracking-[.28em] text-[#f3b51b]">SINDICATO</div>
            <div className="text-xl font-black tracking-tight">DE OPERARIOS</div>
          </div>
          <div className="h-10 w-10 rounded-lg border border-[#f3b51b]/50 bg-[#f3b51b]/10 p-2 text-center text-lg">⚙</div>
        </header>

        <div className="relative z-10 flex flex-1 flex-col justify-center px-7">
          <div key={scene} className="video-in">
            <div className="mb-5 inline-flex rounded-full border border-[#f3b51b]/40 bg-[#f3b51b]/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[.2em] text-[#f3b51b]">
              {current.kicker}
            </div>
            <div className="mb-7 text-7xl">{current.icon}</div>
            <h1 className="max-w-[360px] text-5xl font-black leading-[.95] tracking-tight">
              {current.title}
            </h1>
            <p className="mt-6 max-w-[350px] text-lg leading-7 text-slate-300">
              {current.body}
            </p>
          </div>
        </div>

        <footer className="relative z-10 px-7 pb-8">
          <div className="mb-5 flex gap-1.5">
            {scenes.map((_, i) => (
              <button key={i} aria-label={`Escena ${i + 1}`} onClick={() => setScene(i)}
                className={`h-1.5 flex-1 rounded-full transition-all ${i === scene ? "bg-[#f3b51b]" : "bg-white/15"}`} />
            ))}
          </div>
          <div className="flex items-center gap-3">
            <button onClick={() => setPlaying(!playing)}
              className="rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-xs font-black uppercase tracking-wider">
              {playing ? "Pausa" : "Reproducir"}
            </button>
            <div className="flex-1 rounded-xl bg-[#f3b51b] px-5 py-3 text-center text-sm font-black uppercase tracking-wider text-[#071018]">
              Afíliate gratis
            </div>
          </div>
          <p className="mt-4 text-center text-[9px] font-bold uppercase tracking-[.25em] text-white/35">
            Formación · Profesión · Protección
          </p>
        </footer>
      </section>
    </main>
  );
}
