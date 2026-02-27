import GlowCard from "@/components/GlowCard";
import StatItem from "@/components/StatItem";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";

const productionLine = Array.from({ length: 12 }, (_, i) => ({
  time: `${8 + i}:00`,
  actual: Math.floor(80 + Math.random() * 40),
  plan: 100,
}));

const orderData = [
  { id: "WO-20240301", product: "涡轮叶片", qty: 500, done: 387, line: "A线", priority: "高" },
  { id: "WO-20240302", product: "传动轴", qty: 200, done: 200, line: "B线", priority: "中" },
  { id: "WO-20240303", product: "齿轮箱体", qty: 150, done: 89, line: "C线", priority: "高" },
  { id: "WO-20240304", product: "阀体", qty: 300, done: 156, line: "A线", priority: "低" },
  { id: "WO-20240305", product: "底座框架", qty: 80, done: 12, line: "D线", priority: "中" },
];

const shiftData = [
  { shift: "早班", output: 423, defect: 3, efficiency: 94 },
  { shift: "中班", output: 398, defect: 5, efficiency: 88 },
  { shift: "晚班", output: 356, defect: 2, efficiency: 91 },
];

const hourlyOutput = Array.from({ length: 8 }, (_, i) => ({
  hour: `${8 + i * 2}:00`,
  A线: Math.floor(30 + Math.random() * 20),
  B线: Math.floor(25 + Math.random() * 15),
  C线: Math.floor(20 + Math.random() * 18),
}));

const ProductionMonitor = () => (
  <div className="grid grid-cols-12 gap-3">
    {/* Row 1: Key metrics */}
    <GlowCard className="col-span-2" title="今日产量">
      <StatItem label="完成数" value="1,247" unit="件" trend="up" status="good" />
      <div className="mt-2">
        <StatItem label="计划完成率" value="93.2" unit="%" status="good" />
      </div>
    </GlowCard>

    <GlowCard className="col-span-2" title="良品率">
      <StatItem label="当前" value="99.2" unit="%" status="good" />
      <div className="mt-2">
        <StatItem label="废品数" value={10} unit="件" status="warn" />
      </div>
    </GlowCard>

    <GlowCard className="col-span-4" title="实时产量曲线">
      <ResponsiveContainer width="100%" height={130}>
        <LineChart data={productionLine}>
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 12 }} />
          <Line type="monotone" dataKey="actual" stroke="hsl(190,100%,50%)" strokeWidth={2} dot={false} name="实际" />
          <Line type="monotone" dataKey="plan" stroke="hsl(35,100%,55%)" strokeWidth={1} strokeDasharray="4 4" dot={false} name="计划" />
        </LineChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-4" title="各线每2小时产出">
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={hourlyOutput}>
          <XAxis dataKey="hour" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 12 }} />
          <Bar dataKey="A线" fill="hsl(190,100%,50%)" radius={[2,2,0,0]} />
          <Bar dataKey="B线" fill="hsl(170,80%,45%)" radius={[2,2,0,0]} />
          <Bar dataKey="C线" fill="hsl(280,70%,55%)" radius={[2,2,0,0]} />
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Row 2: Orders + Shifts */}
    <GlowCard className="col-span-8" title="生产工单追踪">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-muted-foreground border-b border-border/30">
            <th className="text-left py-2 px-2 font-medium">工单号</th>
            <th className="text-left py-2 px-2 font-medium">产品</th>
            <th className="text-left py-2 px-2 font-medium">产线</th>
            <th className="text-left py-2 px-2 font-medium">优先级</th>
            <th className="text-right py-2 px-2 font-medium">进度</th>
          </tr>
        </thead>
        <tbody>
          {orderData.map((o) => (
            <tr key={o.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
              <td className="py-2 px-2 font-display text-xs text-primary">{o.id}</td>
              <td className="py-2 px-2">{o.product}</td>
              <td className="py-2 px-2 text-muted-foreground">{o.line}</td>
              <td className="py-2 px-2">
                <span className={`text-xs ${o.priority === "高" ? "status-bad" : o.priority === "中" ? "status-warn" : "text-muted-foreground"}`}>
                  {o.priority}
                </span>
              </td>
              <td className="py-2 px-2">
                <div className="flex items-center justify-end gap-2">
                  <div className="w-20 h-1.5 bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary rounded-full" style={{ width: `${(o.done / o.qty) * 100}%` }} />
                  </div>
                  <span className="text-xs data-value">{Math.round((o.done / o.qty) * 100)}%</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlowCard>

    <GlowCard className="col-span-4" title="班次统计">
      <div className="space-y-4">
        {shiftData.map((s) => (
          <div key={s.shift} className="glass-panel-accent rounded p-3">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-foreground">{s.shift}</span>
              <span className="text-xs data-value">{s.efficiency}%</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div><span className="text-muted-foreground">产出：</span><span className="data-value">{s.output}</span></div>
              <div><span className="text-muted-foreground">不良：</span><span className={s.defect > 3 ? "status-warn" : "status-good"}>{s.defect}</span></div>
            </div>
          </div>
        ))}
      </div>
    </GlowCard>
  </div>
);

export default ProductionMonitor;
