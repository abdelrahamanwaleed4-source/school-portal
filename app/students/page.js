"use client"; // This page uses browser features

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch students when page loads
  useEffect(() => {
    fetchStudents();
  }, []);

  async function fetchStudents() {
    const res = await fetch("/api/students");
    const data = await res.json();
    setStudents(data.students);
    setLoading(false);
  }

  // Delete a student
  async function handleDelete(id, name) {
    if (!confirm(`Delete ${name}?`)) return;
    await fetch(`/api/students/${id}`, { method: "DELETE" });
    fetchStudents(); // Refresh the list
  }

  if (loading) return <p>Loading... ⏳</p>;

  return (
    <div style={{ maxWidth: "900px", margin: "0 auto",
                   padding: "20px", fontFamily: "sans-serif" }}>
      <h1>📋 Student List</h1>
      <p>Total: {students.length} students</p>

      <div style={{ display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
        gap: "16px" }}>
        {students.map((s) => (
          <div key={s.id} style={{
            background: "white", borderRadius: "12px",
            padding: "20px", border: "1px solid #e2e8f0"
          }}>
            <h3>{s.name}</h3>
            <p>📧 {s.email}</p>
            <p>🎂 {s.age} | 📚 {s.major} | ⭐ {s.gpa}</p>
            <button onClick={() => handleDelete(s.id, s.name)}
              style={{ background: "#fee2e2", color: "#b91c1c",
                border: "1px solid #fca5a5", borderRadius: "6px",
                padding: "6px 14px", cursor: "pointer" }}>
              🗑️ Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
