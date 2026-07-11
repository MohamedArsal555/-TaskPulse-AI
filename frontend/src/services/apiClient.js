import { API_BASE_URL } from '../config/apiConfig';

export class ApiError extends Error {
  constructor(message, status, details) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.details = details;
  }
}

export async function postJson(path, body) {
  let res;
  try {
    res = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
  } catch {
    throw new ApiError('Could not reach the TaskPulse AI service. Is the backend running on port 8001?', 0);
  }

  const payload = await res.json().catch(() => null);

  if (!res.ok) {
    const detail = Array.isArray(payload?.detail)
      ? payload.detail.map((d) => d.msg).join('; ')
      : payload?.detail || `Request failed with status ${res.status}`;
    throw new ApiError(detail, res.status, payload);
  }

  return payload;
}

export async function getJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new ApiError(`Request failed with status ${res.status}`, res.status);
  return res.json();
}
