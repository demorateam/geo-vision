import base64
import json
import mimetypes
from pathlib import Path

from app.clients.openai_client import client
from app.core.config import settings


VISION_PROMPT = """
تصویر ارسال‌شده را با دقت بررسی کن.
خروجی را فقط و فقط به‌صورت یک JSON معتبر با ساختار زیر برگردان،
بدون هیچ توضیح اضافه، بدون Markdown، بدون علامت ```:

{
  "scene": "توصیف کوتاه صحنه به فارسی",
  "objects": ["لیست اشیای مهم مشاهده‌شده به فارسی"],
  "confidence": عددی بین 0.0 تا 1.0
}
"""


class VisionService:

    async def analyze(self, image_path: str):
        image_name = Path(image_path).name

        # تشخیص نوع فایل (jpg, png, ...) به‌صورت پویا
        mime_type, _ = mimetypes.guess_type(image_path)
        if mime_type is None:
            mime_type = "image/jpeg"  # پیش‌فرض امن

        with open(image_path, "rb") as f:
            image_bytes = f.read()
        base64_image = base64.b64encode(image_bytes).decode("utf-8")

        response = client.chat.completions.create(
            model=settings.VISION_MODEL,
            messages=[
                {
                    "role": "user",
                    "content": [
                        {"type": "text", "text": VISION_PROMPT},
                        {
                            "type": "image_url",
                            "image_url": {
                                "url": f"data:{mime_type};base64,{base64_image}"
                            },
                        },
                    ],
                }
            ],
            max_tokens=500,
        )

        raw_content = response.choices[0].message.content.strip()

        # اگر مدل خروجی را داخل ```json ... ``` بفرستد، پاکسازی می‌کنیم
        if raw_content.startswith("```"):
            raw_content = raw_content.strip("`")
            raw_content = raw_content.replace("json", "", 1).strip()

        try:
            parsed = json.loads(raw_content)
        except json.JSONDecodeError:
            parsed = {
                "scene": "خطا در تحلیل تصویر (پاسخ مدل قابل‌تجزیه نبود)",
                "objects": [],
                "confidence": 0.0,
            }

        return {
            "image_name": image_name,
            "scene": parsed.get("scene", ""),
            "objects": parsed.get("objects", []),
            "confidence": parsed.get("confidence", 0.0),
        }


vision_service = VisionService()