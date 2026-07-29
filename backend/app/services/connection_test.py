from app.clients.openai_client import client
from app.core.config import settings


def test_connection():

    response = client.chat.completions.create(
        model=settings.LLM_MODEL,
        messages=[
            {
                "role": "user",
                "content": "سلام، فقط کلمه OK را برگردان."
            }
        ],
        max_tokens=10
    )

    return response.choices[0].message.content