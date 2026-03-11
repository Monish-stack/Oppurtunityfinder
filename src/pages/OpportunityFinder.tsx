import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Search, MapPin, Filter, Star, TrendingUp, AlertCircle } from "lucide-react";
import { cn } from "../lib/utils";

export default function OpportunityFinder() {
  const [scores, setScores] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetch("/api/opportunity-analysis?location_id=1")
      .then((res) => res.json())
      .then((data) => setScores(data));
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Opportunity Finder</h1>
          <p className="text-slate-500 text-sm mt-1">Discover high-potential business gaps in your area.</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-indigo-500 w-64"
            />
          </div>
          <button className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800">
            <Filter className="w-4 h-4 text-slate-600 dark:text-slate-300" />
          </button>
        </div>
      </div>

      <div className="grid gap-4">
        {scores.map((score, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-lg font-bold">{score.business_category}</h3>
                <span className={cn(
                  "px-2.5 py-0.5 rounded-full text-xs font-medium",
                  score.opportunity_score > 80 ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400" :
                  score.opportunity_score > 50 ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" :
                  "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                )}>
                  {score.opportunity_score > 80 ? "High Potential" : score.opportunity_score > 50 ? "Moderate" : "Saturated"}
                </span>
              </div>
              <p className="text-sm text-slate-500 flex items-center">
                <MapPin className="w-4 h-4 mr-1" /> San Francisco, Downtown
              </p>
            </div>

            <div className="flex items-center space-x-8">
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">Demand</p>
                <div className="flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-emerald-500 mr-1" />
                  <span className="font-semibold">{score.demand_score}/100</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">Competition</p>
                <div className="flex items-center justify-center">
                  <AlertCircle className="w-4 h-4 text-rose-500 mr-1" />
                  <span className="font-semibold">{score.competition_score}/100</span>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xs text-slate-500 mb-1">Opp. Score</p>
                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/30 border border-indigo-100 dark:border-indigo-800 flex items-center justify-center">
                  <span className="font-bold text-indigo-600 dark:text-indigo-400">{score.opportunity_score}</span>
                </div>
              </div>
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                Analyze
              </button>
            </div>
          </motion.div>
        ))}
        {scores.length === 0 && (
          <div className="text-center text-slate-500 py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
            Loading opportunities...
          </div>
        )}
      </div>
    </div>
  );
}
