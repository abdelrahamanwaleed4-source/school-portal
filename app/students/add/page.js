"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddStudentPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.target);
    const studentData = {
      name: formData.get("name"),
      email: formData.get("email"),
      age: parseInt(formData.get("age")),
      major: formData.get("major"),
      gpa: parseFloat(formData.get("gpa")),
    };

    const res = await fetch("/api/students", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(studentData),
    });

    if (res.ok) {
      router.push("/students"); // Go to list!
    } else {
      const data = await res.json();
      setError(data.error);
    }
    setLoading(false);
  }

  return (
    <div className="add-student">
      <h1>➕ Add Student</h1>

      {error && <p  className="error" style={{ color: "red" }}>❌ {error}</p>}

      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
        }}
      >
        <input name="name" placeholder="Full Name" required />
        <input name="email" type="email" placeholder="Email" required />
        <input
          name="age"
          type="number"
          min="16"
          max="60"
          placeholder="Age"
          required
        />
        <select name="major">
          <option value="CS">Computer Science</option>
          <option value="IT">Information Technology</option>
          <option value="IS">Information Systems</option>
          <option value="AI">Artificial Intelligence</option>
        </select>
        <input
          name="gpa"
          type="number"
          min="0"
          max="4"
          step="0.01"
          defaultValue="0"
          placeholder="GPA"
        />
        <button type="submit" disabled={loading}>
          {loading ? "Creating... ⏳" : "Create Student ✅"}
        </button>
      </form>
    </div>
  );
}
