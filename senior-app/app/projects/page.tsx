"use client";

import { FormEvent, useEffect, useState } from "react";

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

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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

  useEffect(() => {
    fetchProjects();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          ownerId: 1,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create project");
      }

      setName("");
      setDescription("");

      await fetchProjects();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">Projects</h1>

      {/* Create Project */}
      <form onSubmit={handleSubmit} className="mt-6 max-w-md space-y-4">
        <div>
          <label className="block font-medium">Project name</label>

          <input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Enter project name"
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <div>
          <label className="block font-medium">Description</label>

          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            placeholder="Enter project description"
            className="mt-1 w-full rounded border p-2"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-black px-4 py-2 text-white"
        >
          Create Project
        </button>
      </form>

      {/* Projects List */}
      <section className="mt-10">
        <h2 className="text-2xl font-semibold">Your Projects</h2>

        {loading ? (
          <p className="mt-4">Loading projects...</p>
        ) : projects.length === 0 ? (
          <p className="mt-4 text-gray-600">No projects found.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {projects.map((project) => (
              <div
                key={project.id}
                className="rounded-lg border p-4 shadow-sm"
              >
                <h3 className="text-xl font-semibold">
                  {project.name}
                </h3>

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
      </section>
    </main>
  );
}