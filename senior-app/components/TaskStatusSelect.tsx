"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

type TaskStatusSelectProps = {
  projectId: number;
  taskId: number;
  status: TaskStatus;
};

export default function TaskStatusSelect({
  projectId,
  taskId,
  status,
}: TaskStatusSelectProps) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  async function handleStatusChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const newStatus = event.target.value as TaskStatus;

    setUpdating(true);

    try {
      const response = await fetch(
        `/api/projects/${projectId}/tasks/${taskId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: newStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update task status");
      }

      router.refresh();
    } catch (error) {
      console.error(error);
    } finally {
      setUpdating(false);
    }
  }

  return (
    <select
      value={status}
      onChange={handleStatusChange}
      disabled={updating}
      className="rounded border p-2 text-sm"
    >
      <option value="TODO">TODO</option>
      <option value="IN_PROGRESS">IN PROGRESS</option>
      <option value="DONE">DONE</option>
    </select>
  );
}