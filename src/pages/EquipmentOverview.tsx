import GlowCard from "@/components/GlowCard";
import StatItem from "@/components/StatItem";
import StatusBadge from "@/components/StatusBadge";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar, LineChart, Line } from "recharts";

const pieData = [
  { name: "运行中", value: 18, color: "hsl(145, 70%, 45%)" },
  { name: "待机", value: 4, color: "hsl(190, 100%, 50%)" },
  { name: "维护", value: 2, color: "hsl(35, 100%, 55%)" },
  { name: "故障", value: 1, color: "hsl(0, 70%, 50%)" },
];

const utilizationData = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  rate: 60 + Math.sin(i * 0.5) * 25 + Math.random() * 10,
  target: 85,
}));

const machines = [
  { id: "CNC-001", name: "五轴加工中心", status: "运行中" as const, load: 87, temp: 42, rpm: 12000, product: "涡轮叶片", uptime: "18h32m" },
  { id: "CNC-002", name: "数控车床A线", status: "运行中" as const, load: 73, temp: 38, rpm: 8500, product: "传动轴", uptime: "16h15m" },
  { id: "CNC-003", name: "精密磨床", status: "待机" as const, load: 0, temp: 24, rpm: 0, product: "-", uptime: "0h" },
  { id: "CNC-004", name: "数控铣床B线", status: "运行中" as const, load: 92, temp: 45, rpm: 10200, product: "齿轮箱体", uptime: "20h08m" },
  { id: "CNC-005", name: "线切割机", status: "故障" as const, load: 0, temp: 28, rpm: 0, product: "-", uptime: "0h" },
  { id: "CNC-006", name: "龙门加工中心", status: "运行中" as const, load: 65, temp: 36, rpm: 6800, product: "底座框架", uptime: "14h42m" },
  { id: "CNC-007", name: "数控车床C线", status: "维护" as const, load: 0, temp: 22, rpm: 0, product: "-", uptime: "0h" },
  { id: "CNC-008", name: "立式加工中心", status: "运行中" as const, load: 81, temp: 40, rpm: 9500, product: "阀体", uptime: "17h55m" },
  { id: "CNC-009", name: "卧式镗床", status: "运行中" as const, load: 68, temp: 37, rpm: 4200, product: "缸体", uptime: "12h20m" },
  { id: "CNC-010", name: "数控磨床D线", status: "运行中" as const, load: 76, temp: 39, rpm: 7800, product: "轴承座", uptime: "15h48m" },
];

const loadTrend = Array.from({ length: 12 }, (_, i) => ({
  time: `${8 + i}:00`,
  avg: 65 + Math.sin(i * 0.6) * 15 + Math.random() * 8,
  peak: 80 + Math.sin(i * 0.4) * 10 + Math.random() * 5,
}));

const productionByLine = [
  { line: "A线", today: 423, yesterday: 398 },
  { line: "B线", today: 356, yesterday: 370 },
  { line: "C线", today: 289, yesterday: 312 },
  { line: "D线", today: 179, yesterday: 165 },
];

