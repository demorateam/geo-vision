import { useMemo, useState } from "react";

function TicketForm({ onSubmit, loading }) {
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState("");

  const previewUrl = useMemo(() => {
    if (!image) return null;
    return URL.createObjectURL(image);
  }, [image]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image || !description.trim()) {
      alert("لطفاً تصویر و توضیحات را وارد کنید");
      return;
    }

    onSubmit({
      image,
      description,
    });
  };

  return (
    <div className="card">
      <h2>ثبت تیکت جدید</h2>

      <form onSubmit={handleSubmit} className="ticket-form">
        <div className="form-group">
          <label>تصویر</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        {previewUrl && (
          <div className="image-preview-box">
            <span className="preview-label">پیش‌نمایش تصویر</span>
            <img src={previewUrl} alt="preview" className="preview-image" />
          </div>
        )}

        <div className="form-group">
          <label>توضیحات</label>
          <textarea
            rows="5"
            placeholder="توضیح مشکل یا درخواست را وارد کنید"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <button type="submit" disabled={loading} className="submit-btn">
          {loading ? "در حال تحلیل..." : "ارسال برای تحلیل AI"}
        </button>
      </form>
    </div>
  );
}

export default TicketForm;
