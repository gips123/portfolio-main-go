"use client";

import GlassCard from "../../../components/ui/GlassCard";
import { ContactInfo as ContactInfoType } from "../../../lib/types";
import { Mail, MapPin, Phone, LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Mail,
  MapPin,
  Phone,
};

interface ContactInfoProps {
  contactInfo: ContactInfoType[];
}

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
  return (
    <>
      {contactInfo.map((info, index) => {
        const IconComponent = iconMap[info.icon] || Mail;
        return (
          <a key={index} href={info.link} className="block h-full">
            <GlassCard className="h-full">
              <div className="flex items-center gap-4 p-6 h-full" style={{ minHeight: '160px' }}>
                <div className="w-14 h-14 rounded-xl bg-[#1a1a1a]/80 border border-white/30 flex items-center justify-center backdrop-blur-sm group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                  <IconComponent className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white/60 text-sm mb-1">{info.label}</p>
                  <p className="text-white font-semibold text-base sm:text-lg truncate">{info.value}</p>
                </div>
              </div>
            </GlassCard>
          </a>
        );
      })}
    </>
  );
}

