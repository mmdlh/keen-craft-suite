import { ReactNode } from "react";

interface GlowCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent" | "warn";
  noPadding?: boolean;
}

const GlowCard = ({ title, children, className = "", variant = "default", noPadding = false }: GlowCardProps) => {
  const borderClass = variant === "accent" ? "glow-border-accent" : variant === "warn" 
    ? "border border-glow-warn/30 shadow-[0_0_8px_hsl(var(--glow-warn)/0.1)]" 
    : "glow-border";

  return (
    <div className={`glass-panel relative rounded-lg corner-decoration overflow-hidden ${borderClass} ${className}`}
      style={{
        boxShadow: variant === "default" 
          ? "0 4px 20px hsl(var(--glow-primary) / 0.06), 0 1px 3px hsl(220 25% 0% / 0.4)"
          : variant === "accent"
          ? "0 4px 20px hsl(var(--glow-accent) / 0.08), 0 1px 3px hsl(220 25% 0% / 0.4)"
          : "0 4px 20px hsl(var(--glow-warn) / 0.06), 0 1px 3px hsl(220 25% 0% / 0.4)"
      }}
    >
      {title && (
        <div className="flex items-center gap-2 px-3 py-2 border-b border-border/40"
          style={{ background: "linear-gradient(90deg, hsl(var(--surface-glass) / 0.6), transparent)" }}
        >
          <div className="w-1 h-3 rounded-full bg-primary" style={{ boxShadow: "0 0 6px hsl(var(--glow-primary) / 0.6)" }} />
          <h3 className="text-xs font-medium tracking-wide text-foreground/90 uppercase">{title}</h3>
        </div>
      )}
      <div className={noPadding ? "" : "p-3"}>{children}</div>
    </div>
  );
};

export default GlowCard;
