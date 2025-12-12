"use client";

import AboutSidebar from "./AboutSidebar";
import AboutContent from "./AboutContent";
import { AboutCard } from "../../../lib/types";

interface AboutClientProps {
  cards: AboutCard[];
}

export default function AboutClient({ cards }: AboutClientProps) {
  return (
    <>
      <AboutSidebar />

      <AboutContent cards={cards} />
    </>
  );
}

