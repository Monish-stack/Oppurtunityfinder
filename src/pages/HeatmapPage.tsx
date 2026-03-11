import { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, Map as MapIcon, Layers } from "lucide-react";

export default function HeatmapPage() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Businesses" },
    { id: "food", label: "Restaurants & Cafes" },
    { id: "retail", label: "Retail" },
    { id: "service", label: "Services" },
  ];

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Business Heatmap</h1>
          <p className="text-slate-500 text-sm mt-1">Visualize business density and identify gaps.</p>
        </div>
        <div className="flex items-center space-x-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === f.id
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-2xl border border-slate-300 dark:border-slate-700 overflow-hidden relative"
      >
        {/* Mock Map Background */}
        <div className="absolute inset-0 opacity-50 dark:opacity-30" style={{
          backgroundImage: 'url("https://picsum.photos/seed/map/1920/1080?blur=2")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} />
        
        {/* Map Controls Overlay */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg shadow-md flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
            <Layers className="w-5 h-5" />
          </button>
          <button className="w-10 h-10 bg-white dark:bg-slate-900 rounded-lg shadow-md flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800">
            <MapIcon className="w-5 h-5" />
          </button>
        </div>

        {/* Mock Heatmap Overlay */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="relative w-full h-full max-w-4xl max-h-[600px]">
            {/* High Density Area */}
            <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-red-500/40 rounded-full blur-3xl" />
            
            {/* Medium Density Area */}
            <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-yellow-500/40 rounded-full blur-2xl" />
            
            {/* Opportunity Area (Low Density) */}
            <div className="absolute top-1/2 left-2/3 w-56 h-56 bg-emerald-500/40 rounded-full blur-2xl" />
            
            {/* Mock Markers */}
            <div className="absolute top-[30%] left-[35%] w-4 h-4 bg-red-600 border-2 border-white rounded-full shadow-lg" />
            <div className="absolute top-[28%] left-[38%] w-4 h-4 bg-red-600 border-2 border-white rounded-full shadow-lg" />
            <div className="absolute bottom-[35%] right-[28%] w-4 h-4 bg-yellow-600 border-2 border-white rounded-full shadow-lg" />
            <div className="absolute top-[55%] left-[65%] w-6 h-6 bg-emerald-500 border-2 border-white rounded-full shadow-lg flex items-center justify-center animate-pulse">
              <span className="w-2 h-2 bg-white rounded-full" />
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-6 left-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md p-4 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
          <h4 className="text-sm font-bold mb-3">Density Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 rounded-full bg-red-500 mr-2" /> Oversaturated
            </div>
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 rounded-full bg-yellow-500 mr-2" /> Moderate
            </div>
            <div className="flex items-center text-xs">
              <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2" /> High Opportunity
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
