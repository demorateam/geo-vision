# GeoVision Backend

FastAPI backend service for the GeoVision project.

## Prerequisites

- Python 3.10+

## Getting Started

### 1. Clone and navigate
```bash
git clone https://github.com/<your-username>/geo-vision.git
cd geo-vision/backend

### 2. Create and activate virtual environment

bash
python3 -m venv app/venv
source app/venv/bin/activate  # Windows: app\venv\Scripts\Activate.ps1

### 3. Install dependencies

bash
pip install -r requirements.txt

### 4. Configure environment variables

bash
cp .env.example .env
# Edit .env with your actual values

### 5. Run the server

> ⚠️ Always run from the `backend` directory so Python resolves the `app` package correctly.

bash
uvicorn app.main:app --reload

- API: `http://127.0.0.1:8000`
- Swagger docs: `http://127.0.0.1:8000/docs`

## Project Structure


backend/
├── .env.example
├── requirements.txt
└── app/
├── main.py
├── api/
├── clients/
├── core/
├── schemas/
├── services/
├── static/
└── utils/


