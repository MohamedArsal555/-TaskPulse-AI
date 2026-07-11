// Lightweight client-side mirrors of the FastAPI Pydantic field constraints,
// so the UI can surface errors before hitting the network.
export function required(value) {
  return value === '' || value === null || value === undefined ? 'Required' : null;
}

export function gt(value, min, label = 'Value') {
  const n = Number(value);
  if (Number.isNaN(n)) return 'Must be a number';
  return n > min ? null : `${label} must be greater than ${min}`;
}

export function gte(value, min, label = 'Value') {
  const n = Number(value);
  if (Number.isNaN(n)) return 'Must be a number';
  return n >= min ? null : `${label} must be ≥ ${min}`;
}

export function range(value, min, max, label = 'Value') {
  const n = Number(value);
  if (Number.isNaN(n)) return 'Must be a number';
  if (n < min || n > max) return `${label} must be between ${min} and ${max}`;
  return null;
}

export function runValidators(values, rules) {
  const errors = {};
  for (const key of Object.keys(rules)) {
    for (const rule of rules[key]) {
      const msg = rule(values[key]);
      if (msg) {
        errors[key] = msg;
        break;
      }
    }
  }
  return errors;
}
