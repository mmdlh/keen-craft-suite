import GlowCard from "@/components/GlowCard";
import StatItem from "@/components/StatItem";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, ScatterChart, Scatter, XAxis, YAxis, Tooltip, ZAxis, BarChart, Bar, Cell } from "recharts";

const qualityDimensions = [
  { dim: "尺寸精度", score: 96 },
  { dim: "表面粗糙度", score: 91 },
  { dim: "形位公差", score: 88 },
  { dim: "硬度", score: 94 },
  { dim: "圆度", score: 93 },
  { dim: "平行度", score: 89 },
];

const scatterData = Array.from({ length: 40 }, (_, i) => ({
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

const cpkTrend = Array.from({ length: 7 }, (_, i) => ({
  day: `3/${i + 1}`,
  cpk: 1.2 + Math.random() * 0.6,
}));

const inspectionLog = [
  { time: "14:32", batch: "B-0301-05", result: "合格", operator: "李明", key: "尺寸: 10.002mm" },
  { time: "14:15", batch: "B-0301-04", result: "合格", operator: "王强", key: "粗糙度: Ra0.8" },
  { time: "13:58", batch: "B-0301-03", result: "不合格", operator: "李明", key: "公差超差 +0.05" },
  { time: "13:40", batch: "B-0301-02", result: "合格", operator: "张伟", key: "硬度: HRC58" },
  { time: "13:22", batch: "B-0301-01", result: "合格", operator: "王强", key: "尺寸: 9.998mm" },
];

const QualityAnalysis = () => (
  <div className="grid grid-cols-12 gap-3">
    {/* Row 1 */}
    <GlowCard className="col-span-2" title="质量总览">
      <div className="space-y-3">
        <StatItem label="合格率" value="99.2" unit="%" status="good" />
        <StatItem label="CPK值" value="1.67" status="good" />
        <StatItem label="批次合格" value="47/48" status="good" />
        <StatItem label="待检批次" value={3} />
      </div>
    </GlowCard>

    <GlowCard className="col-span-4" title="质量雷达图">
      <ResponsiveContainer width="100%" height={180}>
        <RadarChart data={qualityDimensions} cx="50%" cy="50%">
          <PolarGrid stroke="hsl(200,40%,20%)" />
          <PolarAngleAxis dataKey="dim" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} />
          <Radar dataKey="score" stroke="hsl(190,100%,50%)" fill="hsl(190,100%,50%)" fillOpacity={0.15} strokeWidth={2} />
        </RadarChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-3" title="SPC散点图 (尺寸)">
      <ResponsiveContainer width="100%" height={180}>
        <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: 0 }}>
          <XAxis dataKey="x" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} name="X" domain={[9.95, 10.05]} />
          <YAxis dataKey="y" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} name="Y" domain={[4.96, 5.04]} />
          <ZAxis dataKey="z" range={[20, 60]} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Scatter data={scatterData} fill="hsl(170,80%,45%)" opacity={0.7} />
        </ScatterChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-3" title="不良类型分布">
      <ResponsiveContainer width="100%" height={180}>
        <BarChart data={defectTypes} layout="vertical" margin={{ left: 10 }}>
          <XAxis type="number" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis type="category" dataKey="type" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={65} />
          <Bar dataKey="count" fill="hsl(0,70%,50%)" radius={[0,3,3,0]} barSize={12} />
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Row 2 */}
    <GlowCard className="col-span-4" title="CPK趋势 (近7天)">
      <ResponsiveContainer width="100%" height={140}>
        <BarChart data={cpkTrend}>
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} domain={[0, 2]} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 12 }} />
          <Bar dataKey="cpk" radius={[3,3,0,0]} barSize={20}>
            {cpkTrend.map((entry, i) => (
              <Cell key={i} fill={entry.cpk >= 1.33 ? "hsl(145,70%,45%)" : entry.cpk >= 1.0 ? "hsl(35,100%,55%)" : "hsl(0,70%,50%)"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    <GlowCard className="col-span-8" title="检验记录">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-xs text-muted-foreground border-b border-border/30">
            <th className="text-left py-2 px-2 font-medium">时间</th>
            <th className="text-left py-2 px-2 font-medium">批次</th>
            <th className="text-left py-2 px-2 font-medium">结果</th>
            <th className="text-left py-2 px-2 font-medium">操作员</th>
            <th className="text-left py-2 px-2 font-medium">关键数据</th>
          </tr>
        </thead>
        <tbody>
          {inspectionLog.map((r, i) => (
            <tr key={i} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
              <td className="py-2 px-2 font-display text-xs text-muted-foreground">{r.time}</td>
              <td className="py-2 px-2 text-primary text-xs font-display">{r.batch}</td>
              <td className="py-2 px-2">
                <span className={r.result === "合格" ? "status-good text-xs" : "status-bad text-xs"}>{r.result}</span>
              </td>
              <td className="py-2 px-2 text-muted-foreground">{r.operator}</td>
              <td className="py-2 px-2 text-foreground text-xs">{r.key}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlowCard>
  </div>
);

export default QualityAnalysis;
