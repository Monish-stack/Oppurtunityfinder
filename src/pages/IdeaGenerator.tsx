import React, { useState } from "react";
import { motion } from "motion/react";
import { Sparkles, DollarSign, Briefcase, MapPin, Loader2, ArrowRight } from "lucide-react";

export default function IdeaGenerator() {
  const [budget, setBudget] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [ideas, setIdeas] = useState<any[]>([]);

  const generateIdeas = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/ai/generate-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ budget, skills, location }),
      });
      const data = await res.json();
      setIdeas(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white flex items-center justify-center">
          <Sparkles className="w-8 h-8 mr-3 text-indigo-500" />
          AI Business Idea Generator
        </h1>
        <p className="text-slate-500 mt-2">
          Tell us about your resources and skills, and our AI will generate tailored business ideas based on local market gaps.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Input Form */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm h-fit"
        >
          <form onSubmit={generateIdeas} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Estimated Budget</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. $10,000 - $50,000"
                  required
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Your Skills/Interests</label>
              <div className="relative">
                <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Baking, Marketing, Tech"
                  required
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">Target Location</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Downtown San Francisco"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl py-3 pl-10 pr-4 outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl py-3 font-semibold flex items-center justify-center transition-colors mt-4"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Generate Ideas"}
            </button>
          </form>
        </motion.div>

        {/* Results */}
        <div className="md:col-span-2 space-y-4">
          {loading && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-500">
              <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
              <p>Analyzing market gaps and generating ideas...</p>
            </div>
          )}
          
          {!loading && ideas.length === 0 && (
            <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 border-dashed">
              <Sparkles className="w-12 h-12 text-slate-300 dark:text-slate-700 mb-4" />
              <p>Fill out the form to generate AI business ideas</p>
            </div>
          )}

          {!loading && ideas.map((idea, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{idea.title}</h3>
                <span className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 rounded-full text-xs font-semibold">
                  {idea.demandLevel} Demand
                </span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 mb-6 text-sm leading-relaxed">
                {idea.description}
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl">
                  <p className="text-xs text-slate-500 mb-1">Est. Investment</p>
                  <p className="font-semibold">{idea.estimatedInvestment}</p>
                </div>
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl">
                  <p className="text-xs text-slate-500 mb-1">Expected Margin</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">{idea.expectedProfitMargin}</p>
                </div>
              </div>

              <div className="bg-indigo-50 dark:bg-indigo-900/10 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-900/30">
                <p className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 mb-1">Why this location?</p>
                <p className="text-sm text-indigo-900/80 dark:text-indigo-200/80">{idea.reasonForLocation}</p>
              </div>

              <div className="mt-6 flex justify-end">
                <button className="flex items-center text-sm font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700">
                  Analyze Competitors <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
