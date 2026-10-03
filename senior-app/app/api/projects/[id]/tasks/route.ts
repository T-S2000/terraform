import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const createTaskSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, "Task title is required")
    .max(200, "Task title is too long"),

  description: z
    .string()
    .trim()
    .max(1000, "Description is too long")
    .optional(),

  assignedToId: z.coerce.number().int().positive().nullable().optional(),
});

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const projectId = Number(id);

    if (Number.isNaN(projectId)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const tasks = await prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(tasks);
  } catch (error) {
    console.error("Failed to fetch tasks:", error);

    return NextResponse.json(
      { error: "Failed to fetch tasks" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;
    const projectId = Number(id);

    if (Number.isNaN(projectId)) {
      return NextResponse.json(
        { error: "Invalid project ID" },
        { status: 400 },
      );
    }

    const body = await request.json();

    const result = createTaskSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.issues,
        },
        { status: 400 },
      );
    }

    const { title, description, assignedToId } = result.data;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        projectId,
        assignedToId: assignedToId ?? null,
      },
    });

    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    console.error("Failed to create task:", error);

    return NextResponse.json(
      { error: "Failed to create task" },
      { status: 500 },
    );
  }
}
