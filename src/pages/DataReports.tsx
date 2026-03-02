import GlowCard from "@/components/GlowCard";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar, ComposedChart, PieChart, Pie, Cell } from "recharts";

const monthlyProduction = [
  { month: "1月", output: 28500, target: 30000 },
  { month: "2月", output: 24200, target: 28000 },
  { month: "3月", output: 31200, target: 30000 },
  { month: "4月", output: 29800, target: 30000 },
  { month: "5月", output: 33100, target: 32000 },
  { month: "6月", output: 35400, target: 34000 },
];

const oeeBreakdown = [
  { month: "1月", availability: 92, performance: 88, quality: 99 },
  { month: "2月", availability: 89, performance: 85, quality: 98 },
  { month: "3月", availability: 94, performance: 91, quality: 99 },
  { month: "4月", availability: 91, performance: 87, quality: 99 },
  { month: "5月", availability: 95, performance: 90, quality: 99 },
  { month: "6月", availability: 96, performance: 92, quality: 99 },
];

const costAnalysis = [
  { item: "原材料", value: 45, color: "hsl(190,100%,50%)" },
  { item: "人工", value: 22, color: "hsl(170,80%,45%)" },
  { item: "能耗", value: 15, color: "hsl(35,100%,55%)" },
  { item: "刀具耗材", value: 10, color: "hsl(280,70%,55%)" },
  { item: "维护", value: 5, color: "hsl(0,70%,50%)" },
  { item: "其他", value: 3, color: "hsl(210,15%,55%)" },
];

const downtimeReasons = [
  { reason: "计划维护", hours: 24, pct: 38 },
  { reason: "换型调整", hours: 15, pct: 24 },
  { reason: "故障停机", hours: 12, pct: 19 },
  { reason: "待料", hours: 8, pct: 13 },
  { reason: "其他", hours: 4, pct: 6 },
];

const kpiSummary = [
  { kpi: "MTBF", value: "186h", trend: "up", desc: "平均故障间隔" },
  { kpi: "MTTR", value: "2.3h", trend: "down", desc: "平均修复时间" },
  { kpi: "FTT", value: "98.7%", trend: "up", desc: "首次通过率" },
  { kpi: "产能利用率", value: "87.3%", trend: "up", desc: "设备综合效率" },
];

const dailyOutput = Array.from({ length: 30 }, (_, i) => ({
  day: `${i + 1}`,
  output: 1100 + Math.random() * 300,
  defect: Math.floor(Math.random() * 15),
}));

const productMix = [
  { product: "涡轮叶片", qty: 2847, pct: 32 },
  { product: "传动轴", qty: 1856, pct: 21 },
  { product: "齿轮箱体", qty: 1523, pct: 17 },
  { product: "阀体", qty: 1245, pct: 14 },
  { product: "底座框架", qty: 890, pct: 10 },
  { product: "轴承座", qty: 534, pct: 6 },
];

const efficiencyByLine = [
  { line: "A线", oee: 89.2, availability: 95, performance: 92, quality: 99.5 },
  { line: "B线", oee: 85.7, availability: 92, performance: 90, quality: 98.8 },
  { line: "C线", oee: 82.1, availability: 88, performance: 91, quality: 99.2 },
  { line: "D线", oee: 78.5, availability: 86, performance: 88, quality: 97.5 },
];

