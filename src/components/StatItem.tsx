interface StatItemProps {
  label: string;
  value: string | number;
  unit?: string;
  status?: "good" | "warn" | "bad" | "neutral";
  trend?: "up" | "down";
}

const StatItem = ({ label, value, unit, status = "neutral", trend }: StatItemProps) => {
  const statusClass = status === "good" ? "status-good" : status === "warn" ? "status-warn" : status === "bad" ? "status-bad" : "data-value";

  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs text-muted-foreground tracking-wide">{label}</span>
      <div className="flex items-baseline gap-1">
        <span className={`text-xl font-display font-semibold ${statusClass}`}>{value}</span>
        {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
        {trend && (
          <span className={`text-xs ml-1 ${trend === "up" ? "status-good" : "status-bad"}`}>
            {trend === "up" ? "▲" : "▼"}
          </span>
        )}
      </div>
    </div>
  );
};

export default StatItem;
