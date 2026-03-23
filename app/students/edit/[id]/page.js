"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";


export default function EditStudentPage() {
  const router = useRouter();
  const { id } = useParams();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  

  // 🔽 Fetch student data
  useEffect(() => {
    async function getStudent() {
      try {
        const res = await fetch(`/api/students/${id}`);

        if (!res.ok) {
          throw new Error("Student not found");
        }

        const data = await res.json();
        setStudent(data);
      } catch (err) {
        setError(err.message);
      }

      setLoading(false);
    }

    if (id) getStudent();
  }, [id]);

  // 🔽 Handle form submit
async function handleSubmit(e) {
  e.preventDefault();
  setError(""); // reset error

  const formData = new FormData(e.target);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    age: Number(formData.get("age")),
    major: formData.get("major"),
    gpa: Number(formData.get("gpa")),
  };

  const res = await fetch("/api/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errData = await res.json();
    setError(errData.error); // 🔥 show backend error
    return;
  }

  // success
  window.location.href = "/students";
}

  if (loading && !student) return <p>Loading... ⏳</p>;

  return (
    
    <div className="editstudent" >
      <h1>✏️ Edit Student</h1>

      {error && <p className="error" style={{ color: "red" }}>❌ {error}</p>}

      <form
        onSubmit={handleSubmit}>
        <input name="name" defaultValue={student?.name} required />
        <input name="email" type="email" defaultValue={student?.email} required />
        <input name="age" type="number" defaultValue={student?.age} required />

        <select name="major" defaultValue={student?.major}>
          <option value="CS">Computer Science</option>
          <option value="IT">Information Technology</option>
          <option value="IS">Information Systems</option>
          <option value="AI">Artificial Intelligence</option>
        </select>

        <input name="gpa" type="number" step="0.01" defaultValue={student?.gpa} />

        <button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes ✅"}
        </button>
      </form>
    </div>
  );
}