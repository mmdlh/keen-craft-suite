import GlowCard from "@/components/GlowCard";
import StatItem from "@/components/StatItem";
import StatusBadge from "@/components/StatusBadge";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from "recharts";

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
  { id: "CNC-001", name: "五轴加工中心", status: "运行中" as const, load: 87, temp: 42, rpm: 12000, product: "涡轮叶片" },
  { id: "CNC-002", name: "数控车床A线", status: "运行中" as const, load: 73, temp: 38, rpm: 8500, product: "传动轴" },
  { id: "CNC-003", name: "精密磨床", status: "待机" as const, load: 0, temp: 24, rpm: 0, product: "-" },
  { id: "CNC-004", name: "数控铣床B线", status: "运行中" as const, load: 92, temp: 45, rpm: 10200, product: "齿轮箱体" },
  { id: "CNC-005", name: "线切割机", status: "故障" as const, load: 0, temp: 28, rpm: 0, product: "-" },
  { id: "CNC-006", name: "龙门加工中心", status: "运行中" as const, load: 65, temp: 36, rpm: 6800, product: "底座框架" },
  { id: "CNC-007", name: "数控车床C线", status: "维护" as const, load: 0, temp: 22, rpm: 0, product: "-" },
  { id: "CNC-008", name: "立式加工中心", status: "运行中" as const, load: 81, temp: 40, rpm: 9500, product: "阀体" },
];

const EquipmentOverview = () => {
  return (
    <div className="grid grid-cols-12 gap-3 h-full">
      {/* Top stats row */}
      <GlowCard className="col-span-3" title="设备概况">
        <div className="grid grid-cols-2 gap-4">
          <StatItem label="设备总数" value={25} unit="台" />
          <StatItem label="运行中" value={18} status="good" />
          <StatItem label="今日产量" value="1,247" unit="件" trend="up" />
          <StatItem label="综合OEE" value="87.3" unit="%" status="good" />
        </div>
      </GlowCard>

      {/* Pie chart */}
      <GlowCard className="col-span-3" title="设备状态分布">
        <div className="flex items-center gap-2">
          <ResponsiveContainer width="50%" height={120}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={30} outerRadius={50} dataKey="value" stroke="none">
                {pieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="flex flex-col gap-2 text-xs">
            {pieData.map((d) => (
              <div key={d.name} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }} />
                <span className="text-muted-foreground">{d.name}</span>
                <span className="data-value text-sm">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </GlowCard>

      {/* Utilization chart */}
      <GlowCard className="col-span-6" title="24小时设备利用率趋势">
        <ResponsiveContainer width="100%" height={120}>
          <AreaChart data={utilizationData}>
            <defs>
              <linearGradient id="utilizationGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(190, 100%, 50%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="time" tick={{ fontSize: 10, fill: "hsl(210, 15%, 55%)" }} axisLine={false} tickLine={false} interval={3} />
            <YAxis tick={{ fontSize: 10, fill: "hsl(210, 15%, 55%)" }} axisLine={false} tickLine={false} domain={[0, 100]} />
            <Tooltip
              contentStyle={{ background: "hsl(215, 30%, 10%)", border: "1px solid hsl(200, 40%, 20%)", borderRadius: 4, fontSize: 12 }}
              labelStyle={{ color: "hsl(195, 100%, 90%)" }}
            />
            <Area type="monotone" dataKey="rate" stroke="hsl(190, 100%, 50%)" fill="url(#utilizationGrad)" strokeWidth={2} name="利用率%" />
            <Area type="monotone" dataKey="target" stroke="hsl(35, 100%, 55%)" fill="none" strokeWidth={1} strokeDasharray="4 4" name="目标" />
          </AreaChart>
        </ResponsiveContainer>
      </GlowCard>

      {/* Machine list */}
      <GlowCard className="col-span-12" title="设备实时状态">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-border/30">
                <th className="text-left py-2 px-3 font-medium">设备编号</th>
                <th className="text-left py-2 px-3 font-medium">名称</th>
                <th className="text-left py-2 px-3 font-medium">状态</th>
                <th className="text-right py-2 px-3 font-medium">负载</th>
                <th className="text-right py-2 px-3 font-medium">温度</th>
                <th className="text-right py-2 px-3 font-medium">转速</th>
                <th className="text-left py-2 px-3 font-medium">当前加工</th>
              </tr>
            </thead>
            <tbody>
              {machines.map((m) => (
                <tr key={m.id} className="border-b border-border/20 hover:bg-secondary/30 transition-colors">
                  <td className="py-2.5 px-3 font-display text-xs text-primary">{m.id}</td>
                  <td className="py-2.5 px-3 text-foreground">{m.name}</td>
                  <td className="py-2.5 px-3"><StatusBadge status={m.status} /></td>
                  <td className="py-2.5 px-3 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <div className="w-16 h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all"
                          style={{
                            width: `${m.load}%`,
                            background: m.load > 90 ? "hsl(0,70%,50%)" : m.load > 70 ? "hsl(35,100%,55%)" : "hsl(190,100%,50%)",
                          }}
                        />
                      </div>
                      <span className="data-value text-xs w-8 text-right">{m.load}%</span>
                    </div>
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <span className={m.temp > 43 ? "status-warn" : "text-foreground"}>{m.temp}°C</span>
                  </td>
                  <td className="py-2.5 px-3 text-right font-display text-xs">{m.rpm > 0 ? m.rpm.toLocaleString() : "-"}</td>
                  <td className="py-2.5 px-3 text-muted-foreground">{m.product}</td>
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
