import Link from "next/link";

export default function HomePage() {
  return (
    <div  className="container" >
      {/* Header */}
      <header className="header">
        <h1 style={{ fontSize: "2.5rem" }}>🏫 School Portal</h1>
        <p>Student Management System</p>
      </header>

      {/* Navigation */}
      <nav  >
        <Link href="/students" >
          📋 View Students
        </Link>
        <Link href="/students/add">
          ➕ Add Student
        </Link>
      </nav>

      {/* How it works */}
      <div className="components" >
        <h2>🚀 How This App Works</h2>
        <ol >
          <li><strong>Frontend</strong> → React (Next.js)</li>
          <li><strong>API Routes</strong> → /api/students</li>
          <li><strong>Database</strong> → Prisma + SQLite</li>
        </ol>
      </div>
    </div>
  );
}