import Link from "next/link";

export default function HomePage() {
  return (
    <div style={{ maxWidth: "800px", margin: "0 auto",
                   padding: "20px", fontFamily: "sans-serif" }}>
      {/* Header */}
      <header style={{
        textAlign: "center", padding: "30px",
        background: "linear-gradient(135deg, #667eea, #764ba2)",
        borderRadius: "16px", color: "white", marginBottom: "30px"
      }}>
        <h1 style={{ fontSize: "2.5rem" }}>🏫 School Portal</h1>
        <p>Student Management System</p>
      </header>

      {/* Navigation */}
      <nav style={{ display: "flex", gap: "12px",
                    justifyContent: "center", marginBottom: "30px" }}>
        <Link href="/students" style={{
          padding: "12px 24px", background: "#4f46e5",
          color: "white", borderRadius: "8px",
          textDecoration: "none", fontWeight: "bold"
        }}>
          📋 View Students
        </Link>
        <Link href="/students/add" style={{
          padding: "12px 24px", background: "#059669",
          color: "white", borderRadius: "8px",
          textDecoration: "none", fontWeight: "bold"
        }}>
          ➕ Add Student
        </Link>
      </nav>

      {/* How it works */}
      <div style={{ background: "#f8fafc", padding: "24px",
                    borderRadius: "12px", border: "1px solid #e2e8f0" }}>
        <h2>🚀 How This App Works</h2>
        <ol style={{ lineHeight: "2" }}>
          <li><strong>Frontend</strong> → React (Next.js)</li>
          <li><strong>API Routes</strong> → /api/students</li>
          <li><strong>Database</strong> → Prisma + SQLite</li>
        </ol>
      </div>
    </div>
  );
}