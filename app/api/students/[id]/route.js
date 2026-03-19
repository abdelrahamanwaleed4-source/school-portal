import prisma from "../../../lib/prisma";

// ===== GET one student =====
export async function GET(request, { params }) {
  try {
    const { id } = await params;
    const student = await prisma.student.findUnique({
      where: { id: parseInt(id) },
    });

    if (!student) {
      return Response.json(
        { error: `Student #${id} not found` },
        { status: 404 }
      );
    }
    return Response.json(student);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ===== PUT — Update a student =====
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    const student = await prisma.student.update({
      where: { id: parseInt(id) },
      data: body,
    });

    return Response.json({ message: "Updated! ✅", student });
  } catch (error) {
    if (error.code === "P2025") {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}

// ===== DELETE — Remove a student =====
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    const student = await prisma.student.delete({
      where: { id: parseInt(id) },
    });

    return Response.json({ message: "Deleted! 🗑️", deleted: student });
  } catch (error) {
    if (error.code === "P2025") {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ error: error.message }, { status: 500 });
  }
}
