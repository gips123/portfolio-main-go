import PageWrapper from "../../components/transitions/PageWrapper";
import ProjectsSection from "./components/ProjectsSection";
import DesignProjectsShowcase from "./components/DesignProjectsShowcase";
import ProjectsListSection from "./components/ProjectsListSection";
import { getProjects, getCategories } from "../../lib/api/projects";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function Projects() {
  try {
    const [projects, categories] = await Promise.all([
      getProjects(),
      getCategories(),
    ]);

    return (
      <PageWrapper>
        <div className="relative min-h-screen w-full bg-[#1a1a1a]">
          <section className="relative min-h-screen w-full flex items-center justify-center px-4 sm:px-8 md:px-16 lg:px-24 py-16 sm:py-20 md:py-24">
            <div className="relative w-full max-w-7xl">
              <ProjectsSection projects={projects} />
            </div>
          </section>

          <DesignProjectsShowcase projects={projects} />

          <div id="project-list-section">
            <ProjectsListSection projects={projects} categories={categories} />
          </div>
        </div>
      </PageWrapper>
    );
  } catch (error) {
    // Let Next.js error boundary handle it
    throw error;
  }
}
