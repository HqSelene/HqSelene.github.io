"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "../components";
import { getProjectCategories, type ProjectSummary } from "../project-types";

export function ProjectExplorer({ projects }: { projects: ProjectSummary[] }) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const categories = useMemo(() => getProjectCategories(projects), [projects]);
  const selected = categories.some(category => category.name === activeCategory) ? activeCategory : null;
  const filters = [{ name: "All projects", value: null, count: projects.length },
    ...categories.map(category => ({ ...category, value: category.name }))];

  const visibleProjects = useMemo(
    () =>
      selected === null
        ? projects
        : projects.filter((project) => project.category === selected),
    [selected, projects],
  );

  return (
    <section className="project-explorer" aria-label="Project browser">
      <div className="project-filter-bar">
        <div className="project-filter-label">
          <span aria-hidden="true">✦</span>
          <p>Explore</p>
        </div>
        <div className="project-filter-list" role="group" aria-label="Filter projects">
          {filters.map((category) => (
            <button
              type="button"
              key={category.value === null ? "all" : `category-${category.value}`}
              className={
                selected === category.value ? "filter-chip is-active" : "filter-chip"
              }
              aria-pressed={selected === category.value}
              aria-controls="project-results"
              onClick={() => setActiveCategory(category.value)}
            >
              <span>{category.name}</span>
              <strong>{category.count}</strong>
            </button>
          ))}
        </div>
      </div>

      <div className="project-result-meta">
        <p className="eyebrow">{selected ?? "All projects"}</p>
        <p aria-live="polite">
          Showing {visibleProjects.length}{" "}
          {visibleProjects.length === 1 ? "project" : "projects"}
        </p>
      </div>

      <div className="project-index-grid" id="project-results" key={selected ?? "all"}>
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
