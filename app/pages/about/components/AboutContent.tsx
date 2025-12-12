"use client";

import { Rocket, Target, Heart, Quote, User, LucideIcon } from "lucide-react";
import ContentCard from "../../../components/ui/ContentCard";
import SectionHeader from "../../../components/ui/SectionHeader";
import { AboutCard } from "../../../lib/types";

const iconMap: Record<string, LucideIcon> = {
  User,
  Rocket,
  Target,
  Heart,
  Quote,
};

interface AboutContentProps {
  cards: AboutCard[];
}

export default function AboutContent({ cards }: AboutContentProps) {
  return (
    <div className="relative flex-1 space-y-6">
      {cards.map((card) => {
        const IconComponent = iconMap[card.icon];
        
        return (
          <section key={card.id} id={card.id} className="scroll-mt-24">
            <ContentCard>
              <SectionHeader icon={IconComponent} title={card.title} />
              <div className="space-y-4 sm:space-y-6">
                {/* For motto: quote first, then paragraphs */}
                {card.id === "motto" && card.content.quote && (
                  <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10">
                    <Quote className="w-8 h-8 text-white/50 mb-4" />
                    <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold italic leading-relaxed">
                      "{card.content.quote}"
                    </p>
                  </div>
                )}

                {card.content.paragraphs?.map((paragraph, index) => (
                  <div key={index} className="relative pl-6 border-l-2 border-white/20">
                    <p
                      className={`${
                        paragraph.type === "highlight"
                          ? "text-white/90"
                          : "text-white/80"
                      } text-base sm:text-lg md:text-xl leading-relaxed`}
                      dangerouslySetInnerHTML={{ __html: paragraph.text }}
                    />
                  </div>
                ))}

                {card.content.hobbies && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {card.content.hobbies.map((hobby, index) => (
                      <div
                        key={index}
                        className="group relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition-all duration-300 hover:scale-105"
                      >
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="relative z-10">
                          <h3 className="text-white font-semibold text-lg sm:text-xl mb-2">
                            {hobby.title}
                          </h3>
                          <p className="text-white/70 text-sm sm:text-base">
                            {hobby.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* For other cards: quote at the end */}
                {card.id !== "motto" && card.content.quote && (
                  <div className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-8 md:p-10">
                    <Quote className="w-8 h-8 text-white/50 mb-4" />
                    <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold italic leading-relaxed">
                      "{card.content.quote}"
                    </p>
                  </div>
                )}
              </div>
            </ContentCard>
          </section>
        );
      })}
    </div>
  );
}

