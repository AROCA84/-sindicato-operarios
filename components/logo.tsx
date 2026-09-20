export function Logo({
  className,
  showText = true,
}: {
  className?: string;
  showText?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <svg
        viewBox="0 0 64 64"
        role="img"
        aria-label="Logo del Sindicato de Operarios"
        className="h-11 w-11 shrink-0"
      >
        {/* Escudo azul marino */}
        <path
          d="M32 2 6 11v20c0 16 11.5 25.6 26 31 14.5-5.4 26-15 26-31V11L32 2Z"
          fill="#0e2340"
          stroke="#ffc400"
          strokeWidth="2.5"
        />
        {/* Engranaje */}
        <g transform="translate(32 30)">
          <g fill="#16345e">
            {Array.from({ length: 8 }).map((_, i) => (
              <rect
                key={i}
                x="-2"
                y="-15"
                width="4"
                height="6"
                rx="1"
                transform={`rotate(${i * 45})`}
              />
            ))}
          </g>
          <circle r="10" fill="#16345e" />
          <circle r="4.5" fill="#0e2340" />
        </g>
        {/* Casco de seguridad amarillo */}
        <g transform="translate(32 27)">
          <path
            d="M-13 6c0-8 5.8-13 13-13s13 5 13 13v1H-13V6Z"
            fill="#ffc400"
          />
          <rect x="-16" y="6.5" width="32" height="4" rx="2" fill="#ffc400" />
          <rect x="-2.5" y="-6.5" width="5" height="6" rx="1.5" fill="#e0aa00" />
        </g>
      </svg>
      {showText && (
        <div className="leading-tight">
          <span className="block text-sm font-black uppercase tracking-wide text-white sm:text-base">
            Sindicato de <span className="text-safety">Operarios</span>
          </span>
          <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-white/60">
            Formación Profesional
          </span>
        </div>
      )}
    </div>
  );
}
