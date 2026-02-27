import { ReactNode } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Activity, BarChart3, Gauge, Wrench, Zap, FileBarChart } from "lucide-react";

const navItems = [
  { path: "/", label: "设备总览", icon: Gauge },
  { path: "/production", label: "生产监控", icon: Activity },
  { path: "/quality", label: "质量分析", icon: BarChart3 },
  { path: "/energy", label: "能耗管理", icon: Zap },
  { path: "/maintenance", label: "维护预警", icon: Wrench },
  { path: "/reports", label: "数据报表", icon: FileBarChart },
];

interface DashboardLayoutProps {
  children: ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();

  const leftNav = navItems.slice(0, 3);
  const rightNav = navItems.slice(3);

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden"
      style={{
        backgroundImage: `
          radial-gradient(ellipse at 20% 50%, hsl(190 100% 50% / 0.03) 0%, transparent 50%),
          radial-gradient(ellipse at 80% 50%, hsl(170 80% 45% / 0.03) 0%, transparent 50%),
          radial-gradient(ellipse at 50% 0%, hsl(190 100% 50% / 0.05) 0%, transparent 40%)
        `
      }}
    >
      {/* Top Header */}
      <header className="relative flex items-center justify-between px-4 py-2 border-b border-border/50 shrink-0"
        style={{
          background: "linear-gradient(180deg, hsl(215 30% 10% / 0.95), hsl(220 25% 6% / 0.98))"
        }}
      >
        <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
        <div className="absolute left-0 bottom-[-1px] w-full h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent blur-sm" />

        <nav className="flex items-center gap-0.5">
          {leftNav.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={() => {
                const isActive = location.pathname === path;
                return `flex items-center gap-1.5 px-3 py-1.5 text-xs rounded transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary glow-border font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`;
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <h1 className="font-display text-xl font-bold tracking-wider glow-text text-primary">
            智慧车床平台
          </h1>
          <span className="text-[9px] text-muted-foreground tracking-[0.3em] font-display">
            SMART LATHE PLATFORM
          </span>
        </div>

        <nav className="flex items-center gap-0.5">
          {rightNav.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={() => {
                const isActive = location.pathname === path;
                return `flex items-center gap-1.5 px-3 py-1.5 text-xs rounded transition-all duration-200 ${
                  isActive
                    ? "bg-primary/10 text-primary glow-border font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`;
              }}
            >
              <Icon className="w-3.5 h-3.5" />
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-3 overflow-auto animate-slide-in">
        {children}
      </main>

      {/* Bottom status bar */}
      <footer className="flex items-center justify-between px-4 py-1 border-t border-border/30 text-[10px] text-muted-foreground shrink-0"
        style={{ background: "hsl(220 25% 6% / 0.9)" }}
      >
        <div className="flex items-center gap-4">
          <span>系统状态：<span className="status-good">● 正常运行</span></span>
          <span>数据更新：<span className="data-value text-[10px]">5s</span></span>
        </div>
        <div className="flex items-center gap-4">
          <span>在线设备：<span className="data-value text-[10px]">48/48</span></span>
          <span>网络延迟：<span className="status-good">12ms</span></span>
          <span className="font-display">v3.2.1</span>
        </div>
      </footer>
    </div>
  );
};

export default DashboardLayout;
