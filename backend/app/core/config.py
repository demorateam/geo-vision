from dotenv import load_dotenv
from pathlib import Path
import os

# مسیر ریشه پروژه (دو پوشه بالاتر از این فایل: core -> app -> root)
BASE_DIR = Path(__file__).resolve().parent.parent.parent
ENV_PATH = BASE_DIR / ".env"

load_dotenv(dotenv_path=ENV_PATH)


class Settings:
    OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
    OPENAI_BASE_URL = os.getenv("OPENAI_BASE_URL")
    VISION_MODEL = os.getenv("VISION_MODEL")
    LLM_MODEL = os.getenv("LLM_MODEL")

    def validate(self):
        missing = []
        if not self.OPENAI_API_KEY:
            missing.append("OPENAI_API_KEY")
        if not self.OPENAI_BASE_URL:
            missing.append("OPENAI_BASE_URL")
        if not self.VISION_MODEL:
            missing.append("VISION_MODEL")
        if not self.LLM_MODEL:
            missing.append("LLM_MODEL")
        if missing:
            raise RuntimeError(
                f"متغیرهای زیر در .env تنظیم نشده‌اند: {', '.join(missing)}\n"
                f"مسیر فایل .env که چک شد: {ENV_PATH}\n"
                f"آیا فایل در این مسیر وجود دارد؟ {ENV_PATH.exists()}"
            )


settings = Settings()
settings.validate()