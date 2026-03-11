import { motion } from "motion/react";
import { Users, MapPin, Star, TrendingDown, TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const mockCompetitors = [
  { name: "Joe's Coffee", distance: "0.2 miles", rating: 4.5, reviews: 320, price: "$$" },
  { name: "Downtown Beans", distance: "0.5 miles", rating: 4.2, reviews: 150, price: "$" },
  { name: "The Roastery", distance: "0.8 miles", rating: 4.8, reviews: 890, price: "$$$" },
];

const mockComparisonData = [
  { name: "Price", "Joe's Coffee": 60, "Downtown Beans": 40, "The Roastery": 90 },
  { name: "Quality", "Joe's Coffee": 80, "Downtown Beans": 70, "The Roastery": 95 },
  { name: "Service", "Joe's Coffee": 85, "Downtown Beans": 60, "The Roastery": 90 },
];

export default function CompetitorAnalysis() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Competitor Analysis</h1>
          <p className="text-slate-500 text-sm mt-1">Analyzing competitors for: <span className="font-semibold text-indigo-600 dark:text-indigo-400">Specialty Coffee</span></p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Competitor List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className="text-lg font-bold mb-4">Nearby Competitors</h3>
          {mockCompetitors.map((comp, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-bold text-slate-900 dark:text-white">{comp.name}</h4>
                <span className="text-xs font-medium bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded-md">{comp.price}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-slate-500 mb-3">
                <span className="flex items-center"><MapPin className="w-4 h-4 mr-1" /> {comp.distance}</span>
                <span className="flex items-center text-amber-500"><Star className="w-4 h-4 mr-1 fill-current" /> {comp.rating} ({comp.reviews})</span>
              </div>
              <div className="flex space-x-2 mt-4">
                <button className="flex-1 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 py-2 rounded-lg text-xs font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  View Details
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts and Insights */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm"
          >
            <h3 className="text-lg font-bold mb-6">Feature Comparison</h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.2} />
                  <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                    itemStyle={{ color: '#f8fafc' }}
                    cursor={{fill: 'transparent'}}
                  />
                  <Bar dataKey="Joe's Coffee" fill="#6366f1" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="Downtown Beans" fill="#ec4899" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="The Roastery" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>

          {/* AI Insights */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-indigo-50 dark:bg-indigo-900/10 p-6 rounded-2xl border border-indigo-100 dark:border-indigo-900/30"
          >
            <h3 className="text-lg font-bold text-indigo-900 dark:text-indigo-300 mb-4 flex items-center">
              <Users className="w-5 h-5 mr-2" /> AI Competitive Insights
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                <div className="flex items-center text-emerald-600 dark:text-emerald-400 mb-2 font-semibold text-sm">
                  <TrendingUp className="w-4 h-4 mr-2" /> Market Gap Identified
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  None of the competitors offer a drive-thru or quick-pickup window. High demand for fast service during morning rush hours.
                </p>
              </div>
              <div className="bg-white dark:bg-slate-900 p-4 rounded-xl border border-indigo-100 dark:border-indigo-800/50">
                <div className="flex items-center text-rose-600 dark:text-rose-400 mb-2 font-semibold text-sm">
                  <TrendingDown className="w-4 h-4 mr-2" /> Saturation Warning
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Premium pricing ($$$) is heavily saturated by "The Roastery". Focus on mid-tier pricing ($$) with high-quality beans.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
