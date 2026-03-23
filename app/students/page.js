"use client"; // This page uses browser features

import { useState, useEffect } from "react";
import Link from "next/link";

export default function StudentsPage() {
  const [students, setStudents] = useState([]); //sets students to an empty array and setStudents is the function that will update the students state
  const [loading, setLoading] = useState(true); //sets loading to true and setLoading is the function that will update the loading state
  const [searchname, setSearchName] = useState(""); //sets searchname to an empty string and setSearchName is the function that will update the searchname state

  // Fetch students when page loads
  useEffect(() => {
    fetchStudents(); //
  }, []);

  async function fetchStudents() {
    const res = await fetch("/api/students"); //fetches the students from the API
    const data = await res.json(); //converts the response to JSON
    setStudents(data.students); //sets students to the students array that is returned from the API
    setLoading(false); //sets loading to false after fetching the students
  }

  // Delete a student
  async function handleDelete(id, name) {
    if (!confirm(`Delete ${name}?`)) return; //asks the user to confirm if they want to delete the student, if they click cancel it will return and not delete the student
    await fetch(`/api/students/${id}`, { method: "DELETE" }); //deletes the student with the given id from the API
    fetchStudents(); // Refresh the list
  }

  const filteredStudents = students.filter(
    (s) => s.name.toLowerCase().includes(searchname.toLowerCase()), ///this function have  afiltered list of every student name(lowercase) that includes the searchname(typed character)(lowercase)
  );

  if (loading) return <p className="loading">Loading... ⏳</p>; //if loading is true it will return a loading message

  return (
    <div className="container">
      <div className="header">
        <h1>📋 Student List</h1>
        <p>Total: {filteredStudents.length} students</p>

        <div className="search">
          <input
            type="text"
            placeholder="search by name"
            value={searchname}
            onChange={(e) => setSearchName(e.target.value)} //updates the searchname state with the value of the input when it changes
          ></input>
        </div>
      </div>

      <div className="students-grid">
        {filteredStudents.map(
          (
            student, //maps over the filteredStudents array and returns a card for each student
          ) => (
            <div className="student-card" key={student.id}>
              <h3>{student.name}</h3>
              <p>📧 {student.email}</p>
              <p>
                🎂 {student.age} | 📚 {student.major} | ⭐ {student.gpa}
              </p>
              <button
                className="delete-button"
                onClick={() => handleDelete(student.id, student.name)}
              >
                🗑️ Delete
              </button>
              <Link  href={`/students/edit/${student.id}`}>
                ✏️ Edit
              </Link>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
