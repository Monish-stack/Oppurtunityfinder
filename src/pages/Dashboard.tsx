import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { TrendingUp, Users, MapPin, Activity, ArrowUpRight } from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockDemandData = [
  { name: "Jan", demand: 4000, competition: 2400 },
  { name: "Feb", demand: 3000, competition: 1398 },
  { name: "Mar", demand: 2000, competition: 9800 },
  { name: "Apr", demand: 2780, competition: 3908 },
  { name: "May", demand: 1890, competition: 4800 },
  { name: "Jun", demand: 2390, competition: 3800 },
  { name: "Jul", demand: 3490, competition: 4300 },
];

export default function Dashboard() {
  const [scores, setScores] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/opportunity-analysis?location_id=1")
      .then((res) => res.json())
      .then((data) => setScores(data));
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Dashboard Overview</h1>
        <div className="bg-white dark:bg-slate-900 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center shadow-sm">
          <MapPin className="w-4 h-4 mr-2 text-indigo-500" />
          <span className="text-sm font-medium">San Francisco, Downtown</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Avg Opportunity Score", value: "82/100", icon: TrendingUp, color: "text-emerald-500", bg: "bg-emerald-100 dark:bg-emerald-900/30" },
          { title: "Active Businesses", value: "1,240", icon: Activity, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/30" },
          { title: "Population Density", value: "High", icon: Users, color: "text-purple-500", bg: "bg-purple-100 dark:bg-purple-900/30" },
          { title: "Market Growth", value: "+14.2%", icon: ArrowUpRight, color: "text-indigo-500", bg: "bg-indigo-100 dark:bg-indigo-900/30" },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.bg}`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
            </div>
            <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{stat.title}</h3>
            <p className="text-2xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <h3 className="text-lg font-bold mb-6">Demand vs Competition Trends</h3>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={mockDemandData}>
                <defs>
                  <linearGradient id="colorDemand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorComp" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                />
                <Area type="monotone" dataKey="demand" stroke="#6366f1" fillOpacity={1} fill="url(#colorDemand)" />
                <Area type="monotone" dataKey="competition" stroke="#ec4899" fillOpacity={1} fill="url(#colorComp)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Top Opportunities */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <h3 className="text-lg font-bold mb-6">Top Opportunities</h3>
          <div className="space-y-4">
            {scores.map((score, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div>
                  <h4 className="font-semibold text-sm">{score.business_category}</h4>
                  <div className="flex items-center mt-1 space-x-3 text-xs text-slate-500">
                    <span className="flex items-center"><TrendingUp className="w-3 h-3 mr-1 text-emerald-500"/> Demand: {score.demand_score}</span>
                    <span className="flex items-center"><Activity className="w-3 h-3 mr-1 text-rose-500"/> Comp: {score.competition_score}</span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold">
                  {score.opportunity_score}
                </div>
              </div>
            ))}
            {scores.length === 0 && (
              <div className="text-center text-slate-500 py-8">Loading opportunities...</div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
