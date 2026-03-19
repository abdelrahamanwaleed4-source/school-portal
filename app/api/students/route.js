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
export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, age, major, gpa } = body;

    // Validate: make sure required fields exist
    if (!name || !email || !age) {
      return Response.json(
        { error: "Name, email, and age are required!" },
        { status: 400 }
      );
    }

    // Create the student in the database
    const student = await prisma.student.create({
      data: {
        name,
        email,
        age: parseInt(age),
        major: major || "CS",
        gpa: gpa ? parseFloat(gpa) : 0,
      },
    });

    return Response.json(
      { message: "Student created! ✅", student },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === "P2002") {
      return Response.json(
        { error: "A student with this email already exists!" },
        { status: 400 }
      );
    }
    return Response.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
