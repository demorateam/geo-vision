import "../styles/AdminPanel.css";

export default function TicketDetails({
  ticket,
  onChangeStatus,
  statusLabels,
  priorityLabels,
}) {
  if (!ticket) {
    return (
      <div className="admin-card empty-details-state">
        <h2 className="admin-card-title">جزئیات تیکت</h2>
        <p>یک تیکت را برای مشاهده جزئیات انتخاب کنید</p>
      </div>
    );
  }

  // گرفتن رنگ نقطه اولویت بر اساس مقدار اولویت تیکت
  const getPriorityIndicatorClass = (priority) => {
    if (!priority) return "priority-low";
    const value = String(priority).trim().toLowerCase();
    if (value.includes("high") || value.includes("بالا"))
      return "priority-high";
    if (value.includes("medium") || value.includes("متوسط"))
      return "priority-medium";
    return "priority-low";
  };

  return (
    <div className="admin-card">
      <div className="details-header">
        <div>
          <h2 className="admin-card-title" style={{ marginBottom: "4px" }}>
            جزئیات تیکت
          </h2>
          <p className="details-subtitle">
            بررسی اطلاعات ثبت‌شده و نتیجه تحلیل موتور هوش مصنوعی
          </p>
        </div>
        <span className={`status-badge ${ticket.status}`}>
          {statusLabels?.[ticket.status] || ticket.status}
        </span>
      </div>

      <div className="details-grid">
        {ticket.image && (
          <img src={ticket.image} alt="ضمیمه تیکت" className="details-image" />
        )}

        <div className="info-field-group">
          <div className="info-field-label">توضیحات کاربر</div>
          <div className="info-field-value">{ticket.description}</div>
        </div>

        <div className="info-subgrid">
          <div className="info-field-group">
            <div className="info-field-label">زمان ثبت تیکت</div>
            <div className="info-field-value">{ticket.createdAt}</div>
          </div>

          <div className="info-field-group">
            <div className="info-field-label">شناسه سیستم</div>
            <div className="info-field-value">#{ticket.id}</div>
          </div>
        </div>

        <div className="info-field-group">
          <div className="info-field-label">
            تحلیل هوش مصنوعی (نتیجه واقعی سرویس)
          </div>
          <div
            className="info-field-value"
            style={{ borderRight: "3px solid #388bfd" }}
          >
            {ticket.aiAnalysis || "تحلیلی دریافت نشد."}
          </div>
        </div>

        <div className="info-subgrid">
          <div className="info-field-group">
            <div className="info-field-label">سطح اولویت تیکت</div>
            <div className="priority-chip">
              <span
                className={`priority-indicator ${getPriorityIndicatorClass(ticket.priority)}`}
              ></span>
              <span>
                {priorityLabels?.[ticket.priority] || ticket.priority || "-"}
              </span>
            </div>
          </div>

          <div className="info-field-group">
            <div className="info-field-label">تغییر وضعیت تیکت</div>
            <div className="status-actions-group">
              <button
                onClick={() => onChangeStatus(ticket.id, "new")}
                className={`btn-status-action ${ticket.status === "new" ? "active-new" : ""}`}
              >
                جدید
              </button>
              <button
                onClick={() => onChangeStatus(ticket.id, "reviewing")}
                className={`btn-status-action ${ticket.status === "reviewing" ? "active-review" : ""}`}
              >
                بررسی
              </button>
              <button
                onClick={() => onChangeStatus(ticket.id, "closed")}
                className={`btn-status-action ${ticket.status === "closed" ? "active-closed" : ""}`}
              >
                بستن
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
