interface StatItemProps {
  label: string;
  value: string | number;
  unit?: string;
  status?: "good" | "warn" | "bad" | "neutral";
  trend?: "up" | "down";
  size?: "sm" | "md" | "lg";
}

const StatItem = ({ label, value, unit, status = "neutral", trend, size = "md" }: StatItemProps) => {
  const statusClass = status === "good" ? "status-good" : status === "warn" ? "status-warn" : status === "bad" ? "status-bad" : "data-value";
  const sizeClass = size === "lg" ? "text-2xl" : size === "sm" ? "text-base" : "text-xl";

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] text-muted-foreground tracking-wide">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`${sizeClass} font-display font-semibold ${statusClass}`}>{value}</span>
        {unit && <span className="text-[10px] text-muted-foreground">{unit}</span>}
        {trend && (
          <span className={`text-[10px] ml-0.5 ${trend === "up" ? "status-good" : "status-bad"}`}>
            {trend === "up" ? "▲" : "▼"}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatItem;
