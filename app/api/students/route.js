// app/api/students/route.js
import prisma from "../../lib/prisma";

// ===== GET — Fetch all students =====
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: { createdAt: "desc" },  // Newest first
    });

    return Response.json({
      count: students.length,
      students,
    });
  } catch (error) {
    return Response.json(
      { error: "Failed to fetch students: " + error.message },
      { status: 500 }
    );
  }
}

// ===== POST — Create a new student =====
export async function POST(req) {
  try {
    const body = await req.json();
    const { name, email, age, major, gpa } = body;

    // 🔴 1. Required fields validation
    if (!name || !email || !age || !major) {
      return Response.json(
        { error: "All fields (name, email, age, major) are required" },
        { status: 400 }
      );
    }

    // 🔴 2. Create student
    const student = await prisma.student.create({
      data: {
        name,
        email,
        age: Number(age),
        major,
        gpa: gpa ? Number(gpa) : null,
      },
    });

    return Response.json(student);
  } catch (err) {
    // 🔴 3. Handle duplicate email
    if (err.code === "P2002") {
      return Response.json(
        { error: "Email already exists" },
        { status: 400 }
      );
    }

    // 🔴 4. General error
    return Response.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
