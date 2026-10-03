import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    id: string;
    taskId: string;
  }>;
};

export async function PATCH(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id, taskId } = await params;

    const projectId = Number(id);
    const taskIdNumber = Number(taskId);

    if (Number.isNaN(projectId) || Number.isNaN(taskIdNumber)) {
      return NextResponse.json(
        { error: "Invalid project ID or task ID" },
        { status: 400 }
      );
    }

    const body = await request.json();

    const { title, description, status, assignedToId } = body;

    const task = await prisma.task.updateMany({
      where: {
        id: taskIdNumber,
        projectId,
      },
      data: {
        ...(title !== undefined && { title }),
        ...(description !== undefined && { description }),
        ...(status !== undefined && { status }),
        ...(assignedToId !== undefined && {
          assignedToId: assignedToId === null
            ? null
            : Number(assignedToId),
        }),
      },
    });

    if (task.count === 0) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    const updatedTask = await prisma.task.findUnique({
      where: {
        id: taskIdNumber,
      },
    });

    return NextResponse.json(updatedTask);
  } catch (error) {
    console.error("Failed to update task:", error);

    return NextResponse.json(
      { error: "Failed to update task" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id, taskId } = await params;

    const projectId = Number(id);
    const taskIdNumber = Number(taskId);

    if (Number.isNaN(projectId) || Number.isNaN(taskIdNumber)) {
      return NextResponse.json(
        { error: "Invalid project ID or task ID" },
        { status: 400 }
      );
    }

    const task = await prisma.task.deleteMany({
      where: {
        id: taskIdNumber,
        projectId,
      },
    });

    if (task.count === 0) {
      return NextResponse.json(
        { error: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete task:", error);

    return NextResponse.json(
      { error: "Failed to delete task" },
      { status: 500 }
    );
  }
}