import axios from "axios";

const API_URL = "http://127.0.0.1:8000/analyze";

export async function analyzeTicket({ image, description, location = "", eventTime = "" }) {
  try {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("location", location);
    formData.append("event_time", eventTime);
    formData.append("reporter_note", description);

    const response = await axios.post(API_URL, formData);

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(
        error.response.data?.detail
          ? String(error.response.data.detail)
          : "درخواست نامعتبر است",
      );
    }
    throw new Error("ارتباط با سرویس AI برقرار نشد");
  }
}

export function mapAnalysisToResult(apiResponse) {
  const result = apiResponse?.result;
  if (!result) return null;

  return {
    category: result.incident_type || "نامشخص",
    priority: result.priority || "-",
    department: result.organization || "نامشخص",
    summary: result.summary || "-",
    confidence:
      typeof result.vision?.confidence === "number"
        ? `${Math.round(result.vision.confidence * 100)}%`
        : "-",
  };
}