const DataReports = () => (
  <div className="grid grid-cols-12 gap-2.5 auto-rows-min">
    {/* Row 1: KPI */}
    {kpiSummary.map((k) => (
      <GlowCard key={k.kpi} className="col-span-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{k.kpi}</span>
            <p className="text-[9px] text-muted-foreground/60 mt-0.5">{k.desc}</p>
          </div>
          <div className="text-right">
            <span className="data-value text-lg">{k.value}</span>
            <span className={`block text-[9px] ${k.trend === "up" ? "status-good" : "status-warn"}`}>
              {k.trend === "up" ? "▲ 改善" : "▼ 改善"}
            </span>
          </div>
        </div>
      </GlowCard>
    ))}

    {/* Row 2 */}
    <GlowCard className="col-span-4" title="月度产量与目标">
      <ResponsiveContainer width="100%" height={160}>
        <ComposedChart data={monthlyProduction}>
          <defs>
            <linearGradient id="outputGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(190,100%,50%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(190,100%,50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={32} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Area type="monotone" dataKey="output" stroke="hsl(190,100%,50%)" fill="url(#outputGrad)" strokeWidth={2} name="实际" />
          <Line type="monotone" dataKey="target" stroke="hsl(35,100%,55%)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="目标" />
        </ComposedChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-4" title="OEE分项趋势">
      <ResponsiveContainer width="100%" height={160}>
        <LineChart data={oeeBreakdown}>
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} domain={[80, 100]} width={25} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Line type="monotone" dataKey="availability" stroke="hsl(190,100%,50%)" strokeWidth={2} name="可用率%" />
          <Line type="monotone" dataKey="performance" stroke="hsl(170,80%,45%)" strokeWidth={2} name="性能率%" />
          <Line type="monotone" dataKey="quality" stroke="hsl(35,100%,55%)" strokeWidth={2} name="质量率%" />
        </LineChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-4" title="成本结构">
      <div className="flex gap-3 items-center">
        <ResponsiveContainer width="45%" height={130}>
          <PieChart>
            <Pie data={costAnalysis} cx="50%" cy="50%" innerRadius={25} outerRadius={50} dataKey="value" stroke="none" paddingAngle={2}>
              {costAnalysis.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1 text-[10px] flex-1">
          {costAnalysis.map((c) => (
            <div key={c.item} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: c.color }} />
              <span className="text-muted-foreground flex-1">{c.item}</span>
              <span className="data-value text-[10px]">{c.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </GlowCard>

    {/* Row 3 */}
    <GlowCard className="col-span-8" title="近30天日产量">
      <ResponsiveContainer width="100%" height={130}>
        <BarChart data={dailyOutput}>
          <XAxis dataKey="day" tick={{ fontSize: 7, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} interval={2} />
          <YAxis tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={30} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Bar dataKey="output" fill="hsl(190,100%,50%)" radius={[1,1,0,0]} barSize={10} name="产量" />
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-4" title="停机原因分析">
      <div className="space-y-2.5">
        {downtimeReasons.map((d) => (
          <div key={d.reason}>
            <div className="flex justify-between text-[10px] mb-0.5">
              <span className="text-foreground">{d.reason}</span>
              <span className="text-muted-foreground">{d.hours}h ({d.pct}%)</span>
            </div>
            <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all"
                style={{
                  width: `${d.pct}%`,
                  background: d.reason === "故障停机" ? "hsl(0,70%,50%)" : d.reason === "计划维护" ? "hsl(190,100%,50%)" : "hsl(210,15%,40%)",
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </GlowCard>

    {/* Row 4 */}
    <GlowCard className="col-span-5" title="产品组合" noPadding>
      <table className="w-full text-[11px]">
        <thead>
          <tr className="text-[10px] text-muted-foreground border-b border-border/30">
            <th className="text-left py-1.5 px-2 font-medium">产品</th>
            <th className="text-right py-1.5 px-2 font-medium">数量</th>
            <th className="text-right py-1.5 px-2 font-medium">占比</th>
          </tr>
        </thead>
        <tbody>
          {productMix.map((p) => (
            <tr key={p.product} className="border-b border-border/15 hover:bg-secondary/20 transition-colors">
              <td className="py-1.5 px-2 text-foreground">{p.product}</td>
              <td className="py-1.5 px-2 text-right data-value text-[10px]">{p.qty.toLocaleString()}</td>
              <td className="py-1.5 px-2 text-right text-muted-foreground">{p.pct}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlowCard>

    <GlowCard className="col-span-7" title="各产线效率对比" noPadding>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-[10px] text-muted-foreground border-b border-border/30">
            <th className="text-left py-1.5 px-3 font-medium">产线</th>
            <th className="text-right py-1.5 px-3 font-medium">OEE</th>
            <th className="text-right py-1.5 px-3 font-medium">可用率</th>
            <th className="text-right py-1.5 px-3 font-medium">性能率</th>
            <th className="text-right py-1.5 px-3 font-medium">质量率</th>
          </tr>
        </thead>
        <tbody>
          {efficiencyByLine.map((l) => (
            <tr key={l.line} className="border-b border-border/15 hover:bg-secondary/20 transition-colors">
              <td className="py-1.5 px-3 text-primary font-display text-[11px]">{l.line}</td>
              <td className="py-1.5 px-3 text-right">
                <span className={`data-value text-xs ${l.oee >= 85 ? "" : "status-warn"}`}>{l.oee}%</span>
              </td>
              <td className="py-1.5 px-3 text-right text-foreground">{l.availability}%</td>
              <td className="py-1.5 px-3 text-right text-foreground">{l.performance}%</td>
              <td className="py-1.5 px-3 text-right text-foreground">{l.quality}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlowCard>
  </div>
);

export default DataReports;
