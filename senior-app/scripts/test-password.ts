import "dotenv/config";
import { prisma } from "../lib/prisma";
import { verifyPassword } from "../lib/auth";

async function main() {
  const user = await prisma.user.findFirst();

  if (!user || !user.passwordHash) {
    throw new Error("User or password hash not found");
  }

  const result = await verifyPassword(
    "ChangeMe123!",
    user.passwordHash
  );

  console.log("Password valid:", result);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });