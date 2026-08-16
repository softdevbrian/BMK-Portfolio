import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { projects, getProject } from "@/data/projects"
import { site } from "@/data/site"
import { ProjectDetailClient } from "./ProjectDetailClient"

interface ProjectPageProps {
  params: Promise<{
    slug: string
  }>
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    return {
      title: "Project Not Found",
    }
  }

  return {
    title: `${project.title} | ${site.name}`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} | ${site.name}`,
      description: project.tagline,
      images: [project.cover || "/images/og.png"],
    },
  }
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params
  const project = getProject(slug)

  if (!project) {
    notFound()
  }

  const currentIndex = projects.findIndex((p) => p.slug === project.slug)
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null

  return (
    <ProjectDetailClient
      project={project}
      prevProject={prevProject ? { slug: prevProject.slug, title: prevProject.title } : null}
      nextProject={nextProject ? { slug: nextProject.slug, title: nextProject.title } : null}
    />
  )
}
