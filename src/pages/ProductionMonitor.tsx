import GlowCard from "@/components/GlowCard";
import StatItem from "@/components/StatItem";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, Cell } from "recharts";

const productionLine = Array.from({ length: 12 }, (_, i) => ({
  time: `${8 + i}:00`,
  actual: Math.floor(80 + Math.random() * 40),
  plan: 100,
}));

const orderData = [
  { id: "WO-20240301", product: "涡轮叶片", qty: 500, done: 387, line: "A线", priority: "高", eta: "16:30" },
  { id: "WO-20240302", product: "传动轴", qty: 200, done: 200, line: "B线", priority: "中", eta: "完成" },
  { id: "WO-20240303", product: "齿轮箱体", qty: 150, done: 89, line: "C线", priority: "高", eta: "18:45" },
  { id: "WO-20240304", product: "阀体", qty: 300, done: 156, line: "A线", priority: "低", eta: "明日" },
  { id: "WO-20240305", product: "底座框架", qty: 80, done: 12, line: "D线", priority: "中", eta: "明日" },
  { id: "WO-20240306", product: "轴承座", qty: 120, done: 98, line: "B线", priority: "高", eta: "15:20" },
];

const shiftData = [
  { shift: "早班", output: 423, defect: 3, efficiency: 94, hours: "06:00-14:00" },
  { shift: "中班", output: 398, defect: 5, efficiency: 88, hours: "14:00-22:00" },
  { shift: "晚班", output: 356, defect: 2, efficiency: 91, hours: "22:00-06:00" },
];

const hourlyOutput = Array.from({ length: 8 }, (_, i) => ({
  hour: `${8 + i * 2}:00`,
  A线: Math.floor(30 + Math.random() * 20),
  B线: Math.floor(25 + Math.random() * 15),
  C线: Math.floor(20 + Math.random() * 18),
}));

const yieldRate = Array.from({ length: 12 }, (_, i) => ({
  time: `${8 + i}:00`,
  rate: 97 + Math.random() * 3,
  target: 99,
}));

const materialConsumption = [
  { name: "铝合金棒料", used: 87, total: 100, unit: "kg" },
  { name: "钛合金板材", used: 45, total: 60, unit: "kg" },
  { name: "不锈钢管", used: 120, total: 150, unit: "m" },
  { name: "硬质合金刀片", used: 34, total: 50, unit: "片" },
  { name: "切削液", used: 78, total: 100, unit: "L" },
];

