export default function StatCard({ title, value, color = "#e2e8f0" }) {
  return (
    <div
      style={{
        background: "#111827",
        border: "1px solid #334155",
        borderRadius: "16px",
        padding: "18px",
      }}
    >
      <div style={{ color: "#94a3b8", fontSize: "13px", marginBottom: "8px" }}>
        {title}
      </div>
      <div style={{ color, fontSize: "28px", fontWeight: 800 }}>{value}</div>
    </div>
  );
}
