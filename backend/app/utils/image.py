from pathlib import Path
from uuid import uuid4
from fastapi import UploadFile
import shutil


UPLOAD_DIR = Path("uploads")


def save_image(file: UploadFile) -> str:
    """
    Save uploaded image and return its path.
    """

    UPLOAD_DIR.mkdir(exist_ok=True)

    extension = Path(file.filename).suffix

    filename = f"{uuid4()}{extension}"

    destination = UPLOAD_DIR / filename

    with destination.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return str(destination)