const EquipmentOverview = () => {
  return (
    <div className="grid grid-cols-12 gap-2.5 auto-rows-min">
      {/* Row 1 */}
      <GlowCard className="col-span-3" title="设备概况">
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          <StatItem label="设备总数" value={25} unit="台" />
          <StatItem label="运行中" value={18} status="good" />
          <StatItem label="待机" value={4} />
          <StatItem label="维护中" value={2} status="warn" />
          <StatItem label="故障" value={1} status="bad" />
          <StatItem label="综合OEE" value="87.3" unit="%" status="good" />
        </div>
        <div className="h-px bg-border/30 my-2" />
        <div className="grid grid-cols-2 gap-x-4 gap-y-1.5">
          <StatItem label="今日产量" value="1,247" unit="件" trend="up" />
          <StatItem label="稼动率" value="91.5" unit="%" status="good" />
        </div>
      </GlowCard>

      <GlowCard className="col-span-2" title="状态分布">
        <ResponsiveContainer width="100%" height={100}>
          <PieChart>
            <Pie data={pieData} cx="50%" cy="50%" innerRadius={25} outerRadius={42} dataKey="value" stroke="none" paddingAngle={2}>
              {pieData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-1 text-[10px] mt-1">
          {pieData.map((d) => (
            <div key={d.name} className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
              <span className="text-muted-foreground flex-1">{d.name}</span>
              <span className="data-value text-[10px]">{d.value}</span>
            </div>
          ))}
        </div>
      </GlowCard>

      <GlowCard className="col-span-4" title="24小时设备利用率趋势">
        <ResponsiveContainer width="100%" height={150}>
          <AreaChart data={utilizationData}>
            <defs>
              <linearGradient id="utilizationGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fontSize: 8, fill: "hsl(210, 15%, 55%)" }} axisLine={false} tickLine={false} interval={3} />
            <YAxis tick={{ fontSize: 9, fill: "hsl(210, 15%, 55%)" }} axisLine={false} tickLine={false} domain={[0, 100]} width={28} />
            <Tooltip contentStyle={{ background: "hsl(215, 30%, 10%)", border: "1px solid hsl(200, 40%, 20%)", borderRadius: 4, fontSize: 11 }} />
            <Area type="monotone" dataKey="rate" stroke="hsl(190, 100%, 50%)" fill="url(#utilizationGrad)" strokeWidth={2} name="利用率%" />
            <Area type="monotone" dataKey="target" stroke="hsl(35, 100%, 55%)" fill="none" strokeWidth={1} strokeDasharray="4 4" name="目标" />
          </AreaChart>
        </ResponsiveContainer>
      </GlowCard>

      <GlowCard className="col-span-3" title="各线今日产出">
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={productionByLine}>
            <XAxis dataKey="line" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={28} />
            <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
            <Bar dataKey="yesterday" fill="hsl(210,15%,30%)" radius={[2,2,0,0]} barSize={14} name="昨日" />
            <Bar dataKey="today" fill="hsl(190,100%,50%)" radius={[2,2,0,0]} barSize={14} name="今日" />
          </BarChart>
        </ResponsiveContainer>
      </GlowCard>

      {/* Row 2 */}
      <GlowCard className="col-span-5" title="设备负载趋势">
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={loadTrend}>
            <XAxis dataKey="time" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} domain={[40, 100]} width={28} />
            <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
            <Line type="monotone" dataKey="avg" stroke="hsl(190,100%,50%)" strokeWidth={2} dot={false} name="平均负载%" />
            <Line type="monotone" dataKey="peak" stroke="hsl(0,70%,50%)" strokeWidth={1.5} dot={false} strokeDasharray="3 3" name="峰值%" />
          </LineChart>
        </ResponsiveContainer>
      </GlowCard>

      <GlowCard className="col-span-7" title="关键指标">
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: "MTBF", value: "186h", sub: "平均故障间隔" },
            { label: "MTTR", value: "2.3h", sub: "平均修复时间" },
            { label: "停机率", value: "3.2%", sub: "本月累计", warn: true },
            { label: "报警数", value: "5", sub: "待处理", bad: true },
          ].map((k) => (
            <div key={k.label} className="glass-panel-accent rounded p-2.5 text-center">
              <span className="text-[9px] text-muted-foreground uppercase tracking-wider block">{k.label}</span>
              <span className={`data-value text-base font-display block mt-1 ${k.warn ? "status-warn" : k.bad ? "status-bad" : ""}`}>{k.value}</span>
              <span className="text-[8px] text-muted-foreground/60 block mt-0.5">{k.sub}</span>
            </div>
          ))}
        </div>
      </GlowCard>

      {/* Row 3 */}
      <GlowCard className="col-span-12" title="设备实时状态" noPadding>
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-[10px] text-muted-foreground border-b border-border/30">
                <th className="text-left py-1.5 px-3 font-medium">编号</th>
                <th className="text-left py-1.5 px-3 font-medium">设备名称</th>
                <th className="text-left py-1.5 px-3 font-medium">状态</th>
                <th className="text-right py-1.5 px-3 font-medium">负载</th>
                <th className="text-right py-1.5 px-3 font-medium">温度</th>
                <th className="text-right py-1.5 px-3 font-medium">转速</th>
                <th className="text-left py-1.5 px-3 font-medium">当前加工</th>
                <th className="text-right py-1.5 px-3 font-medium">运行时长</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((m) => (
                <tr key={m.id} className="border-b border-border/15 hover:bg-secondary/20 transition-colors">
                  <td className="py-1.5 px-3 font-display text-[11px] text-primary">{m.id}</td>
                  <td className="py-1.5 px-3 text-foreground">{m.name}</td>
                  <td className="py-1.5 px-3"><StatusBadge status={m.status} /></td>
                  <td className="py-1.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <div className="w-14 h-1 bg-secondary rounded-full overflow-hidden">
                        <div className="h-full rounded-full transition-all"
                          style={{
                            width: `${m.load}%`,
                            background: m.load > 90 ? "hsl(0,70%,50%)" : m.load > 70 ? "hsl(35,100%,55%)" : "hsl(190,100%,50%)",
                          }}
                        />
                      </div>
                      <span className="data-value text-[10px] w-7 text-right">{m.load}%</span>
                    </div>
                  </td>
                  <td className="py-1.5 px-3 text-right">
                    <span className={m.temp > 43 ? "status-warn" : "text-foreground"}>{m.temp}°C</span>
                  </td>
                  <td className="py-1.5 px-3 text-right font-display text-[10px]">{m.rpm > 0 ? m.rpm.toLocaleString() : "-"}</td>
                  <td className="py-1.5 px-3 text-muted-foreground">{m.product}</td>
                  <td className="py-1.5 px-3 text-right font-display text-[10px] text-muted-foreground">{m.uptime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlowCard>
    </div>
  );
};

export default EquipmentOverview;
