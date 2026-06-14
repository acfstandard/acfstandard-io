type SatellitePos = "top" | "right" | "bottom" | "left";

function Satellite({
  pos,
  icon,
  name,
  sub,
}: {
  pos: SatellitePos;
  icon: React.ReactNode;
  name: string;
  sub: string;
}) {
  const placement: Record<SatellitePos, string> = {
    top: "top-[4%] left-1/2 -translate-x-1/2",
    right: "top-1/2 right-0 -translate-y-1/2",
    bottom: "bottom-[4%] left-1/2 -translate-x-1/2",
    left: "top-1/2 left-0 -translate-y-1/2",
  };
  return (
    <div className={`absolute z-10 ${placement[pos]}`}>
      <div className="acf-sat flex items-center gap-2.5 rounded-[10px] border border-gold/30 bg-navy-900/[0.95] px-3.5 py-2.5 backdrop-blur-md transition hover:border-gold">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[7px] border border-bd bg-gold-dim text-gold">
          {icon}
        </div>
        <div className="leading-tight">
          <div className="font-display text-[13px] font-bold text-white">{name}</div>
          <div className="font-mono text-[10.5px] text-gr">{sub}</div>
        </div>
      </div>
    </div>
  );
}

export function HeroVisual() {
  return (
    <div className="acf-hero-vis relative mx-auto flex h-[420px] w-full max-w-[480px] items-center justify-center md:h-[480px]">
      {/* Connector lines — subtle */}
      <svg
        className="absolute inset-0 h-full w-full opacity-30"
        viewBox="0 0 480 480"
        fill="none"
        preserveAspectRatio="xMidYMid meet"
      >
        <line x1="240" y1="80" x2="240" y2="200" stroke="#c9a84c" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="400" y1="240" x2="280" y2="240" stroke="#c9a84c" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="240" y1="400" x2="240" y2="280" stroke="#c9a84c" strokeWidth="0.5" strokeDasharray="2 4" />
        <line x1="80" y1="240" x2="200" y2="240" stroke="#c9a84c" strokeWidth="0.5" strokeDasharray="2 4" />
      </svg>

      {/* Central orb with pulsing rings */}
      <div className="acf-orb relative h-40 w-40 shrink-0">
        <div className="acf-ring absolute inset-0 rounded-full border-[1.5px] border-gold" />
        <div className="acf-ring-out absolute -inset-2.5 rounded-full border border-gold/30" />
        <div
          className="absolute inset-[14px] flex flex-col items-center justify-center rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%, #142a52 0%, #0d1f3c 60%, #050c1a 100%)",
          }}
        >
          <span className="font-display text-[26px] font-extrabold leading-none text-gold">
            ACF
          </span>
          <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.14em] text-gr">
            Standard
          </span>
        </div>
      </div>

      {/* 4 satellites */}
      <Satellite
        pos="top"
        name="Sovereignty"
        sub="Score™"
        icon={
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
            <path d="M10 2 L13 8 L19 9 L14.5 13.5 L16 19 L10 16 L4 19 L5.5 13.5 L1 9 L7 8 Z" fill="currentColor" opacity="0.85" />
          </svg>
        }
      />
      <Satellite
        pos="right"
        name="MCP tools"
        sub="12 signed"
        icon={
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <rect x="3" y="3" width="6" height="6" rx="1" />
            <rect x="11" y="3" width="6" height="6" rx="1" />
            <rect x="3" y="11" width="6" height="6" rx="1" />
            <rect x="11" y="11" width="6" height="6" rx="1" />
          </svg>
        }
      />
      <Satellite
        pos="bottom"
        name="Mappings"
        sub="17×5 matrix"
        icon={
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 10h14M10 3v14M3 5h6M3 15h6M11 5h6M11 15h6" />
          </svg>
        }
      />
      <Satellite
        pos="left"
        name="Doctrine"
        sub="Ed25519"
        icon={
          <svg width="14" height="14" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M10 2 L17 5 V11 C17 14 14 17 10 18 C6 17 3 14 3 11 V5 Z" />
            <path d="M7 10 L9 12 L13 8" />
          </svg>
        }
      />
    </div>
  );
}
