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
    <div style={{ maxWidth: "500px", margin: "0 auto",
                   padding: "20px", fontFamily: "sans-serif" }}>
      <h1>➕ Add Student</h1>

      {error && <p style={{ color: "red" }}>❌ {error}</p>}

      <form onSubmit={handleSubmit} style={{
        display: "flex", flexDirection: "column", gap: "14px"
      }}>
        <input name="name" placeholder="Full Name"
          required style={{ padding: "10px" }} />
        <input name="email" type="email" placeholder="Email"
          required style={{ padding: "10px" }} />
        <input name="age" type="number" min="16" max="60"
          placeholder="Age" required style={{ padding: "10px" }} />
        <select name="major" style={{ padding: "10px" }}>
          <option value="CS">Computer Science</option>
          <option value="IT">Information Technology</option>
          <option value="IS">Information Systems</option>
          <option value="AI">Artificial Intelligence</option>
        </select>
        <input name="gpa" type="number" min="0" max="4"
          step="0.01" defaultValue="0"
          placeholder="GPA" style={{ padding: "10px" }} />
        <button type="submit" disabled={loading} style={{
          padding: "14px", background: "#4f46e5", color: "white",
          border: "none", borderRadius: "8px", fontSize: "1.1rem",
          fontWeight: "bold", cursor: "pointer"
        }}>
          {loading ? "Creating... ⏳" : "Create Student ✅"}
        </button>
      </form>
    </div>
  );
}
