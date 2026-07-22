import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronDown, User as UserIcon, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

interface ProfileData {
  display_name: string | null;
  avatar_url: string | null;
}

const UserMenu = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<ProfileData | null>(null);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("profiles")
      .select("display_name, avatar_url")
      .eq("user_id", user.id)
      .maybeSingle()
      .then(({ data }) => setProfile(data as ProfileData));
  }, [user]);

  if (!user) return null;

  const meta = (user.user_metadata || {}) as Record<string, string>;
  const fullName =
    profile?.display_name ||
    meta.full_name ||
    meta.name ||
    meta.display_name ||
    user.email?.split("@")[0] ||
    "Student";
  const firstName = fullName.split(" ")[0];
  const avatar = profile?.avatar_url || meta.avatar_url || meta.picture || "";
  const initials = fullName.slice(0, 2).toUpperCase();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="group flex items-center gap-2 rounded-full px-2 py-1 transition-all hover:scale-[1.02]"
          style={{
            background: "linear-gradient(135deg, hsl(220 30% 14% / 0.9), hsl(260 35% 16% / 0.9))",
            border: "1px solid hsl(var(--primary) / 0.35)",
            boxShadow: "0 0 18px hsl(var(--primary) / 0.18)",
            fontFamily: "Cairo, sans-serif",
            direction: "rtl",
          }}
        >
          <div className="flex flex-col items-end leading-tight pr-1">
            <span className="text-[12px] font-bold text-white whitespace-nowrap">{firstName}</span>
            <span className="flex items-center gap-1 text-[10px] text-emerald-400 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.9)]" />
              طالب نشط
            </span>
          </div>
          <div className="relative">
            <Avatar className="h-8 w-8 border-2 border-primary/50">
              <AvatarImage src={avatar} alt={fullName} />
              <AvatarFallback className="bg-primary/20 text-primary text-xs font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
          </div>
          <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition-colors" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        sideOffset={10}
        className="w-64 p-0 border-0 overflow-hidden"
        style={{
          background: "linear-gradient(160deg, hsl(225 30% 10% / 0.98), hsl(260 35% 12% / 0.98))",
          border: "1px solid hsl(var(--primary) / 0.3)",
          boxShadow: "0 20px 50px rgba(0,0,0,0.5), 0 0 30px hsl(var(--primary) / 0.2)",
          fontFamily: "Cairo, sans-serif",
          direction: "rtl",
        }}
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border-2 border-primary/50">
              <AvatarImage src={avatar} alt={fullName} />
              <AvatarFallback className="bg-primary/20 text-primary text-sm font-bold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1 text-right">
              <div className="text-sm font-bold text-white truncate">{fullName}</div>
              <div className="text-[11px] text-white/60 truncate">{user.email}</div>
            </div>
          </div>
        </div>

        <div className="p-2">
          <DropdownMenuItem
            asChild
            className="rounded-lg px-3 py-2.5 text-white/90 focus:bg-primary/15 focus:text-white cursor-pointer"
          >
            <Link to="/dashboard" className="flex items-center gap-3 w-full">
              <UserIcon className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold">الملف الشخصي</span>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator className="bg-white/10 my-1" />

          <DropdownMenuItem
            onClick={handleLogout}
            className="rounded-lg px-3 py-2.5 text-white/90 focus:bg-red-500/15 focus:text-red-300 cursor-pointer"
          >
            <LogOut className="w-4 h-4 text-red-400" />
            <span className="text-sm font-semibold">تسجيل الخروج</span>
          </DropdownMenuItem>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserMenu;
