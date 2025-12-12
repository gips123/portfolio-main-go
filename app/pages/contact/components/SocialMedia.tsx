"use client";

import { MessageSquare } from "lucide-react";
import GlassCard from "../../../components/ui/GlassCard";
import { SocialLink } from "../../../lib/types";
import { Linkedin, Github, Instagram, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Linkedin,
  Github,
  Instagram,
};

interface SocialMediaProps {
  socialLinks: SocialLink[];
}

export default function SocialMedia({ socialLinks }: SocialMediaProps) {
  return (
    <GlassCard hover={false} className="h-full">
      <div className="p-6 h-full flex flex-col" style={{ minHeight: '160px' }}>
        <h3 className="text-white font-semibold text-xl mb-4 flex items-center gap-2">
          <MessageSquare className="w-5 h-5" />
          Social Media
        </h3>
        <div className="flex gap-4 flex-1 items-center">
          {socialLinks.map((social, index) => {
            const IconComponent = iconMap[social.icon] || MessageSquare;
            return (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative w-12 h-12 rounded-xl bg-[#1a1a1a]/80 border border-white/20 flex items-center justify-center backdrop-blur-sm text-white/70 ${social.color} transition-all duration-300 hover:scale-110 hover:bg-[#1a1a1a]/90 hover:border-white/30`}
              >
                <IconComponent className="w-6 h-6" />
              </a>
            );
          })}
        </div>
      </div>
    </GlassCard>
  );
}