const ProductionMonitor = () => (
  <div className="grid grid-cols-12 gap-2.5 auto-rows-min">
    {/* Row 1: Key metrics */}
    <GlowCard className="col-span-2" title="今日产量">
      <div className="space-y-2">
        <StatItem label="完成数" value="1,247" unit="件" trend="up" status="good" />
        <StatItem label="计划数" value="1,340" unit="件" />
        <StatItem label="完成率" value="93.2" unit="%" status="good" />
      </div>
    </GlowCard>

    <GlowCard className="col-span-2" title="质量指标">
      <div className="space-y-2">
        <StatItem label="良品率" value="99.2" unit="%" status="good" />
        <StatItem label="废品数" value={10} unit="件" status="warn" />
        <StatItem label="返工数" value={3} unit="件" />
      </div>
    </GlowCard>

    <GlowCard className="col-span-4" title="实时产量曲线">
      <ResponsiveContainer width="100%" height={110}>
        <AreaChart data={productionLine}>
          <defs>
            <linearGradient id="prodGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(190,100%,50%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(190,100%,50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={30} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Area type="monotone" dataKey="actual" stroke="hsl(190,100%,50%)" fill="url(#prodGrad)" strokeWidth={2} name="实际" />
          <Line type="monotone" dataKey="plan" stroke="hsl(35,100%,55%)" strokeWidth={1} strokeDasharray="4 4" dot={false} name="计划" />
        </AreaChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-4" title="各线每2小时产出">
      <ResponsiveContainer width="100%" height={110}>
        <BarChart data={hourlyOutput}>
          <XAxis dataKey="hour" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={25} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Bar dataKey="A线" fill="hsl(190,100%,50%)" radius={[2,2,0,0]} barSize={8} />
          <Bar dataKey="B线" fill="hsl(170,80%,45%)" radius={[2,2,0,0]} barSize={8} />
          <Bar dataKey="C线" fill="hsl(280,70%,55%)" radius={[2,2,0,0]} barSize={8} />
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Row 2: Orders + Shifts + Yield */}
    <GlowCard className="col-span-6" title="生产工单追踪" noPadding>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-[10px] text-muted-foreground border-b border-border/30">
            <th className="text-left py-1.5 px-2 font-medium">工单号</th>
            <th className="text-left py-1.5 px-2 font-medium">产品</th>
            <th className="text-left py-1.5 px-2 font-medium">产线</th>
            <th className="text-left py-1.5 px-2 font-medium">优先级</th>
            <th className="text-right py-1.5 px-2 font-medium">进度</th>
            <th className="text-right py-1.5 px-2 font-medium">预计完成</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((o) => (
            <tr key={o.id} className="border-b border-border/15 hover:bg-secondary/20 transition-colors">
              <td className="py-1.5 px-2 font-display text-[10px] text-primary">{o.id}</td>
              <td className="py-1.5 px-2">{o.product}</td>
              <td className="py-1.5 px-2 text-muted-foreground">{o.line}</td>
              <td className="py-1.5 px-2">
                <span className={`text-[10px] ${o.priority === "高" ? "status-bad" : o.priority === "中" ? "status-warn" : "text-muted-foreground"}`}>
                  ● {o.priority}
                </span>
              </td>
              <td className="py-1.5 px-2">
                <div className="flex items-center justify-end gap-1.5">
                  <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(o.done / o.qty) * 100}%` }} />
                  </div>
                  <span className="text-[10px] data-value">{Math.round((o.done / o.qty) * 100)}%</span>
                </div>
              </td>
              <td className="py-1.5 px-2 text-right text-muted-foreground text-[10px]">{o.eta}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlowCard>

    <GlowCard className="col-span-3" title="班次统计">
      <div className="space-y-2">
        {shiftData.map((s) => (
          <div key={s.shift} className="glass-panel-accent rounded p-2">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs font-medium text-foreground">{s.shift}</span>
              <span className="text-[10px] text-muted-foreground">{s.hours}</span>
            </div>
            <div className="grid grid-cols-3 gap-1 text-[10px]">
              <div><span className="text-muted-foreground">产出</span><br/><span className="data-value text-xs">{s.output}</span></div>
              <div><span className="text-muted-foreground">不良</span><br/><span className={s.defect > 3 ? "status-warn text-xs" : "status-good text-xs"}>{s.defect}</span></div>
              <div><span className="text-muted-foreground">效率</span><br/><span className="data-value text-xs">{s.efficiency}%</span></div>
            </div>
          </div>
        ))}
      </div>
    </GlowCard>

    <GlowCard className="col-span-3" title="物料消耗">
      <div className="space-y-2">
        {materialConsumption.map((m) => (
          <div key={m.name} className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground w-20 truncate">{m.name}</span>
            <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-primary" style={{ width: `${(m.used / m.total) * 100}%` }} />
            </div>
            <span className="text-[10px] data-value w-16 text-right">{m.used}/{m.total}{m.unit}</span>
          </div>
        ))}
      </div>
    </GlowCard>

    {/* Row 3: Yield trend */}
    <GlowCard className="col-span-12" title="良品率趋势">
      <ResponsiveContainer width="100%" height={80}>
        <LineChart data={yieldRate}>
          <XAxis dataKey="time" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} domain={[96, 100]} width={30} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Line type="monotone" dataKey="rate" stroke="hsl(145,70%,45%)" strokeWidth={2} dot={false} name="良品率%" />
          <Line type="monotone" dataKey="target" stroke="hsl(35,100%,55%)" strokeWidth={1} strokeDasharray="4 4" dot={false} name="目标" />
        </LineChart>
      </ResponsiveContainer>
    </GlowCard>
  </div>
);

export default ProductionMonitor;
