import GlowCard from "@/components/GlowCard";
import StatItem from "@/components/StatItem";
import StatusBadge from "@/components/StatusBadge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from "recharts";

const alerts = [
  { id: 1, device: "CNC-004", type: "轴承温度异常", level: "警告" as const, time: "14:28", detail: "主轴温度达47°C，超过阈值45°C" },
  { id: 2, device: "CNC-005", type: "伺服驱动故障", level: "异常" as const, time: "13:52", detail: "X轴伺服驱动器报错E-07" },
  { id: 3, device: "CNC-001", type: "刀具寿命预警", level: "警告" as const, time: "12:15", detail: "T03刀具已加工2,847件，建议更换" },
  { id: 4, device: "CNC-006", type: "润滑油位低", level: "警告" as const, time: "11:30", detail: "润滑油位低于30%，请补充" },
  { id: 5, device: "CNC-002", type: "振动超标", level: "警告" as const, time: "10:45", detail: "Y轴振动值2.8mm/s，正常范围<2.5" },
];

const vibrationData = Array.from({ length: 30 }, (_, i) => ({
  t: i,
  x: 1.2 + Math.sin(i * 0.8) * 0.8 + Math.random() * 0.3,
  y: 1.5 + Math.cos(i * 0.6) * 0.6 + Math.random() * 0.4,
  z: 0.8 + Math.sin(i * 1.2) * 0.4 + Math.random() * 0.2,
}));

const maintenancePlan = [
  { device: "CNC-003", task: "主轴轴承更换", due: "3/5", status: "待执行", priority: "高" },
  { device: "CNC-007", task: "数控系统升级", due: "3/3", status: "进行中", priority: "中" },
  { device: "CNC-001", task: "刀具更换 T03", due: "3/2", status: "待执行", priority: "高" },
  { device: "CNC-006", task: "润滑系统保养", due: "3/4", status: "待执行", priority: "低" },
];

const healthScores = [
  { name: "CNC-001", score: 82 },
  { name: "CNC-002", score: 78 },
  { name: "CNC-003", score: 45 },
  { name: "CNC-004", score: 71 },
  { name: "CNC-005", score: 23 },
  { name: "CNC-006", score: 88 },
  { name: "CNC-007", score: 56 },
  { name: "CNC-008", score: 91 },
];

const MaintenanceAlerts = () => (
  <div className="grid grid-cols-12 gap-3">
    {/* Top stats */}
    <GlowCard className="col-span-2" title="预警统计">
      <div className="space-y-3">
        <StatItem label="今日预警" value={12} status="warn" />
        <StatItem label="严重告警" value={2} status="bad" />
        <StatItem label="已处理" value={7} status="good" />
        <StatItem label="平均响应" value="8.5" unit="min" />
      </div>
    </GlowCard>

    {/* Alerts list */}
    <GlowCard className="col-span-6" title="实时预警信息" variant="warn">
      <div className="space-y-2">
        {alerts.map((a) => (
          <div key={a.id} className="glass-panel-accent rounded p-2.5 flex items-start gap-3 hover:bg-secondary/30 transition-colors">
            <StatusBadge status={a.level} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-display text-xs text-primary">{a.device}</span>
                <span className="text-sm text-foreground font-medium">{a.type}</span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{a.detail}</p>
            </div>
            <span className="text-[10px] text-muted-foreground font-display shrink-0">{a.time}</span>
          </div>
        ))}
      </div>
    </GlowCard>

    {/* Health scores */}
    <GlowCard className="col-span-4" title="设备健康度评分">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={healthScores} layout="vertical" margin={{ left: 5 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={55} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 12 }} />
          <Bar dataKey="score" radius={[0, 3, 3, 0]} barSize={10}>
            {healthScores.map((entry, i) => (
              <Cell key={i} fill={entry.score > 80 ? "hsl(145,70%,45%)" : entry.score > 50 ? "hsl(35,100%,55%)" : "hsl(0,70%,50%)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Vibration chart */}
    <GlowCard className="col-span-6" title="CNC-002 振动监测 (实时)">
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={vibrationData}>
          <XAxis dataKey="t" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} domain={[0, 3]} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 12 }} />
          <Line type="monotone" dataKey="x" stroke="hsl(190,100%,50%)" strokeWidth={1.5} dot={false} name="X轴" />
          <Line type="monotone" dataKey="y" stroke="hsl(35,100%,55%)" strokeWidth={1.5} dot={false} name="Y轴" />
          <Line type="monotone" dataKey="z" stroke="hsl(170,80%,45%)" strokeWidth={1.5} dot={false} name="Z轴" />
        </LineChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Maintenance plan */}
    <GlowCard className="col-span-6" title="维护计划">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-muted-foreground border-b border-border/30">
            <th className="text-left py-2 px-2 font-medium">设备</th>
            <th className="text-left py-2 px-2 font-medium">任务</th>
            <th className="text-left py-2 px-2 font-medium">截止</th>
            <th className="text-left py-2 px-2 font-medium">状态</th>
          </tr>
        </thead>
        <tbody>
          {maintenancePlan.map((m, i) => (
            <tr key={i} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
              <td className="py-2 px-2 font-display text-xs text-primary">{m.device}</td>
              <td className="py-2 px-2 text-foreground">{m.task}</td>
              <td className="py-2 px-2 text-muted-foreground">{m.due}</td>
              <td className="py-2 px-2">
                <span className={`text-xs ${m.status === "进行中" ? "status-warn" : "text-muted-foreground"}`}>{m.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlowCard>
  </div>
);

export default MaintenanceAlerts;
