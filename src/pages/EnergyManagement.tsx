import GlowCard from "@/components/GlowCard";
import StatItem from "@/components/StatItem";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar, LineChart, Line } from "recharts";

const dailyEnergy = Array.from({ length: 24 }, (_, i) => ({
  time: `${i}:00`,
  power: 120 + Math.sin(i * 0.4) * 50 + (i > 7 && i < 20 ? 60 : 0) + Math.random() * 15,
  cost: (120 + Math.sin(i * 0.4) * 50 + (i > 7 && i < 20 ? 60 : 0)) * 0.85,
}));

const energyByArea = [
  { area: "加工区A", value: 38, color: "hsl(190,100%,50%)" },
  { area: "加工区B", value: 28, color: "hsl(170,80%,45%)" },
  { area: "热处理", value: 18, color: "hsl(35,100%,55%)" },
  { area: "辅助设备", value: 10, color: "hsl(280,70%,55%)" },
  { area: "照明暖通", value: 6, color: "hsl(210,15%,55%)" },
];

const weeklyCompare = [
  { day: "周一", thisWeek: 2450, lastWeek: 2680 },
  { day: "周二", thisWeek: 2380, lastWeek: 2520 },
  { day: "周三", thisWeek: 2560, lastWeek: 2710 },
  { day: "周四", thisWeek: 2290, lastWeek: 2590 },
  { day: "周五", thisWeek: 2410, lastWeek: 2650 },
  { day: "周六", thisWeek: 1200, lastWeek: 1450 },
  { day: "周日", thisWeek: 800, lastWeek: 950 },
];

const machineEnergy = [
  { name: "五轴加工中心", kwh: 45.2, pce: 0.82 },
  { name: "数控车床A线", kwh: 32.8, pce: 0.91 },
  { name: "龙门加工中心", kwh: 38.5, pce: 0.78 },
  { name: "精密磨床", kwh: 28.1, pce: 0.88 },
  { name: "数控铣床B线", kwh: 41.3, pce: 0.85 },
  { name: "立式加工中心", kwh: 35.7, pce: 0.89 },
  { name: "卧式镗床", kwh: 29.4, pce: 0.86 },
  { name: "数控磨床D线", kwh: 33.6, pce: 0.83 },
];

const monthlyEnergy = Array.from({ length: 6 }, (_, i) => ({
  month: `${i + 1}月`,
  energy: 68000 + Math.random() * 12000,
  target: 72000,
}));

const peakValley = [
  { period: "谷时 (23:00-07:00)", kwh: 680, rate: 0.35, cost: 238 },
  { period: "平时 (07:00-10:00)", kwh: 520, rate: 0.65, cost: 338 },
  { period: "峰时 (10:00-15:00)", kwh: 890, rate: 1.05, cost: 935 },
  { period: "平时 (15:00-18:00)", kwh: 480, rate: 0.65, cost: 312 },
  { period: "峰时 (18:00-21:00)", kwh: 720, rate: 1.05, cost: 756 },
  { period: "谷时 (21:00-23:00)", kwh: 320, rate: 0.35, cost: 112 },
];

