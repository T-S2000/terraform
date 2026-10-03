"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

type CreateTaskFormProps = {
  projectId: number;
};

export default function CreateTaskForm({ projectId }: CreateTaskFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [creating, setCreating] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      return;
    }

    setCreating(true);

    try {
      const response = await fetch(`/api/projects/${projectId}/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create task");
      }

      setTitle("");
      setDescription("");

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 max-w-md space-y-4">
      <div>
        <label className="block font-medium">Task title</label>

        <input
          type="text"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Enter task title"
          className="mt-1 w-full rounded border p-2"
        />
      </div>

      <div>
        <label className="block font-medium">Description</label>

        <textarea
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Enter task description"
          className="mt-1 w-full rounded border p-2"
        />
      </div>

      <button
        type="submit"
        disabled={creating}
        className="rounded bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {creating ? "Creating..." : "Create Task"}
      </button>
    </form>
  );
}
