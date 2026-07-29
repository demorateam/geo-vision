from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Form
from app.services.connection_test import test_connection
from app.services.pipeline import pipeline

router = APIRouter()


@router.get("/health")
async def health():
    return {"status": "ok"}


@router.post("/analyze")
async def analyze(
    image: UploadFile = File(...),
    location: str | None = Form(None),
    event_time: str | None = Form(None),
    reporter_note: str | None = Form(None),
):
    return await pipeline.process(
        image=image,
        location=location,
        event_time=event_time,
        reporter_note=reporter_note,
    )
@router.get("/test-openai")
async def test_openai():

    result = test_connection()

    return {
        "status": "success",
        "response": result
    }