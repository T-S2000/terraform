import "dotenv/config";
import { prisma } from "../lib/prisma";
import { hashPassword } from "../lib/auth";

async function main() {
  const user = await prisma.user.findFirst();

  if (!user) {
    throw new Error("No user found");
  }

  const passwordHash = await hashPassword("ChangeMe123!");

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordHash,
    },
  });

  console.log(`Password hash created for user ${user.id}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });