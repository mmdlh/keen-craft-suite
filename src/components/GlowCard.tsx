import { ReactNode } from "react";

interface GlowCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "accent" | "warn";
}

const GlowCard = ({ title, children, className = "", variant = "default" }: GlowCardProps) => {
  const borderClass = variant === "accent" ? "glow-border-accent" : variant === "warn" 
    ? "border border-glow-warn/30 shadow-[0_0_8px_hsl(var(--glow-warn)/0.1)]" 
    : "glow-border";

  return (
    <div className={`glass-panel relative rounded-md corner-decoration ${borderClass} ${className}`}>
      {title && (
        <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/50">
          <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse-glow" />
          <h3 className="text-sm font-medium tracking-wide text-foreground">{title}</h3>
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
};

export default GlowCard;
