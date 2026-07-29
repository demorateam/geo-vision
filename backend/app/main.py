from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from app.api.routes import router

app = FastAPI(
    title="AI Incident Classification API",
    description="MVP Backend",
    version="1.0.0"
)
# --- تنظیمات CORS ---
origins = [
    "http://localhost:5173/user",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],   # باید شامل POST و OPTIONS باشه
    allow_headers=["*"],
)

# API Routes
app.include_router(router)

# Static Files (HTML, CSS, JS)
app.mount("/static", StaticFiles(directory="app/static"), name="static")


@app.get("/", include_in_schema=False)
async def home():
    return FileResponse("app/static/index.html")