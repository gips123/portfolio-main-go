import { LucideIcon } from "lucide-react";

interface SidebarButtonProps {
  icon: LucideIcon;
  label: string;
  subtitle: string;
  active?: boolean;
  onClick: () => void;
}

export default function SidebarButton({ icon: Icon, label, subtitle, active = false, onClick }: SidebarButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative backdrop-blur-xl border rounded-2xl px-4 py-4 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden cursor-pointer flex items-center gap-3 w-[200px] ${
        active
          ? "bg-white/20 border-white/30"
          : "bg-white/10 border-white/20 hover:bg-white/15"
      }`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <div className="relative z-10 flex items-center gap-3">
        <Icon className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
        <div className="flex flex-col">
          <h3 className="text-white font-semibold text-sm mb-0.5">{label}</h3>
          <p className="text-white/70 text-xs">{subtitle}</p>
        </div>
      </div>
    </button>
  );
}

