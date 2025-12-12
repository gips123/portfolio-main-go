interface TechTagProps {
  tech: string;
  className?: string;
}

export default function TechTag({ tech, className = "" }: TechTagProps) {
  return (
    <span
      className={`px-3 py-1.5 bg-white/10 border border-white/20 rounded-lg text-white text-xs font-medium backdrop-blur-sm ${className}`}
    >
      {tech}
    </span>
  );
}

