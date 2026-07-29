const form = document.getElementById("form");
const resultBox = document.getElementById("result");
const errorBox = document.getElementById("error-box");

const PRIORITY_LABELS = {
  low: "کم",
  medium: "متوسط",
  high: "بالا",
  critical: "بحرانی",
};

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  errorBox.style.display = "none";
  errorBox.textContent = "";
  resultBox.innerHTML = "<p>در حال تحلیل...</p>";

  const data = new FormData();
  data.append("image", document.getElementById("image").files[0]);
  data.append("location", document.getElementById("location").value);
  data.append("event_time", document.getElementById("time").value);
  data.append("reporter_note", document.getElementById("note").value);

  try {
    const response = await fetch("http://127.0.0.1:8000/analyze", {
      method: "POST",
      body: data,
    });

    if (!response.ok) {
      throw new Error(`خطای سرور: ${response.status}`);
    }

    const payload = await response.json();
    renderTicket(payload);
  } catch (err) {
    resultBox.innerHTML = "";
    errorBox.style.display = "block";
    errorBox.textContent = "خطا در دریافت پاسخ از سرور: " + err.message;
  }
});

function renderTicket(payload) {
  const result = payload.result || {};
  const vision = result.vision || {};

  const priority = result.priority || "low";
  const priorityLabel = PRIORITY_LABELS[priority] || priority;

  const objectsText = (vision.objects || []).join("، ");

  resultBox.innerHTML = `
    <div class="ticket priority-${priority}">
      <h3>🎫 تیکت حادثه</h3>

      <div class="row">
        <span class="label">نوع حادثه:</span>
        ${escapeHtml(result.incident_type || "نامشخص")}
      </div>

      <div class="row">
        <span class="label">سازمان مسئول:</span>
        ${escapeHtml(result.organization || "نامشخص")}
      </div>

      <div class="row">
        <span class="label">اولویت:</span>
        <span class="badge ${priority}">${escapeHtml(priorityLabel)}</span>
      </div>

      <div class="row">
        <span class="label">خلاصه:</span>
        ${escapeHtml(result.summary || "")}
      </div>

      <div class="row">
        <span class="label">موقعیت مکانی:</span>
        ${escapeHtml(result.location || "-")}
      </div>

      <div class="row">
        <span class="label">زمان وقوع:</span>
        ${escapeHtml(result.event_time || "-")}
      </div>

      <div class="row">
        <span class="label">توضیحات گزارش‌دهنده:</span>
        ${escapeHtml(result.reporter_note || "-")}
      </div>

      <div class="vision-box">
        <strong>تحلیل تصویر (Vision):</strong><br>
        صحنه: ${escapeHtml(vision.scene || "-")}<br>
        اشیای مشاهده‌شده: ${escapeHtml(objectsText || "-")}<br>
        میزان اطمینان: ${vision.confidence !== undefined ? (vision.confidence * 100).toFixed(0) + "%" : "-"}
      </div>
    </div>
  `;
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text;
  return div.innerHTML;
}