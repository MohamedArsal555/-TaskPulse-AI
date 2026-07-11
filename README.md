# TaskPulse AI – AI/ML Microservice

Python/FastAPI microservice for **TaskPulse AI** (Nexora Business Solutions Pvt. Ltd.).
Handles: task delay prediction, workload scoring, and sprint risk prediction.

## Status
Initial version uses **rule-based weighted formulas**, since no historical
training data exists yet. Once the Java backend has been live long enough to
collect real task/sprint history, these formulas will be replaced with trained
ML models (e.g. XGBoost / Logistic Regression) — the API contract (request/response
shape) will stay the same, so no changes needed on the consuming side.

## Run locally

**Backend (FastAPI, port 8001):**
```bash
cd backend
python -m venv .venv          # skip if .venv already exists
.venv\Scripts\activate        # Windows (source .venv/bin/activate on macOS/Linux)
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8001
```
Docs available at `http://localhost:8001/docs`

**Frontend (React + Vite console, port 5173):**
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173`. Or run both together from `frontend/`: `npm run dev:all`
(spawns the backend from its venv's `uvicorn` — activate the venv first, or edit
`dev:backend` in `frontend/package.json` to call `../backend/.venv/Scripts/uvicorn` directly).

## Project structure
```
ai-service/
  backend/                  # FastAPI microservice
    .venv/                   # Python virtual environment (not committed)
    app/
      main.py                 # FastAPI app + router registration + CORS
      routers/
        delay.py               # /api/v1/predict-delay
        workload.py            # /api/v1/workload-score
        sprint_risk.py          # /api/v1/sprint-risk
      models/
        schemas.py             # Pydantic request/response models
      services/
        scoring_logic.py        # Core scoring/prediction formulas
    requirements.txt
  frontend/                 # TaskPulse AI Console (React + Vite)
    src/
      app.jsx                # Root shell: sidebar nav + view switching
      main.jsx               # Vite/React entry point
      pages/                 # dashboard/, delay/, workload/, sprint/
      components/
        layout/               # Sidebar, TopBar, MainLayout
        common/               # Card, Button, Input, Badge, ScoreGauge, ResultPanel...
      services/               # apiClient.js + one service per endpoint
      hooks/                  # useApiAction (submit state), useApiHealth (status ping)
      config/                 # apiConfig.js (VITE_API_BASE_URL)
      styles/                 # theme.js (design tokens) + GlobalStyles.jsx
      utils/                  # constants, formatters, client-side validators
  README.md
```

---

## 1. Task Delay Prediction — `POST /api/v1/predict-delay`

**Formula:**
```
delay_risk = 0.35 * progress_ratio + 0.30 * time_pressure + 0.20 * blocker_factor + 0.15 * employee_past_delay_rate
```
- `progress_ratio` = hours_logged / estimated_hours
- `time_pressure` = 1 - (days_remaining / total_days)
- `blocker_factor` = blocker_count normalized (capped at 5)

Score is 0–1, bucketed into Low (<0.4) / Medium (<0.7) / High (>=0.7).

**Sample request**
```json
{
  "task_id": "T101",
  "estimated_hours": 20,
  "hours_logged": 14,
  "days_remaining": 2,
  "total_days": 10,
  "blocker_count": 1,
  "employee_past_delay_rate": 0.3
}
```
**Sample response**
```json
{
  "task_id": "T101",
  "delay_risk_score": 0.57,
  "risk_level": "Medium"
}
```

---

## 2. Workload Scoring — `POST /api/v1/workload-score`

**Formula:**
```
workload_score = (active_task_hours * priority_weight) / available_capacity_hours
```
Bucketed: Underloaded (<0.6) / Balanced (0.6–1.0) / Overloaded (>1.0)

**Sample request**
```json
{
  "employee_id": "E203",
  "active_task_hours": 32,
  "priority_weight": 1.2,
  "available_capacity_hours": 40
}
```
**Sample response**
```json
{
  "employee_id": "E203",
  "workload_score": 0.96,
  "workload_level": "Balanced"
}
```

---

## 3. Sprint Risk Prediction — `POST /api/v1/sprint-risk`

**Formula:**
```
sprint_risk = 0.5 * avg_task_delay_risk + 0.2 * blocker_density + 0.3 * velocity_gap
```
- `velocity_gap` = 1 - (completed_story_points / planned_story_points)

Bucketed: Healthy (<0.4) / At Risk (<0.7) / Critical (>=0.7)

**Sample request**
```json
{
  "sprint_id": "S12",
  "avg_task_delay_risk": 0.55,
  "blocker_density": 2,
  "planned_story_points": 40,
  "completed_story_points": 25
}
```
**Sample response**
```json
{
  "sprint_id": "S12",
  "sprint_risk_score": 0.47,
  "risk_level": "At Risk"
}
```

---

## Required Dataset Fields (for future ML training)

| Field | Description |
|---|---|
| task_id | Unique task identifier |
| employee_id | Assigned employee |
| sprint_id | Parent sprint |
| estimated_hours | Planned effort |
| actual_hours_logged | Actual effort logged |
| priority | Low / Medium / High |
| status | Open / In Progress / Blocked / Done |
| deadline | Task due date |
| days_remaining | Days left till deadline |
| blocker_count | No. of blockers raised on the task |
| employee_past_delay_rate | Historical delay ratio for the employee |
| story_points | Task/sprint sizing metric |

## Next Steps
- Connect to Java backend via REST (Java calls these endpoints with live data)
- Start logging real prediction outcomes vs actual outcomes to build a training dataset
- Once ~3 sprints of data are collected, retrain formulas into ML models
