import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface GlassButtonProps {
  children: ReactNode;
  onClick?: () => void;
  href?: string;
  active?: boolean;
  className?: string;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
}

export default function GlassButton({
  children,
  onClick,
  href,
  active = false,
  className = "",
  icon: Icon,
  iconPosition = "right",
}: GlassButtonProps) {
  const baseClasses = `group relative backdrop-blur-xl border rounded-lg px-4 py-2 shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl overflow-hidden ${
    active
      ? "bg-white/20 border-white/30 text-white"
      : "bg-white/10 border-white/20 text-white/70 hover:bg-white/15 hover:text-white"
  } ${className}`;

  const content = (
    <>
      <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <span className="relative z-10 flex items-center gap-2 text-xs sm:text-sm font-medium">
        {Icon && iconPosition === "left" && <Icon className="w-4 h-4" />}
        {children}
        {Icon && iconPosition === "right" && <Icon className="w-4 h-4" />}
      </span>
    </>
  );

  if (href) {
    return (
      <a href={href} className={baseClasses}>
        {content}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}

