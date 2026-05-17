import { motion } from "motion/react";
import { 
  TrendingUp, 
  Users, 
  Zap, 
  BarChart3, 
  Calendar,
  ArrowUpRight,
  Trophy
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Cell,
  LabelList
} from "recharts";
import { Helmet } from "react-helmet-async";

const timelineData = [
  { year: '2020', value: 124, color: '#9CA3AF' },
  { year: '2021', value: 301, color: '#9CA3AF' },
  { year: '2022', value: 425, color: '#3B82F6' },
  { year: '2023', value: 567, color: '#3B82F6' },
  { year: '2024', value: 709, color: '#60A5FA', isPeak: true },
  { year: '2025', value: 425, color: '#3B82F6' },
  { year: '2026', value: 286, color: '#3B82F6' }
];

const topIAData = [
  { rank: '01', name: 'GPT-5', value: 245, percentage: '28%', color: 'linear-gradient(135deg, #3B82F6, #2563EB)' },
  { rank: '02', name: 'Claude 4', value: 178, percentage: '20%', color: 'linear-gradient(135deg, #06B6D4, #0891B2)' },
  { rank: '03', name: 'Gemini 2.0', value: 142, percentage: '16%', color: 'linear-gradient(135deg, #2563EB, #1D4ED8)' },
  { rank: '04', name: 'Llama 4', value: 98, percentage: '11%', color: 'linear-gradient(135deg, #EAB308, #CA8A04)' },
  { rank: '05', name: 'Mistral Large 2', value: 67, percentage: '8%', color: 'linear-gradient(135deg, #6366F1, #4F46E5)' },
  { rank: '06', name: 'Qwen 3', value: 54, percentage: '6%', color: 'linear-gradient(135deg, #D97706, #B45309)' },
  { rank: '07', name: 'DeepSeek-V3', value: 41, percentage: '5%', color: 'linear-gradient(135deg, #EC4899, #DB2777)' },
  { rank: '08', name: 'Grok 3', value: 28, percentage: '3%', color: 'linear-gradient(135deg, #EF4444, #DC2626)' },
  { rank: '09', name: 'Command R+', value: 18, percentage: '2%', color: 'linear-gradient(135deg, #8B5CF6, #7C3AED)' },
  { rank: '10', name: 'Mixtral 2', value: 9, percentage: '1%', color: 'linear-gradient(135deg, #10B981, #059669)' }
];

export default function InsightsPage() {
  return (
    <>
      <Helmet>
        <title>AI Tool Insights & Trends 2026 - Data Analysis</title>
        <meta name="description" content="In-depth analysis of the AI tools ecosystem in 2026. Discover creation trends, top-performing models, and market growth data." />
        <meta name="keywords" content="ai insights, ai trends 2026, ai market analysis, top ai models" />
        <link rel="canonical" href="https://freeaitools.ct.ws/insights" />
      </Helmet>
      <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <div className="p-2 bg-emerald-100 rounded-lg">
              <TrendingUp className="text-emerald-600 w-6 h-6" />
            </div>
            <h1 className="text-4xl font-display text-slate-900 tracking-tight">
              AI Tools <span className="italic text-emerald-600">Insights</span>
            </h1>
          </motion.div>
          <p className="text-lg text-slate-600 max-w-2xl">
            In-depth analysis of the AI tools ecosystem in 2026. Discover creation trends and top-performing models.
          </p>
        </div>

        {/* Timeline Chart Section */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl border border-slate-200 p-8 mb-12 shadow-sm overflow-hidden"
        >
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
                <Calendar className="w-6 h-6 text-blue-500" />
                AI Tools Timeline
              </h2>
              <p className="text-slate-500 mt-1">Evolution of tools created per year (Total: 2,837)</p>
            </div>
            <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white">
                <ArrowUpRight className="w-6 h-6" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-900">85%</div>
                <div className="text-sm text-blue-600 font-medium">created since 2022</div>
              </div>
            </div>
          </div>

          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={timelineData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis 
                  dataKey="year" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: '#64748b', fontSize: 14, fontWeight: 500 }}
                  dy={10}
                />
                <YAxis hide />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xl">
                          <p className="text-sm font-bold text-slate-900">{payload[0].payload.year}</p>
                          <p className="text-lg font-extrabold text-blue-600">{payload[0].value} tools</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="value" radius={[8, 8, 0, 0]} barSize={60}>
                  {timelineData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                  <LabelList 
                    dataKey="value" 
                    position="top" 
                    style={{ fill: '#1e293b', fontSize: 14, fontWeight: 700 }} 
                    offset={10}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="flex flex-wrap gap-6 mt-10 pt-8 border-t border-slate-100">
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <div className="w-3 h-3 rounded-full bg-blue-400"></div>
              <span>Peak: 2024 (709 tools)</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <div className="w-3 h-3 rounded-full bg-blue-600"></div>
              <span>2022+</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
              <div className="w-3 h-3 rounded-full bg-slate-400"></div>
              <span>Before 2022</span>
            </div>
          </div>
        </motion.div>

        {/* Top 10 Models Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm"
        >
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              Artificial Intelligence
            </h2>
            <p className="text-slate-500 mt-1">Top 10 Most Used AIs - March 2026</p>
          </div>

          <div className="space-y-6">
            {topIAData.map((item, index) => (
              <motion.div 
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="group"
              >
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-slate-400 w-6">{item.rank}</span>
                    <span className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {item.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-lg font-bold text-slate-900">{item.value}</span>
                    <span className="text-sm font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-md">
                      {item.percentage}
                    </span>
                  </div>
                </div>
                <div className="h-14 w-full bg-slate-50 rounded-2xl overflow-hidden relative border border-slate-100">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${(item.value / topIAData[0].value) * 100}%` }}
                    transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                    className="h-full rounded-2xl relative overflow-hidden"
                    style={{ background: item.color }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-[shimmer_2s_infinite]"></div>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {[
            { label: "Total Tools", value: "2,837", icon: Zap, color: "text-emerald-600", bg: "bg-emerald-50" },
            { label: "Active Users", value: "1.2B+", icon: Users, color: "text-blue-600", bg: "bg-blue-50" },
            { label: "Indexed Models", value: "150+", icon: BarChart3, color: "text-purple-600", bg: "bg-purple-50" },
            { label: "Last Updated", value: "Today", icon: Calendar, color: "text-orange-600", bg: "bg-orange-50" }
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + i * 0.1 }}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`${stat.bg} w-10 h-10 rounded-xl flex items-center justify-center mb-4`}>
                <stat.icon className={`${stat.color} w-6 h-6`} />
              </div>
              <div className="text-2xl font-bold text-slate-900">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  </>
  );
}
