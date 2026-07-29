export default function ActionButton({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "10px 14px",
        borderRadius: "12px",
        border: active ? "1px solid #38bdf8" : "1px solid #334155",
        background: active ? "rgba(56, 189, 248, 0.12)" : "#0f172a",
        color: "#e2e8f0",
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}
