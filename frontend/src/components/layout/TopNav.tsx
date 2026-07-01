import { Bell, Search, User } from "lucide-react";
import { Input } from "@/components/ui/input";

export function TopNav() {
  return (
    <div className="h-16 flex items-center justify-between px-6 border-b border-border bg-background">
      <div className="flex-1 flex items-center max-w-md">
        <div className="relative w-full">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search assets, inventory, hashes..." className="pl-8 bg-card border-none" />
        </div>
      </div>
      <div className="flex items-center gap-4 text-muted-foreground">
        <button className="hover:text-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
        </button>
        <div className="flex items-center gap-2 cursor-pointer hover:text-foreground transition-colors ml-4 border-l border-border pl-4">
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
            <User className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </div>
  );
}
