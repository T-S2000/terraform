"use client";

import { useState } from "react";
import EditTaskForm from "@/components/EditTaskForm";

type EditTaskButtonProps = {
  projectId: number;
  taskId: number;
  title: string;
  description: string | null;
};

export default function EditTaskButton({
  projectId,
  taskId,
  title,
  description,
}: EditTaskButtonProps) {
  const [editing, setEditing] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setEditing((value) => !value)}
        className="rounded border px-3 py-1 text-sm"
      >
        {editing ? "Cancel" : "Edit"}
      </button>

      {editing && (
        <EditTaskForm
          projectId={projectId}
          taskId={taskId}
          initialTitle={title}
          initialDescription={description}
        />
      )}
    </div>
  );
}
