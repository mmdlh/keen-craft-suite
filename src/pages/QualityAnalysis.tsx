import GlowCard from "@/components/GlowCard";
import StatItem from "@/components/StatItem";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ZAxis, BarChart, Bar, Cell, AreaChart, Area } from "recharts";

const qualityDimensions = [
  { dim: "尺寸精度", score: 96 },
  { dim: "表面粗糙度", score: 91 },
  { dim: "形位公差", score: 88 },
  { dim: "硬度", score: 94 },
  { dim: "圆度", score: 93 },
  { dim: "平行度", score: 89 },
];

const scatterData = Array.from({ length: 50 }, () => ({
  x: 10 + Math.random() * 0.08 - 0.04,
  y: 5 + Math.random() * 0.06 - 0.03,
  z: Math.random() * 100,
}));

const defectTypes = [
  { type: "尺寸超差", count: 4 },
  { type: "表面划伤", count: 3 },
  { type: "毛刺", count: 2 },
  { type: "裂纹", count: 1 },
  { type: "变形", count: 1 },
];

const cpkTrend = Array.from({ length: 14 }, (_, i) => ({
  day: `2/${i + 15}`,
  cpk: 1.2 + Math.random() * 0.6,
}));

const inspectionLog = [
  { time: "14:32", batch: "B-0301-05", result: "合格", operator: "李明", key: "尺寸: 10.002mm", method: "三坐标" },
  { time: "14:15", batch: "B-0301-04", result: "合格", operator: "王强", key: "粗糙度: Ra0.8", method: "粗糙度仪" },
  { time: "13:58", batch: "B-0301-03", result: "不合格", operator: "李明", key: "公差超差 +0.05", method: "三坐标" },
  { time: "13:40", batch: "B-0301-02", result: "合格", operator: "张伟", key: "硬度: HRC58", method: "硬度计" },
  { time: "13:22", batch: "B-0301-01", result: "合格", operator: "王强", key: "尺寸: 9.998mm", method: "三坐标" },
  { time: "13:05", batch: "B-0228-12", result: "合格", operator: "李明", key: "圆度: 0.003mm", method: "圆度仪" },
  { time: "12:48", batch: "B-0228-11", result: "合格", operator: "张伟", key: "平行度: 0.01mm", method: "三坐标" },
];

const qualityTrend = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  rate: 98.5 + Math.random() * 1.5 - 0.5,
}));

const gaugeData = [
  { label: "尺寸合格率", value: 99.5, color: "hsl(145,70%,45%)" },
  { label: "形位合格率", value: 98.2, color: "hsl(190,100%,50%)" },
  { label: "表面合格率", value: 97.8, color: "hsl(35,100%,55%)" },
  { label: "硬度合格率", value: 99.8, color: "hsl(170,80%,45%)" },
];

const QualityAnalysis = () => (
  <div className="grid grid-cols-12 gap-2.5 auto-rows-min">
    {/* Row 1 */}
    <GlowCard className="col-span-3" title="质量总览">
      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
        <StatItem label="合格率" value="99.2" unit="%" status="good" />
        <StatItem label="CPK值" value="1.67" status="good" />
        <StatItem label="批次合格" value="47/48" status="good" />
        <StatItem label="待检批次" value={3} />
      </div>
      <div className="h-px bg-border/30 my-2" />
      <div className="space-y-1">
        {gaugeData.map((g) => (
          <div key={g.label} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: g.color }} />
            <span className="text-[10px] text-muted-foreground flex-1">{g.label}</span>
            <span className="data-value text-[11px]">{g.value}%</span>
          </div>
        ))}
      </div>
    </GlowCard>

    <GlowCard className="col-span-3" title="质量雷达图">
      <ResponsiveContainer width="100%" height={180}>
        <RadarChart data={qualityDimensions} cx="50%" cy="50%">
          <PolarGrid stroke="hsl(200,40%,20%)" />
          <PolarAngleAxis dataKey="dim" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} />
          <Radar dataKey="score" stroke="hsl(190,100%,50%)" fill="hsl(190,100%,50%)" fillOpacity={0.15} strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-3" title="SPC散点图 (尺寸)">
      <ResponsiveContainer width="100%" height={180}>
        <ScatterChart margin={{ top: 5, right: 5, bottom: 5, left: 0 }}>
          <XAxis dataKey="x" tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} name="X" domain={[9.95, 10.05]} />
          <YAxis dataKey="y" tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} name="Y" domain={[4.96, 5.04]} width={28} />
          <ZAxis dataKey="z" range={[15, 50]} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 10 }} />
          <Scatter data={scatterData} fill="hsl(170,80%,45%)" opacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-3" title="不良类型分布">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={defectTypes} layout="vertical" margin={{ left: 5 }}>
          <XAxis type="number" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="type" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={55} />
          <Bar dataKey="count" fill="hsl(0,70%,50%)" radius={[0,3,3,0]} barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Row 2 */}
    <GlowCard className="col-span-5" title="CPK趋势 (近14天)">
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={cpkTrend}>
          <XAxis dataKey="day" tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} domain={[0, 2]} width={25} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Bar dataKey="cpk" radius={[2,2,0,0]} barSize={14}>
            {cpkTrend.map((entry, i) => (
              <Cell key={i} fill={entry.cpk >= 1.33 ? "hsl(145,70%,45%)" : entry.cpk >= 1.0 ? "hsl(35,100%,55%)" : "hsl(0,70%,50%)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-7" title="24小时质量趋势">
      <ResponsiveContainer width="100%" height={140}>
        <AreaChart data={qualityTrend}>
          <defs>
            <linearGradient id="qualGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(145,70%,45%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(145,70%,45%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} interval={3} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} domain={[97, 100]} width={25} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Area type="monotone" dataKey="rate" stroke="hsl(145,70%,45%)" fill="url(#qualGrad)" strokeWidth={2} name="合格率%" />
        </AreaChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Row 3 */}
    <GlowCard className="col-span-12" title="检验记录" noPadding>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-[10px] text-muted-foreground border-b border-border/30">
            <th className="text-left py-1.5 px-2 font-medium">时间</th>
            <th className="text-left py-1.5 px-2 font-medium">批次</th>
            <th className="text-left py-1.5 px-2 font-medium">结果</th>
            <th className="text-left py-1.5 px-2 font-medium">操作员</th>
            <th className="text-left py-1.5 px-2 font-medium">检测方法</th>
            <th className="text-left py-1.5 px-2 font-medium">关键数据</th>
          </tr>
        </thead>
        <tbody>
          {inspectionLog.map((r, i) => (
            <tr key={i} className="border-b border-border/15 hover:bg-secondary/20 transition-colors">
              <td className="py-1.5 px-2 font-display text-[10px] text-muted-foreground">{r.time}</td>
              <td className="py-1.5 px-2 text-primary text-[10px] font-display">{r.batch}</td>
              <td className="py-1.5 px-2">
                <span className={r.result === "合格" ? "status-good text-[10px]" : "status-bad text-[10px]"}>● {r.result}</span>
              </td>
              <td className="py-1.5 px-2 text-muted-foreground">{r.operator}</td>
              <td className="py-1.5 px-2 text-muted-foreground">{r.method}</td>
              <td className="py-1.5 px-2 text-foreground">{r.key}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlowCard>
  </div>
);

export default QualityAnalysis;
