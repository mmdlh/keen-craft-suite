interface StatusBadgeProps {
  status: "运行中" | "待机" | "故障" | "维护" | "良好" | "警告" | "异常";
}

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const styles: Record<string, string> = {
    "运行中": "bg-glow-success/15 text-glow-success border-glow-success/30",
    "良好": "bg-glow-success/15 text-glow-success border-glow-success/30",
    "待机": "bg-primary/10 text-primary border-primary/30",
    "故障": "bg-glow-danger/15 text-glow-danger border-glow-danger/30",
    "异常": "bg-glow-danger/15 text-glow-danger border-glow-danger/30",
    "维护": "bg-glow-warn/15 text-glow-warn border-glow-warn/30",
    "警告": "bg-glow-warn/15 text-glow-warn border-glow-warn/30",
  };

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs border font-medium ${styles[status] || styles["待机"]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-glow" />
      {status}
    </span>
  );
};

export default StatusBadge;
