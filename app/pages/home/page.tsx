import PageWrapper from "../../components/transitions/PageWrapper";
import HomeClient from "./components/HomeClient";

export default function Home() {
  return (
    <PageWrapper>
      <div className="relative h-screen w-full overflow-hidden bg-[#1a1a1a]">
        <section className="relative flex h-full flex-col md:flex-col items-start md:items-center justify-center pl-4 sm:pl-6 md:pl-8 lg:pl-16 xl:pl-24 pr-0 sm:pr-6 md:pr-8 lg:pr-16 xl:pr-24 overflow-hidden">
          <HomeClient />
        </section>
      </div>
    </PageWrapper>
  );
}

