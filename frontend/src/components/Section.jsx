export default function Section({ title, value }) {
  return (
    <div style={{ marginBottom: "16px" }}>
      <div style={{ color: "#cbd5e1", marginBottom: "8px", fontWeight: 700 }}>
        {title}
      </div>
      <div
        style={{
          background: "#0f172a",
          border: "1px solid #334155",
          borderRadius: "14px",
          padding: "14px",
          color: "#e2e8f0",
          lineHeight: 1.9,
        }}
      >
        {value}
      </div>
    </div>
  );
}
