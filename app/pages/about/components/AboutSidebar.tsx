"use client";

import { Rocket, Target, Heart, Quote, User, LucideIcon } from "lucide-react";
import SidebarButton from "../../../components/ui/SidebarButton";
import { useState, useEffect } from "react";

const iconMap: Record<string, LucideIcon> = {
  User,
  Rocket,
  Target,
  Heart,
  Quote,
};

// Inline sidebar buttons data
const sidebarButtons = [
  {
    id: "about-me",
    label: "About Me",
    subtitle: "Overview",
    icon: "User"
  },
  {
    id: "aspirations",
    label: "Aspirations",
    subtitle: "Dreams & Goals",
    icon: "Rocket"
  },
  {
    id: "life-goals",
    label: "Life Goals",
    subtitle: "Objectives",
    icon: "Target"
  },
  {
    id: "hobbies",
    label: "Hobbies",
    subtitle: "Interests",
    icon: "Heart"
  },
  {
    id: "motto",
    label: "Motto",
    subtitle: "Life Philosophy",
    icon: "Quote"
  }
];

export default function AboutSidebar() {
  const [activeSection, setActiveSection] = useState("about-me");

  useEffect(() => {
    const handleScroll = () => {
      const sections = sidebarButtons.map((btn) => btn.id);
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 96;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="hidden lg:flex flex-col gap-3 flex-shrink-0" style={{ position: 'sticky', top: '96px', alignSelf: 'flex-start' }}>
      {sidebarButtons.map((button) => {
        const IconComponent = iconMap[button.icon];
        return (
          <SidebarButton
            key={button.id}
            icon={IconComponent}
            label={button.label}
            subtitle={button.subtitle}
            active={activeSection === button.id}
            onClick={() => scrollToSection(button.id)}
          />
        );
      })}
    </div>
  );
}

