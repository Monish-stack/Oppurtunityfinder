import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Search, 
  Map, 
  Lightbulb, 
  Users, 
  BarChart3, 
  MessageSquare,
  Settings
} from "lucide-react";
import { cn } from "../lib/utils";

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Opportunity Finder", href: "/finder", icon: Search },
  { name: "Business Heatmap", href: "/heatmap", icon: Map },
  { name: "Idea Generator", href: "/idea-generator", icon: Lightbulb },
  { name: "Competitors", href: "/competitors", icon: Users },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Community", href: "/community", icon: MessageSquare },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
        <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          OpportunityGap AI
        </span>
      </div>
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1 px-3">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400" 
                      : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
                  )}
                >
                  <item.icon className={cn("w-5 h-5 mr-3", isActive ? "text-indigo-600 dark:text-indigo-400" : "text-slate-400")} />
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
      <div className="p-4 border-t border-slate-200 dark:border-slate-800">
        <Link
          to="/profile"
          className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          <Settings className="w-5 h-5 mr-3 text-slate-400" />
          Settings
        </Link>
      </div>
    </div>
  );
}
