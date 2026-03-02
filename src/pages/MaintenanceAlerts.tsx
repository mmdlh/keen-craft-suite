import GlowCard from "@/components/GlowCard";
import StatItem from "@/components/StatItem";
import StatusBadge from "@/components/StatusBadge";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, Cell, AreaChart, Area } from "recharts";

const alerts = [
  { id: 1, device: "CNC-004", type: "轴承温度异常", level: "警告" as const, time: "14:28", detail: "主轴温度达47°C，超过阈值45°C" },
  { id: 2, device: "CNC-005", type: "伺服驱动故障", level: "异常" as const, time: "13:52", detail: "X轴伺服驱动器报错E-07" },
  { id: 3, device: "CNC-001", type: "刀具寿命预警", level: "警告" as const, time: "12:15", detail: "T03刀具已加工2,847件，建议更换" },
  { id: 4, device: "CNC-006", type: "润滑油位低", level: "警告" as const, time: "11:30", detail: "润滑油位低于30%，请补充" },
  { id: 5, device: "CNC-002", type: "振动超标", level: "警告" as const, time: "10:45", detail: "Y轴振动值2.8mm/s，正常范围<2.5" },
  { id: 6, device: "CNC-008", type: "冷却液温度高", level: "警告" as const, time: "09:20", detail: "冷却液温度38°C，建议检查冷却系统" },
  { id: 7, device: "CNC-003", type: "电机过载", level: "异常" as const, time: "08:15", detail: "主电机电流超过额定值120%" },
];

const vibrationData = Array.from({ length: 40 }, (_, i) => ({
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
  { device: "CNC-004", task: "轴承检查", due: "3/6", status: "已排期", priority: "中" },
  { device: "CNC-008", task: "冷却系统维护", due: "3/7", status: "已排期", priority: "低" },
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
  { name: "CNC-009", score: 85 },
  { name: "CNC-010", score: 74 },
];

const tempTrend = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  spindle: 35 + Math.sin(i * 0.5) * 8 + (i > 8 && i < 20 ? 5 : 0) + Math.random() * 2,
  bearing: 30 + Math.sin(i * 0.4) * 6 + (i > 8 && i < 20 ? 4 : 0) + Math.random() * 2,
  coolant: 22 + Math.sin(i * 0.3) * 5 + (i > 8 && i < 20 ? 6 : 0) + Math.random() * 1,
}));

const alertHistory = [
  { date: "3/1", count: 8 },
  { date: "2/28", count: 12 },
  { date: "2/27", count: 5 },
  { date: "2/26", count: 9 },
  { date: "2/25", count: 3 },
  { date: "2/24", count: 7 },
  { date: "2/23", count: 11 },
];

const sparePartsStatus = [
  { part: "主轴轴承", stock: 4, min: 2, status: "充足" },
  { part: "伺服驱动器", stock: 1, min: 2, status: "不足" },
  { part: "刀具T03", stock: 12, min: 5, status: "充足" },
  { part: "润滑油", stock: 3, min: 5, status: "不足" },
  { part: "密封圈", stock: 20, min: 10, status: "充足" },
  { part: "滤芯", stock: 6, min: 4, status: "充足" },
];

