import Link from "next/link";
import { LayoutDashboard, Box, Package, Activity, ShieldCheck, Settings } from "lucide-react";

export function Sidebar() {
  const links = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Operations", href: "/operations", icon: Activity },
    { name: "Assets", href: "/assets", icon: Package },
    { name: "Inventory", href: "/inventory", icon: Box },
    { name: "Blockchain Audit", href: "/audit", icon: ShieldCheck },
    { name: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <div className="w-64 h-full bg-sidebar border-r border-sidebar-border flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-sidebar-border">
        <h1 className="text-xl font-bold text-primary">WareBit</h1>
      </div>
      <div className="flex-1 py-4 flex flex-col gap-2 px-4">
        {links.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className="flex items-center gap-3 px-3 py-2 text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground rounded-md transition-colors"
          >
            <link.icon className="w-5 h-5" />
            <span className="font-medium text-sm">{link.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
