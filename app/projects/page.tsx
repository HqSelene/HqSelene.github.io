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
      <main className="inner-page projects-page">
        <section className="page-intro">
          <p className="eyebrow">Selected archive · 2021—2026</p>
          <h1>Projects</h1>
          <p className="page-intro-copy">
            Research questions become interfaces, systems, environments, and
            stories. This is a focused archive of that work.
          </p>
        </section>

        <ProjectExplorer projects={projects} />
      </main>
      <SiteFooter />
    </>
  );
}
