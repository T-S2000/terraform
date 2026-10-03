"use client";

import { useState } from "react";
import TaskStatusSelect from "@/components/TaskStatusSelect";
import TaskAssigneeSelect from "@/components/TaskAssigneeSelect";
import DeleteTaskButton from "@/components/DeleteTaskButton";
import EditTaskButton from "@/components/EditTaskButton";

type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

type User = {
  id: number;
  name: string | null;
  email: string;
};

type Task = {
  id: number;
  title: string;
  description: string | null;
  status: TaskStatus;
  assignedToId: number | null;
  assignedTo: User | null;
};

type TaskFilterProps = {
  projectId: number;
  tasks: Task[];
  users: User[];
};

export default function TaskFilter({
  projectId,
  tasks,
  users,
}: TaskFilterProps) {
  const [filter, setFilter] = useState<"ALL" | TaskStatus>("ALL");

  const filteredTasks =
    filter === "ALL" ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="mt-6">
      <select
        value={filter}
        onChange={(event) =>
          setFilter(event.target.value as "ALL" | TaskStatus)
        }
        className="rounded border p-2"
      >
        <option value="ALL">All Tasks</option>
        <option value="TODO">TODO</option>
        <option value="IN_PROGRESS">IN PROGRESS</option>
        <option value="DONE">DONE</option>
      </select>

      <div className="mt-4 space-y-3">
        {filteredTasks.map((task) => (
          <div key={task.id} className="rounded border p-3">
            <p className="font-medium">{task.title}</p>

            {task.description && (
              <p className="mt-1 text-sm text-gray-600">{task.description}</p>
            )}

            {task.assignedTo && (
              <p className="mt-1 text-sm text-gray-500">
                Assigned to: {task.assignedTo.name || task.assignedTo.email}
              </p>
            )}

            <div className="mt-3 flex items-center gap-2">
              <TaskStatusSelect
                projectId={projectId}
                taskId={task.id}
                status={task.status}
              />

              <TaskAssigneeSelect
                projectId={projectId}
                taskId={task.id}
                assignedToId={task.assignedToId}
                users={users}
              />

              <EditTaskButton
                projectId={projectId}
                taskId={task.id}
                title={task.title}
                description={task.description}
              />

              <DeleteTaskButton projectId={projectId} taskId={task.id} />
            </div>
          </div>
        ))}

        {filteredTasks.length === 0 && (
          <p className="text-sm text-gray-500">No tasks found.</p>
        )}
      </div>
    </div>
  );
}
