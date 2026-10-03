import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { createProjectSchema } from "@/lib/validations/project";

export async function GET() {
  try {
    const projects = await prisma.project.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    console.error("Failed to fetch projects:", error);

    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const result = createProjectSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        {
          error: "Validation failed",
          details: result.error.issues,
        },
        { status: 400 },
      );
    }

    const { name, description, ownerId } = result.data;

    const project = await prisma.project.create({
      data: {
        name,
        description,
        ownerId: Number(ownerId),
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to create project:", error);

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
