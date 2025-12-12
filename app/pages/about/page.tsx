import PageWrapper from "../../components/transitions/PageWrapper";
import AboutClient from "./components/AboutClient";
import { getAboutCards } from "../../lib/api/about";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function About() {
  try {
    const cards = await getAboutCards();
    
    const order = ["about-me", "aspirations", "life-goals", "hobbies", "motto"];
    const sortedCards = [...cards].sort((a, b) => {
      const indexA = order.indexOf(a.id);
      const indexB = order.indexOf(b.id);
      if (indexA === -1) return 1;
      if (indexB === -1) return -1;
      return indexA - indexB;
    });

    return (
      <PageWrapper>
        <div className="relative min-h-screen w-full bg-[#1a1a1a]">
        <section className="relative w-full flex items-start justify-center px-4 sm:px-8 md:px-16 lg:px-24 pt-24 sm:pt-32 md:pt-40 py-16 sm:py-20 md:py-24">
          <div className="relative w-full max-w-7xl flex flex-col lg:flex-row gap-6 items-start">
            <AboutClient cards={sortedCards} />
          </div>
        </section>
      </div>
      </PageWrapper>
    );
  } catch (error) {
    // Let Next.js error boundary handle it
    throw error;
  }
}
