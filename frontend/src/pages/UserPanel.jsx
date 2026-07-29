import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import TicketForm from "../components/TicketForm";
import AIResultCard from "../components/AIResultCard";
import { analyzeTicket, mapAnalysisToResult } from "../services/aiService";
import { addTicket } from "../services/ticketStore";

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

export default function UserPanel() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [aiResult, setAiResult] = useState(null);

  const handleSubmit = async ({ image, description }) => {
    setLoading(true);
    setError(null);
    setAiResult(null);

    try {
      const response = await analyzeTicket({ image, description });
      const mapped = mapAnalysisToResult(response);
      setAiResult(mapped);

      const imageDataUrl = await fileToDataUrl(image);
      addTicket({
        title:
          mapped?.category && mapped.category !== "نامشخص"
            ? mapped.category
            : "حادثه ثبت‌شده",
        description,
        priority: mapped?.priority || "medium",
        aiAnalysis: mapped?.summary || "",
        department: mapped?.department || "-",
        image: imageDataUrl,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "40px auto", padding: "0 20px" }}>
      <button
        onClick={() => navigate("/")}
        style={{
          marginBottom: "20px",
          background: "transparent",
          border: "1px solid #334155",
          color: "#94a3b8",
          padding: "8px 16px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        ← بازگشت
      </button>

      <TicketForm onSubmit={handleSubmit} loading={loading} />

      <div style={{ marginTop: "20px" }}>
        <AIResultCard loading={loading} error={error} result={aiResult} />
      </div>
    </div>
  );
}