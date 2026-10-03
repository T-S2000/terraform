import { prisma } from "@/lib/prisma";
import Link from "next/link";

type ProjectDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectDetailsPage({
  params,
}: ProjectDetailsPageProps) {
  const { id } = await params;

  const projectId = Number(id);

  const project = await prisma.project.findUnique({
    where: {
      id: projectId,
    },
    include: {
      owner: true,
      tasks: true,
    },
  });

  if (!project) {
    return (
      <main className="p-8">
        <h1 className="text-2xl font-bold">Project not found</h1>

        <Link
          href="/projects"
          className="mt-4 inline-block underline"
        >
          Back to projects
        </Link>
      </main>
    );
  }

  return (
    <main className="p-8">
      <Link href="/projects" className="underline">
        ← Back to projects
      </Link>

      <h1 className="mt-6 text-3xl font-bold">
        {project.name}
      </h1>

      {project.description && (
        <p className="mt-2 text-gray-600">
          {project.description}
        </p>
      )}

      <div className="mt-6 rounded-lg border p-4">
        <p>
          <strong>Project ID:</strong> {project.id}
        </p>

        <p>
          <strong>Owner:</strong> {project.owner.name ?? "Unknown"}
        </p>

        <p>
          <strong>Owner ID:</strong> {project.ownerId}
        </p>
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-semibold">Tasks</h2>

        {project.tasks.length === 0 ? (
          <p className="mt-2 text-gray-600">
            No tasks yet.
          </p>
        ) : (
          <div className="mt-4 space-y-3">
            {project.tasks.map((task) => (
              <div
                key={task.id}
                className="rounded border p-3"
              >
                <p className="font-medium">{task.title}</p>

                <p className="text-sm text-gray-500">
                  Status: {task.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}