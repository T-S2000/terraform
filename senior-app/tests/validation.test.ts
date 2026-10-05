import { describe, expect, it } from "vitest";
import { createProjectSchema } from "@/lib/validations/project";

describe("createProjectSchema", () => {
  it("accepts a valid project", () => {
    const result = createProjectSchema.safeParse({
      name: "My Project",
      description: "Test project",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.name).toBe("My Project");
    }
  });

  it("rejects an empty project name", () => {
    const result = createProjectSchema.safeParse({
      name: "",
      ownerId: 1,
    });

    expect(result.success).toBe(false);
  });

  it("rejects a project name longer than 100 characters", () => {
    const result = createProjectSchema.safeParse({
      name: "a".repeat(101),
      ownerId: 1,
    });

    expect(result.success).toBe(false);
  });
});
