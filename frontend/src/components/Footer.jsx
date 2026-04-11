export default function Footer() {
  return (
    <footer style={{
      backgroundColor: "#111827",
      borderTop: "1px solid #1f2937",
      padding: "1.25rem 1.5rem",
      textAlign: "center",
      color: "#6b7280",
      fontSize: "0.75rem",
      fontFamily: "'Inter', sans-serif",
    }}>
      © {new Date().getFullYear()} ReserveHub. All rights reserved.
    </footer>
  );
}