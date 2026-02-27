import GlowCard from "@/components/GlowCard";
import StatItem from "@/components/StatItem";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from "recharts";

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
];

const EnergyManagement = () => (
  <div className="grid grid-cols-12 gap-3">
    {/* Stats */}
    <div className="col-span-3 flex flex-col gap-3">
      <GlowCard title="今日能耗">
        <div className="space-y-3">
          <StatItem label="总用电量" value="2,847" unit="kWh" />
          <StatItem label="同比昨日" value="-5.3" unit="%" status="good" trend="down" />
          <StatItem label="电费估算" value="2,419" unit="元" />
        </div>
      </GlowCard>
      <GlowCard title="能效指标" variant="accent">
        <div className="space-y-3">
          <StatItem label="单件能耗" value="2.28" unit="kWh/件" status="good" />
          <StatItem label="能效等级" value="A+" status="good" />
          <StatItem label="碳排放" value="1.87" unit="tCO₂" />
        </div>
      </GlowCard>
    </div>

    {/* 24h curve */}
    <GlowCard className="col-span-5" title="24小时功率曲线">
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={dailyEnergy}>
          <defs>
            <linearGradient id="powerGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="hsl(35,100%,55%)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="hsl(35,100%,55%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} interval={3} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 12 }} />
          <Area type="monotone" dataKey="power" stroke="hsl(35,100%,55%)" fill="url(#powerGrad)" strokeWidth={2} name="功率(kW)" />
        </AreaChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Pie */}
    <GlowCard className="col-span-4" title="区域能耗分布">
      <div className="flex items-center gap-3">
        <ResponsiveContainer width="55%" height={200}>
          <PieChart>
            <Pie data={energyByArea} cx="50%" cy="50%" innerRadius={40} outerRadius={70} dataKey="value" stroke="none" paddingAngle={2}>
              {energyByArea.map((e, i) => <Cell key={i} fill={e.color} />)}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-col gap-2.5 text-xs">
          {energyByArea.map((e) => (
            <div key={e.area} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: e.color }} />
              <span className="text-muted-foreground">{e.area}</span>
              <span className="data-value">{e.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </GlowCard>

    {/* Weekly compare */}
    <GlowCard className="col-span-6" title="周对比分析">
      <ResponsiveContainer width="100%" height={150}>
        <BarChart data={weeklyCompare}>
          <XAxis dataKey="day" tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 10, fill: "hsl(210,15%,55%)" }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ background: "hsl(215,30%,10%)", border: "1px solid hsl(200,40%,20%)", borderRadius: 4, fontSize: 12 }} />
          <Bar dataKey="lastWeek" fill="hsl(210,15%,35%)" radius={[2,2,0,0]} barSize={14} name="上周" />
          <Bar dataKey="thisWeek" fill="hsl(190,100%,50%)" radius={[2,2,0,0]} barSize={14} name="本周" />
        </BarChart>
      </ResponsiveContainer>
    </GlowCard>

    {/* Machine energy ranking */}
    <GlowCard className="col-span-6" title="设备能耗排名">
      <div className="space-y-2.5">
        {machineEnergy.map((m, i) => (
          <div key={m.name} className="flex items-center gap-3">
            <span className={`w-5 h-5 rounded flex items-center justify-center text-xs font-display font-bold ${i < 3 ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>{i + 1}</span>
            <span className="text-sm text-foreground flex-1">{m.name}</span>
            <div className="w-24 h-1.5 bg-secondary rounded-full overflow-hidden">
              <div className="h-full rounded-full bg-glow-warn" style={{ width: `${(m.kwh / 50) * 100}%` }} />
            </div>
            <span className="data-value text-xs w-16 text-right">{m.kwh} kWh</span>
            <span className={`text-xs w-10 text-right ${m.pce >= 0.85 ? "status-good" : "status-warn"}`}>{(m.pce * 100).toFixed(0)}%</span>
          </div>
        ))}
      </div>
    </GlowCard>
  </div>
);

export default EnergyManagement;
