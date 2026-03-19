const { PrismaClient } = require("@prisma/client");
const { PrismaBetterSqlite3 } = require("@prisma/adapter-better-sqlite3");
const path = require("path");

const dbPath = path.resolve(__dirname, "..", "dev.db");
const adapter = new PrismaBetterSqlite3({ url: `file:${dbPath}` });
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("🌱 Seeding database...\n");

  const students = [
    { name: "Ali Hassan",  email: "ali@msa.edu.eg",   age: 20, major: "CS", gpa: 3.75 },
    { name: "Sara Ahmed",  email: "sara@msa.edu.eg",  age: 22, major: "IT", gpa: 3.90 },
    { name: "Omar Khalil", email: "omar@msa.edu.eg",  age: 19, major: "CS", gpa: 2.80 },
    { name: "Lina Fathy",  email: "lina@msa.edu.eg",  age: 21, major: "IS", gpa: 3.50 },
    { name: "Khalid Nour", email: "khalid@msa.edu.eg",age: 23, major: "AI", gpa: 3.20 },
  ];

  for (const s of students) {
    const created = await prisma.student.create({ data: s });
    console.log(`  ✅ Created: ${created.name}`);
  }

  console.log("\n🌱 Done! 5 students added.\n");
}

main().finally(() => prisma.$disconnect());
