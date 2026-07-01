import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Package, Activity, ArrowUpRight, ArrowDownRight, ShieldCheck, 
  DollarSign, BarChart3, TrendingUp, AlertTriangle, Lightbulb 
} from "lucide-react";

export default function Dashboard() {
  const kpiStats = [
    { title: "Revenue KPI", value: "$4.2M", change: "+8.1%", icon: DollarSign, up: true },
    { title: "Inventory Value", value: "$12.8M", change: "+2.4%", icon: Package, up: true },
    { title: "Inventory Turnover", value: "8.5x", change: "-0.5%", icon: BarChart3, up: false },
    { title: "Verification Rate", value: "99.9%", change: "+0.1%", icon: ShieldCheck, up: true },
  ];

  const healthStats = [
    { title: "Operational Health", value: "98%", change: "Stable", icon: Activity, up: true },
    { title: "Warehouse Capacity", value: "82%", change: "+5%", icon: Package, up: true },
    { title: "Compliance Score", value: "100/100", change: "Perfect", icon: ShieldCheck, up: true },
  ];

  const recentAlerts = [
    { id: "ALT-102", severity: "High", message: "Temperature spike in Cold Storage B", time: "10 mins ago" },
    { id: "ALT-101", severity: "Medium", message: "Delayed shipment from Supplier X", time: "1 hour ago" },
    { id: "ALT-100", severity: "Low", message: "Routine maintenance due for Forklift 3", time: "2 hours ago" },
  ];

  const aiRecommendations = [
    { title: "Optimize Route A", desc: "Re-routing shipments to Port Y will save 15% in transit time.", impact: "High" },
    { title: "Restock Alert", desc: "Semiconductor chips inventory low. Suggest reordering.", impact: "Medium" },
  ];

  return (
    <div className="flex flex-col gap-8 pb-8 animate-in fade-in duration-500">
      <div>
        <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">Executive Dashboard</h2>
        <p className="text-muted-foreground mt-1">Real-time enterprise overview, blockchain verifications, and AI insights.</p>
      </div>

      {/* Top KPI row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiStats.map((stat, i) => (
          <Card key={i} className="bg-card/50 backdrop-blur-xl border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.1)] group">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">{stat.title}</CardTitle>
              <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                <stat.icon className="w-4 h-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className={`text-xs mt-1 flex items-center ${stat.up ? "text-emerald-500" : "text-rose-500"}`}>
                {stat.up ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                {stat.change} vs last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Forecast & Health */}
        <Card className="col-span-1 lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><TrendingUp className="w-5 h-5 text-blue-500" /> Revenue & Forecast</CardTitle>
            <CardDescription>Predicted vs Actual Performance</CardDescription>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center border-t border-border/30 mt-4 relative overflow-hidden">
             {/* Simulated Chart Area */}
             <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 to-transparent"></div>
             <div className="w-full flex items-end justify-between px-4 h-40 gap-2 z-10">
               {[40, 55, 45, 60, 80, 70, 90, 85, 100].map((h, i) => (
                  <div key={i} className="w-full bg-blue-500/20 hover:bg-blue-500/40 rounded-t-sm transition-all duration-300 relative group cursor-pointer" style={{ height: `${h}%` }}>
                     <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow-lg transition-opacity whitespace-nowrap">
                       Val: {h}k
                     </div>
                  </div>
               ))}
             </div>
          </CardContent>
        </Card>
        
        {/* System Health */}
        <Card className="col-span-1 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Activity className="w-5 h-5 text-emerald-500" /> Operational Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {healthStats.map((health, i) => (
               <div key={i} className="space-y-2">
                 <div className="flex justify-between text-sm">
                   <span className="text-muted-foreground">{health.title}</span>
                   <span className="text-foreground font-medium">{health.value}</span>
                 </div>
                 <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                   <div className="h-full bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full transition-all duration-1000" style={{ width: health.value }}></div>
                 </div>
               </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Alerts */}
        <Card className="col-span-1 border-border/50 bg-card/50 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><AlertTriangle className="w-5 h-5 text-rose-500" /> Recent Alerts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentAlerts.map((alert, i) => (
              <div key={i} className="flex items-start gap-4 p-3 rounded-lg bg-muted/30 hover:bg-muted/60 transition-colors border border-transparent hover:border-border">
                 <div className={`p-2 rounded-full ${alert.severity === 'High' ? 'bg-rose-500/20 text-rose-500' : alert.severity === 'Medium' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'}`}>
                   <AlertTriangle className="w-4 h-4" />
                 </div>
                 <div className="space-y-1">
                   <p className="text-sm font-medium leading-none">{alert.message}</p>
                   <p className="text-xs text-muted-foreground">{alert.time}</p>
                 </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* AI Recommendations */}
        <Card className="col-span-1 lg:col-span-2 border-border/50 bg-card/50 backdrop-blur-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Lightbulb className="w-5 h-5 text-violet-500" /> AI Recommendations</CardTitle>
            <CardDescription>Powered by WareBit Intelligence</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 relative z-10">
             {aiRecommendations.map((rec, i) => (
                <div key={i} className="p-4 rounded-xl border border-violet-500/20 bg-violet-500/5 hover:bg-violet-500/10 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                     <h4 className="font-semibold text-violet-400">{rec.title}</h4>
                     <Badge variant="outline" className="bg-violet-500/10 text-violet-400 border-violet-500/20">{rec.impact} Impact</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{rec.desc}</p>
                </div>
             ))}
          </CardContent>
        </Card>
      </div>

    </div>
  );
}
