import { PageHeading } from "../page-heading";
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "../components";
import { projects } from "../data";
import { ProjectExplorer } from "./project-explorer";

export const metadata: Metadata = {
  title: "Projects — Qing He",
  description:
    "Selected work in human-computer interaction, product design, spatial practice, and data science.",
};

export default function ProjectsPage() {
  return (
    <>
      <SiteHeader />
      <main className="inner-page projects-page index-page">
        <PageHeading title="Projects" label={`Selected archive · ${projects.length ? Math.min(...projects.map(project => Number(project.year))) : ""}—${projects.length ? Math.max(...projects.map(project => Number(project.year))) : ""}`} description="Research questions become interfaces, systems, environments, and stories. This is a focused archive of that work." />

        <ProjectExplorer projects={projects.map(({ html, headings, gallery, ...summary }) => {
          void html; void headings; void gallery;
          return summary;
        })} />
      </main>
      <SiteFooter />
    </>
  );
}
