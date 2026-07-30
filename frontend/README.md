
# GeoVision Frontend

React + Vite frontend for the GeoVision project.

## Prerequisites

- Node.js 18+
- npm

## Getting Started

### 1. Navigate to frontend
```bash
cd geo-vision-main/frontend

###2. Install dependencies

bash
npm install

### 3. Run the dev server

bash
npm run dev

- App: `http://localhost:5173`

## Project Structure


frontend/
├── index.html
├── package.json
├── vite.config.js
├── public/
│   ├── favicon.svg
│   └── icons.svg
└── src/
├── App.jsx
├── main.jsx
├── index.css
├── components/
│   ├── ActionButton.jsx
│   ├── AdminStats.jsx
│   ├── AIResultCard.jsx
│   ├── Section.jsx
│   ├── StatCard.jsx
│   ├── TicketDetails.jsx
│   ├── TicketForm.jsx
│   └── TicketList.jsx
├── pages/
│   ├── HomePage.jsx
│   ├── AdminPanel.jsx
│   └── UserPanel.jsx
├── services/
│   ├── aiService.js
│   └── ticketStore.js
└── styles/
└── AdminPanel.css

## Running the Full Project

Both frontend and backend must run simultaneously.

Open two terminals:

**Terminal 1 — Backend:**
bash
cd geo-vision-main/backend
source app/venv/bin/activate
uvicorn app.main:app --reload

**Terminal 2 — Frontend:**
bash
cd geo-vision-main/frontend
npm run dev

## Tech Stack

- React 18
- Vite
- JavaScript (JSX)
