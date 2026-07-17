// Client-side log of predictions actually run through the three tools, so the
// dashboard KPIs reflect real usage instead of placeholder numbers. There is
// no history endpoint on the backend, so this lives in localStorage.
const KEY = 'tp_prediction_history';
const MAX_ENTRIES = 40;

export function getHistory() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// entry: { type: 'delay'|'workload'|'sprint', subject, score (0..1), level }
export function addHistoryEntry(entry) {
  const history = getHistory();
  history.push({ ...entry, at: Date.now() });
  const trimmed = history.slice(-MAX_ENTRIES);
  try {
    localStorage.setItem(KEY, JSON.stringify(trimmed));
  } catch {
    // storage unavailable (private mode / quota) — KPIs just stay at zero
  }
  return trimmed;
}
