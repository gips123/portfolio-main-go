import { notFound } from "next/navigation";
import PageWrapper from "../../../components/transitions/PageWrapper";
import { getProjectById } from "../../../lib/api/projects";
import ProjectDetail from "./components/ProjectDetail";

interface ProjectDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const projectId = parseInt(id);
  
  try {
    const project = await getProjectById(projectId);
    
    if (!project) {
      return {
        title: "Project Not Found",
      };
    }

    return {
      title: `${project.title} | Project Detail`,
      description: project.description,
      openGraph: {
        title: project.title,
        description: project.description,
        images: [project.imageUrl],
      },
    };
  } catch (error) {
    return {
      title: "Project Not Found",
    };
  }
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { id } = await params;
  const projectId = parseInt(id);
  
  try {
    const project = await getProjectById(projectId);

    if (!project) {
      notFound();
    }

    return (
      <PageWrapper>
        <ProjectDetail project={project} />
      </PageWrapper>
    );
  } catch (error) {
    notFound();
  }
}

