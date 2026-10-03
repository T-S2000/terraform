"use client";

import { useEffect, useState } from "react";

type Project = {
  id: number;
  name: string;
  description: string | null;
  ownerId: number;
  createdAt: string;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects");

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchProjects();
  }, []);

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Projects</h1>

      {loading ? (
        <p className="mt-4">Loading projects...</p>
      ) : projects.length === 0 ? (
        <p className="mt-4 text-gray-600">No projects found.</p>
      ) : (
        <div className="mt-6 space-y-4">
          {projects.map((project) => (
            <div
              key={project.id}
              className="rounded-lg border p-4 shadow-sm"
            >
              <h2 className="text-xl font-semibold">
                {project.name}
              </h2>

              {project.description && (
                <p className="mt-2 text-gray-600">
                  {project.description}
                </p>
              )}

              <p className="mt-2 text-sm text-gray-500">
                Owner ID: {project.ownerId}
              </p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}