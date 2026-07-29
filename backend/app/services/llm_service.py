import json

from app.clients.openai_client import client
from app.core.config import settings


# نگاشت سازمان‌ها به انواع حادثه به همراه توضیح هر نوع حادثه
ORGANIZATION_MAP = {
    "شهرداری": {
        "زباله": "انباشت زباله، عدم جمع‌آوری زباله، سطل‌های زباله پر یا آسیب‌دیده",
        "نخاله": "ریختن نخاله و ضایعات ساختمانی در معابر یا فضاهای عمومی",
        "چاله خیابانی": "چاله، گودال یا آسیب سطح آسفالت در خیابان و پیاده‌رو",
        "روشنایی معابر": "خرابی، خاموشی یا آسیب چراغ‌های روشنایی خیابان و پارک",
        "فضای سبز": "آسیب به درخت، شکستن شاخه، افتادن درخت، چمن یا گل‌کاری آسیب‌دیده در پارک‌ها و فضای سبز شهری",
    },
    "نهادهای امنیتی": {
        "رخداد امنیتی": "درگیری، دعوا، ناآرامی یا هر رویداد امنیتی در فضای عمومی",
        "انفجار": "هرگونه انفجار مشاهده‌شده اعم از عمدی یا تصادفی",
        "محل اصابت موشک یا بمب": "آثار برخورد موشک، بمب یا مهمات جنگی به ساختمان یا منطقه",
        "موارد مشکوک": "بسته، خودرو یا شیء مشکوک رهاشده در مکان عمومی",
    },
    "مخابرات": {
        "قطعی کابل": "قطع شدن یا آسیب دیدن کابل مخابراتی هوایی یا زمینی",
        "خرابی فیبر نوری": "قطعی یا آسیب فیبر نوری اینترنت",
        "آسیب داکت": "آسیب فیزیکی به داکت یا کانال زیرزمینی کابل‌های مخابراتی",
        "خرابی تجهیزات": "خرابی جعبه‌تقسیم، دکل یا سایر تجهیزات مخابراتی",
    },
    "سازمان آب و فاضلاب": {
        "نشت آب": "نشت یا هدررفت آب لوله‌کشی شهری در معابر یا ساختمان‌ها",
        "شکستگی لوله": "شکستگی یا ترکیدگی لوله آب یا فاضلاب",
    },
    "اداره برق": {
        "تیر برق آسیب‌دیده": "خم‌شدگی، افتادن یا آسیب دیدن تیر چراغ برق و تجهیزات روی آن",
        "قطعی کابل برق": "قطع شدن، افتادن یا آسیب کابل برق فشار ضعیف یا قوی",
    },
    "شرکت گاز": {
        "نشت گاز": "بوی گاز یا نشت گاز طبیعی در ساختمان یا معابر",
        "آسیب خطوط": "آسیب فیزیکی به لوله یا خط انتقال گاز شهری",
    },
}

PRIORITY_LEVELS = ["low", "medium", "high", "critical"]


def _build_organization_reference() -> str:
    """
    ساخت متن مرجع سازمان‌ها، انواع حادثه و توضیح هرکدام برای قرار دادن در پرامپت.
    """
    lines = []
    for org, incident_types in ORGANIZATION_MAP.items():
        lines.append(f'سازمان: "{org}"')
        for incident_type, description in incident_types.items():
            lines.append(f'  - نوع حادثه: "{incident_type}" → {description}')
    return "\n".join(lines)


SYSTEM_PROMPT = f"""
تو یک سیستم هوشمند طبقه‌بندی حوادث شهری هستی.
وظیفه‌ی تو این است که بر اساس اطلاعات تصویر (خروجی مدل Vision) و اطلاعات گزارش‌دهنده،
حادثه را به یکی از سازمان‌های زیر ارجاع دهی.

فقط و فقط باید یکی از سازمان‌ها و انواع حادثه‌ی زیر را انتخاب کنی:

{_build_organization_reference()}

اگر حادثه با توجه به توضیحات بالا با هیچ‌کدام از موارد مطابقت نداشت،
مقدار organization و incident_type را برابر با "نامشخص" قرار بده.

سطح اولویت (priority) باید یکی از این چهار مقدار باشد: low, medium, high, critical
- critical: خطر جانی فوری یا گسترده (مثل انفجار، نشت گاز بزرگ، محل اصابت موشک/بمب)
- high: خطر جدی که نیاز به رسیدگی سریع دارد
- medium: نیاز به رسیدگی دارد ولی فوریت بحرانی نیست
- low: مشکل جزئی و غیر فوری

خروجی را فقط و فقط به‌صورت یک JSON معتبر با ساختار دقیق زیر برگردان
(بدون هیچ توضیح اضافه، بدون Markdown، بدون علامت ```):

{{
  "incident_type": "یکی از انواع حادثه‌ی ذکرشده یا نامشخص",
  "organization": "یکی از نام سازمان‌های ذکرشده یا نامشخص",
  "priority": "low یا medium یا high یا critical",
  "summary": "یک خلاصه‌ی کوتاه و قابل‌فهم به فارسی درباره‌ی حادثه و اقدام لازم"
}}
"""


class LLMService:

    async def analyze(
        self,
        vision_result,
        location,
        event_time,
        reporter_note,
    ):
        user_content = f"""
اطلاعات تحلیل تصویر (Vision):
- توصیف صحنه: {vision_result.get("scene")}
- اشیای مشاهده‌شده: {", ".join(vision_result.get("objects", []))}
- میزان اطمینان تحلیل تصویر: {vision_result.get("confidence")}

اطلاعات گزارش‌دهنده:
- موقعیت مکانی: {location or "ثبت نشده"}
- زمان وقوع: {event_time or "ثبت نشده"}
- توضیحات گزارش‌دهنده: {reporter_note or "ثبت نشده"}

بر اساس اطلاعات بالا، حادثه را طبقه‌بندی کن.
"""

        response = client.chat.completions.create(
            model=settings.LLM_MODEL,
            messages=[
                {"role": "system", "content": SYSTEM_PROMPT},
                {"role": "user", "content": user_content},
            ],
            max_tokens=400,
        )

        raw_content = response.choices[0].message.content.strip()

        if raw_content.startswith("```"):
            raw_content = raw_content.strip("`")
            raw_content = raw_content.replace("json", "", 1).strip()

        try:
            parsed = json.loads(raw_content)
        except json.JSONDecodeError:
            parsed = {
                "incident_type": "نامشخص",
                "organization": "نامشخص",
                "priority": "low",
                "summary": "خطا در تحلیل نتیجه توسط مدل زبانی؛ نیاز به بررسی دستی است.",
            }

        priority = parsed.get("priority", "low")
        if priority not in PRIORITY_LEVELS:
            priority = "low"

        return {
            "incident_type": parsed.get("incident_type", "نامشخص"),
            "organization": parsed.get("organization", "نامشخص"),
            "priority": priority,
            "summary": parsed.get("summary", ""),
            "vision": vision_result,
            "location": location,
            "event_time": event_time,
            "reporter_note": reporter_note,
        }


llm_service = LLMService()