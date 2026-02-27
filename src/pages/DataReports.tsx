import GlowCard from "@/components/GlowCard";
import StatItem from "@/components/StatItem";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, BarChart, Bar, ComposedChart } from "recharts";

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
  { item: "原材料", value: 45 },
  { item: "人工", value: 22 },
  { item: "能耗", value: 15 },
  { item: "刀具耗材", value: 10 },
  { item: "维护", value: 5 },
  { item: "其他", value: 3 },
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
  { kpi: "产能利用率", value: "87.3%", trend: "up", desc: "" },
];

const DataReports = () => (
  <div className="grid grid-cols-12 gap-3">
    {/* KPI cards */}
    {kpiSummary.map((k) => (
      <GlowCard key={k.kpi} className="col-span-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-xs text-muted-foreground">{k.kpi}</span>
            {k.desc && <p className="text-[10px] text-muted-foreground/70">{k.desc}</p>}
          </div>
          <div className="text-right">
            <span className="data-value text-lg">{k.value}</span>
            <span className={`block text-[10px] ${k.trend === "up" ? "status-good" : "status-warn"}`}>
              {k.trend === "up" ? "▲ 改善" : "▼ 改善"}
            </span>
          </div>
        </div>
      </GlowCard>
    ))}

    {/* Monthly production vs target */}
    <GlowCard className="col-span-6" title="月度产量与目标对比">
      <ResponsiveContainer width="100%" height={180}>
        <ComposedChart data={monthlyProduction}>
          <defs>
            <linearGradient id="outputGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(190,100%,50%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(190,100%,50%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 12 }} />
          <Area type="monotone" dataKey="output" stroke="hsl(190,100%,50%)" fill="url(#outputGrad)" strokeWidth={2} name="实际产量" />
          <Line type="monotone" dataKey="target" stroke="hsl(35,100%,55%)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="目标" />
        </ComposedChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* OEE breakdown */}
    <GlowCard className="col-span-6" title="OEE分项趋势">
      <ResponsiveContainer width="100%" height={180}>
        <LineChart data={oeeBreakdown}>
          <XAxis dataKey="month" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} domain={[80, 100]} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 12 }} />
          <Line type="monotone" dataKey="availability" stroke="hsl(190,100%,50%)" strokeWidth={2} name="可用率%" />
          <Line type="monotone" dataKey="performance" stroke="hsl(170,80%,45%)" strokeWidth={2} name="性能率%" />
          <Line type="monotone" dataKey="quality" stroke="hsl(35,100%,55%)" strokeWidth={2} name="质量率%" />
        </LineChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Cost breakdown */}
    <GlowCard className="col-span-5" title="成本结构分析">
      <ResponsiveContainer width="100%" height={160}>
        <BarChart data={costAnalysis} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} unit="%" />
          <YAxis type="category" dataKey="item" tick={{ fontSize: 11, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={65} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 12 }} />
          <Bar dataKey="value" fill="hsl(190,100%,50%)" radius={[0, 3, 3, 0]} barSize={12} name="占比%" />
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Downtime reasons */}
    <GlowCard className="col-span-7" title="停机原因分析">
      <div className="space-y-3">
        {downtimeReasons.map((d) => (
          <div key={d.reason} className="flex items-center gap-3">
            <span className="text-sm text-foreground w-20">{d.reason}</span>
            <div className="flex-1 h-3 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{
                  width: `${d.pct}%`,
                  background: d.reason === "故障停机" ? "hsl(0,70%,50%)" : d.reason === "计划维护" ? "hsl(190,100%,50%)" : "hsl(210,15%,45%)",
                }}
              />
            </div>
            <span className="data-value text-xs w-10 text-right">{d.hours}h</span>
            <span className="text-xs text-muted-foreground w-10 text-right">{d.pct}%</span>
          </div>
        ))}
      </div>
    </GlowCard>
  </div>
);

export default DataReports;