const EnergyManagement = () => (
  <div className="grid grid-cols-12 gap-2.5 auto-rows-min">
    {/* Stats */}
    <GlowCard className="col-span-2" title="今日能耗">
      <div className="space-y-2">
        <StatItem label="总用电量" value="2,847" unit="kWh" />
        <StatItem label="同比昨日" value="-5.3" unit="%" status="good" trend="down" />
        <StatItem label="电费估算" value="2,419" unit="元" />
        <StatItem label="单件能耗" value="2.28" unit="kWh" status="good" />
        <div className="h-px bg-border/30 my-1" />
        <StatItem label="能效等级" value="A+" status="good" />
        <StatItem label="碳排放" value="1.87" unit="tCO₂" />
        <StatItem label="节能目标" value="92" unit="%" status="good" />
      </div>
    </GlowCard>

    {/* 24h curve */}
    <GlowCard className="col-span-5" title="24小时功率曲线">
      <ResponsiveContainer width="100%" height={150}>
        <AreaChart data={dailyEnergy}>
          <defs>
            <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(35,100%,55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(35,100%,55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} interval={3} />
          <YAxis tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={30} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Area type="monotone" dataKey="power" stroke="hsl(35,100%,55%)" fill="url(#powerGrad)" strokeWidth={2} name="功率(kW)" />
        </AreaChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Pie */}
    <GlowCard className="col-span-2" title="区域分布">
      <ResponsiveContainer width="100%" height={100}>
        <PieChart>
          <Pie data={energyByArea} cx="50%" cy="50%" innerRadius={25} outerRadius={42} dataKey="value" stroke="none" paddingAngle={2}>
            {energyByArea.map((e, i) => <Cell key={i} fill={e.color} />)}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="flex flex-col gap-1 text-[10px] mt-1">
        {energyByArea.map((e) => (
          <div key={e.area} className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: e.color }} />
            <span className="text-muted-foreground flex-1">{e.area}</span>
            <span className="data-value text-[10px]">{e.value}%</span>
          </div>
        ))}
      </div>
    </GlowCard>

    {/* Monthly */}
    <GlowCard className="col-span-3" title="月度能耗趋势">
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={monthlyEnergy}>
          <XAxis dataKey="month" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={35} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Bar dataKey="energy" fill="hsl(190,100%,50%)" radius={[3,3,0,0]} barSize={16} name="实际(kWh)" />
          <Line type="monotone" dataKey="target" stroke="hsl(0,70%,50%)" strokeWidth={1.5} strokeDasharray="4 4" dot={false} name="目标" />
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Weekly compare */}
    <GlowCard className="col-span-4" title="周对比分析">
      <ResponsiveContainer width="100%" height={120}>
        <BarChart data={weeklyCompare}>
          <XAxis dataKey="day" tick={{ fontSize: 9, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 8, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} width={30} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 11 }} />
          <Bar dataKey="lastWeek" fill="hsl(210,15%,30%)" radius={[2,2,0,0]} barSize={10} name="上周" />
          <Bar dataKey="thisWeek" fill="hsl(190,100%,50%)" radius={[2,2,0,0]} barSize={10} name="本周" />
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Peak valley */}
    <GlowCard className="col-span-4" title="峰谷电价分析" noPadding>
      <table className="w-full text-[10px]">
        <thead>
          <tr className="text-[9px] text-muted-foreground border-b border-border/30">
            <th className="text-left py-1 px-2 font-medium">时段</th>
            <th className="text-right py-1 px-2 font-medium">用电(kWh)</th>
            <th className="text-right py-1 px-2 font-medium">费用(元)</th>
          </tr>
        </thead>
        <tbody>
          {peakValley.map((p, i) => (
            <tr key={i} className="border-b border-border/15">
              <td className="py-1 px-2 text-muted-foreground">{p.period}</td>
              <td className="py-1 px-2 text-right data-value">{p.kwh}</td>
              <td className="py-1 px-2 text-right text-foreground">{p.cost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </GlowCard>

    {/* Machine energy ranking */}
    <GlowCard className="col-span-4" title="设备能耗排名">
      <div className="space-y-1.5">
        {machineEnergy.map((m, i) => (
          <div key={m.name} className="flex items-center gap-2">
            <span className={`w-4 h-4 rounded flex items-center justify-center text-[9px] font-display font-bold ${i < 3 ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>{i + 1}</span>
            <span className="text-[11px] text-foreground flex-1 truncate">{m.name}</span>
            <div className="w-16 h-1 bg-secondary rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-glow-warn" style={{ width: `${(m.kwh / 50) * 100}%` }} />
            </div>
            <span className="data-value text-[10px] w-14 text-right">{m.kwh}kWh</span>
            <span className={`text-[10px] w-8 text-right ${m.pce >= 0.85 ? "status-good" : "status-warn"}`}>{(m.pce * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </GlowCard>
  </div>
);

export default EnergyManagement;
