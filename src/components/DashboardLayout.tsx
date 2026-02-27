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
    <div className="min-h-screen bg-background scan-line flex flex-col">
      {/* Top Header */}
      <header className="relative flex items-center justify-between px-6 py-3 border-b border-border/50"
        style={{
          background: "linear-gradient(180deg, hsl(215 30% 10% / 0.9), hsl(220 25% 6% / 0.95))"
        }}
      >
        {/* Left decorative line */}
        <div className="absolute left-0 bottom-0 w-full h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Left Nav */}
        <nav className="flex items-center gap-1">
          {leftNav.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={() => {
                const isActive = location.pathname === path;
                return `flex items-center gap-1.5 px-3 py-2 text-sm rounded transition-all duration-200 ${
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

        {/* Center Title */}
        <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
          <h1 className="font-display text-2xl font-bold tracking-wider glow-text text-primary">
            智慧车床平台
          </h1>
          <span className="text-[10px] text-muted-foreground tracking-[0.3em] font-display mt-0.5">
            SMART LATHE PLATFORM
          </span>
        </div>

        {/* Right Nav */}
        <nav className="flex items-center gap-1">
          {rightNav.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              className={() => {
                const isActive = location.pathname === path;
                return `flex items-center gap-1.5 px-3 py-2 text-sm rounded transition-all duration-200 ${
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
      <main className="flex-1 p-4 overflow-auto animate-slide-in">
        {children}
      </main>

      {/* Bottom status bar */}
      <footer className="flex items-center justify-between px-6 py-1.5 border-t border-border/30 text-[10px] text-muted-foreground">
        <span>系统状态：<span className="status-good">正常运行</span></span>
        <span>数据更新频率：5s</span>
        <span>连接节点：48/48</span>
        <span className="font-display">v3.2.1</span>
      </footer>
    </div>
  );
};

export default DashboardLayout;
