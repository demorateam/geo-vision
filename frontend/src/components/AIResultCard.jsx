function getPriorityClass(priority) {
  if (!priority) return "priority-chip";
  const value = String(priority).trim();

  if (value.includes("بالا") || value.toLowerCase().includes("high")) {
    return "priority-chip priority-high";
  }

  if (value.includes("متوسط") || value.toLowerCase().includes("medium")) {
    return "priority-chip priority-medium";
  }

  if (value.includes("پایین") || value.toLowerCase().includes("low")) {
    return "priority-chip priority-low";
  }

  return "priority-chip";
}

function AIResultCard({ loading, error, result }) {
  return (
    <div className="card result-card">
      <div className="section-title-row">
        <h2>نتیجه تحلیل AI</h2>
        {loading && <span className="live-chip">در حال پردازش</span>}
      </div>

      {loading && (
        <p className="info-text">
          در حال ارسال داده و دریافت تحلیل واقعی از سرویس AI
        </p>
      )}

      {!loading && error && <p className="error-text">{error}</p>}

      {!loading && !error && !result && (
        <p className="info-text">
          بعد از ثبت تیکت، خروجی تحلیل واقعی اینجا نمایش داده می‌شود
        </p>
      )}

      {!loading && !error && result && (
        <div className="result-box">
          <div className="result-item">
            <strong>دسته‌بندی</strong>
            <span>{result.category || "-"}</span>
          </div>

          <div className="result-item">
            <strong>اولویت</strong>
            <div className={getPriorityClass(result.priority)}>
              {result.priority || "-"}
            </div>
          </div>

          <div className="result-item">
            <strong>واحد مسئول</strong>
            <span>{result.department || "-"}</span>
          </div>

          <div className="result-item">
            <strong>جمع‌بندی</strong>
            <span>{result.summary || "-"}</span>
          </div>

          <div className="result-item">
            <strong>میزان اطمینان</strong>
            <span>{result.confidence || "-"}</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default AIResultCard;