const MaintenanceAlerts = () => (
  <div className="grid grid-cols-12 gap-2.5 auto-rows-min">
    {/* Row 1 */}
    <GlowCard className="col-span-3" title="预警统计">
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        <StatItem label="今日预警" value={12} status="warn" />
        <StatItem label="严重告警" value={2} status="bad" />
        <StatItem label="已处理" value={7} status="good" />
        <StatItem label="待处理" value={5} status="warn" />
        <StatItem label="平均响应" value="8.5" unit="min" />
        <StatItem label="预测故障" value={3} status="warn" />
      </div>
    </GlowCard>

    <GlowCard className="col-span-5" title="实时预警信息" variant="warn">
      <div className="space-y-1.5 max-h-[200px] overflow-y-auto">
        {alerts.map((a) => (
          <div key={a.id} className="glass-panel-accent rounded p-2 flex items-start gap-2 hover:bg-secondary/20 transition-colors">
            <StatusBadge status={a.level} />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-display text-[10px] text-primary">{a.device}</span>
                <span className="text-xs text-foreground font-medium">{a.type}</span>
              </div>
              <p className="text-[10px] text-muted-foreground truncate">{a.detail}</p>
            </div>
            <span className="text-[9px] text-muted-foreground font-display shrink-0">{a.time}</span>
          </div>
        ))}
      </div>
    </GlowCard>

    <GlowCard className="col-span-4" title="设备健康度评分">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={healthScores} layout="vertical" margin={{ left: 0 }}>
          <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="name" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={50} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Bar dataKey="score" radius={[0, 3, 3, 0]} barSize={9}>
            {healthScores.map((entry, i) => (
              <Cell key={i} fill={entry.score > 80 ? "hsl(145,70%,45%)" : entry.score > 50 ? "hsl(35,100%,55%)" : "hsl(0,70%,50%)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Row 2 */}
    <GlowCard className="col-span-4" title="振动监测 (CNC-002)">
      <ResponsiveContainer width="100%" height={140}>
        <LineChart data={vibrationData}>
          <XAxis dataKey="t" tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} domain={[0, 3]} width={25} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Line type="monotone" dataKey="x" stroke="hsl(190,100%,50%)" strokeWidth={1.5} dot={false} name="X轴" />
          <Line type="monotone" dataKey="y" stroke="hsl(35,100%,55%)" strokeWidth={1.5} dot={false} name="Y轴" />
          <Line type="monotone" dataKey="z" stroke="hsl(170,80%,45%)" strokeWidth={1.5} dot={false} name="Z轴" />
        </LineChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-4" title="温度趋势">
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={tempTrend}>
          <defs>
            <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(0,70%,50%)" stopOpacity={0.2} />
              <stop offset="100%" stopColor="hsl(0,70%,50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} interval={4} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} domain={[15, 50]} width={25} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Area type="monotone" dataKey="spindle" stroke="hsl(0,70%,50%)" fill="url(#tempGrad)" strokeWidth={1.5} name="主轴°C" />
          <Line type="monotone" dataKey="bearing" stroke="hsl(35,100%,55%)" strokeWidth={1.5} dot={false} name="轴承°C" />
          <Line type="monotone" dataKey="coolant" stroke="hsl(190,100%,50%)" strokeWidth={1.5} dot={false} name="冷却液°C" />
        </AreaChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-4" title="预警趋势 (近7天)">
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={alertHistory}>
          <XAxis dataKey="date" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={20} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Bar dataKey="count" fill="hsl(35,100%,55%)" radius={[3,3,0,0]} barSize={16} name="预警数" />
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Row 3 */}
    <GlowCard className="col-span-6" title="维护计划" noPadding>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-[10px] text-muted-foreground border-b border-border/30">
            <th className="text-left py-1.5 px-2 font-medium">设备</th>
            <th className="text-left py-1.5 px-2 font-medium">维护任务</th>
            <th className="text-left py-1.5 px-2 font-medium">截止日期</th>
            <th className="text-left py-1.5 px-2 font-medium">优先级</th>
            <th className="text-left py-1.5 px-2 font-medium">状态</th>
          </tr>
        </thead>
        <tbody>
          {maintenancePlan.map((m, i) => (
            <tr key={i} className="border-b border-border/15 hover:bg-secondary/20 transition-colors">
              <td className="py-1.5 px-2 font-display text-[10px] text-primary">{m.device}</td>
              <td className="py-1.5 px-2 text-foreground">{m.task}</td>
              <td className="py-1.5 px-2 text-muted-foreground">{m.due}</td>
              <td className="py-1.5 px-2">
                <span className={`text-[10px] ${m.priority === "高" ? "status-bad" : m.priority === "中" ? "status-warn" : "text-muted-foreground"}`}>● {m.priority}</span>
              </td>
              <td className="py-1.5 px-2">
                <span className={`text-[10px] ${m.status === "进行中" ? "status-warn" : m.status === "待执行" ? "text-foreground" : "text-muted-foreground"}`}>{m.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlowCard>

    <GlowCard className="col-span-6" title="备件库存状态" noPadding>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-[10px] text-muted-foreground border-b border-border/30">
            <th className="text-left py-1.5 px-2 font-medium">备件名称</th>
            <th className="text-right py-1.5 px-2 font-medium">库存</th>
            <th className="text-right py-1.5 px-2 font-medium">最低</th>
            <th className="text-left py-1.5 px-2 font-medium">状态</th>
          </tr>
        </thead>
        <tbody>
          {sparePartsStatus.map((p, i) => (
            <tr key={i} className="border-b border-border/15 hover:bg-secondary/20 transition-colors">
              <td className="py-1.5 px-2 text-foreground">{p.part}</td>
              <td className="py-1.5 px-2 text-right data-value text-[10px]">{p.stock}</td>
              <td className="py-1.5 px-2 text-right text-muted-foreground">{p.min}</td>
              <td className="py-1.5 px-2">
                <span className={`text-[10px] ${p.status === "充足" ? "status-good" : "status-bad"}`}>● {p.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlowCard>
  </div>
);

export default MaintenanceAlerts;
