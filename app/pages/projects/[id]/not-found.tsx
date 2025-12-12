import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full bg-[#1a1a1a] flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-white font-semibold text-4xl sm:text-5xl md:text-6xl mb-4">
          404
        </h1>
        <h2 className="text-white/80 font-medium text-xl sm:text-2xl mb-6">
          Project Not Found
        </h2>
        <p className="text-white/60 text-base mb-8 max-w-md mx-auto">
          The project you're looking for doesn't exist or has been removed.
        </p>
        <Link
          href="/pages/projects"
          className="inline-flex items-center gap-2 bg-white/20 border border-white/30 rounded-lg px-6 py-3 text-white text-sm font-medium hover:bg-white/30 transition-all duration-300 backdrop-blur-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects
        </Link>
      </div>
    </div>
  );
}


