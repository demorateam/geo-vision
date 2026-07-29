import React from "react";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div
      className="home-container"
      style={{ padding: "60px 20px", maxWidth: "1000px", margin: "0 auto" }}
    >
      <div style={{ textAlign: "center", marginBottom: "60px" }}>
        <h1
          style={{ fontSize: "3rem", color: "#f8fafc", marginBottom: "16px" }}
        >
          GeoVision
        </h1>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>
          پلتفرم یکپارچه برای ثبت و تحلیل هوشمند درخواست‌های پشتیبانی
        </p>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "30px" }}
      >
        {/* کارت ورود کاربر */}
        <div
          onClick={() => navigate("/user")}
          className="nav-card"
          style={{
            background: "#1e293b",
            padding: "40px",
            borderRadius: "20px",
            cursor: "pointer",
            border: "1px solid #334155",
            transition: "0.3s",
          }}
        >
          <h2 style={{ color: "#38bdf8", marginBottom: "15px" }}>
            پورتال کاربران
          </h2>
          <p style={{ color: "#cbd5e1" }}>
            ثبت تیکت، بارگذاری مستندات و مشاهده تحلیل هوش مصنوعی
          </p>
        </div>

        {/* کارت ورود مدیر */}
        <div
          onClick={() => navigate("/admin")}
          className="nav-card"
          style={{
            background: "#1e293b",
            padding: "40px",
            borderRadius: "20px",
            cursor: "pointer",
            border: "1px solid #334155",
            transition: "0.3s",
          }}
        >
          <h2 style={{ color: "#2dd4bf", marginBottom: "15px" }}>پنل مدیریت</h2>
          <p style={{ color: "#cbd5e1" }}>
            نظارت بر تیکت‌ها، مشاهده داشبورد آماری و وضعیت سیستم
          </p>
        </div>
      </div>
    </div>
  );
}
