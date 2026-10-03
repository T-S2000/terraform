"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type User = {
  id: number;
  name: string | null;
  email: string;
};

type TaskAssigneeSelectProps = {
  projectId: number;
  taskId: number;
  assignedToId: number | null;
  users: User[];
};

export default function TaskAssigneeSelect({
  projectId,
  taskId,
  assignedToId,
  users,
}: TaskAssigneeSelectProps) {
  const router = useRouter();
  const [updating, setUpdating] = useState(false);

  async function handleChange(
    event: React.ChangeEvent<HTMLSelectElement>
  ) {
    const value = event.target.value;

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
            assignedToId: value === "" ? null : Number(value),
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to assign task");
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
      value={assignedToId ?? ""}
      onChange={handleChange}
      disabled={updating}
      className="rounded border p-2 text-sm"
    >
      <option value="">Unassigned</option>

      {users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name || user.email}
        </option>
      ))}
    </select>
  );
}