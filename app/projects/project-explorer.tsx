"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "../components";
import type { Project } from "../data";

const categories = [
  "All projects",
  "Interaction & Product",
  "Design",
  "Data Science",
] as const;

type Category = (typeof categories)[number];

export function ProjectExplorer({ projects }: { projects: Project[] }) {
  const [activeCategory, setActiveCategory] =
    useState<Category>("All projects");

  const visibleProjects = useMemo(
    () =>
      activeCategory === "All projects"
        ? projects
        : projects.filter((project) => project.category === activeCategory),
    [activeCategory, projects],
  );

  function countFor(category: Category) {
    return category === "All projects"
      ? projects.length
      : projects.filter((project) => project.category === category).length;
  }

  return (
    <section className="project-explorer" aria-label="Project browser">
      <div className="project-filter-bar">
        <div className="project-filter-label">
          <span aria-hidden="true">✦</span>
          <p>Explore by practice</p>
        </div>
        <div className="project-filter-list" role="group" aria-label="Filter projects">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                activeCategory === category ? "filter-chip is-active" : "filter-chip"
              }
              aria-pressed={activeCategory === category}
              onClick={() => setActiveCategory(category)}
            >
              <span>{category}</span>
              <strong>{String(countFor(category)).padStart(2, "0")}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="project-result-meta">
        <p className="eyebrow">{activeCategory}</p>
        <p aria-live="polite">
          Showing {visibleProjects.length}{" "}
          {visibleProjects.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="project-index-grid" key={activeCategory}>
        {visibleProjects.map((project) => (
          <ProjectCard
            key={project.slug}
            project={project}
            index={projects.indexOf(project)}
            variant="compact"
          />
        ))}
      </div>
    </section>
  );
}

