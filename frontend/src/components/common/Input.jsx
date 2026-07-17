import { useState } from 'react';
import { C } from '../../styles/theme';
import { Icon } from './Icon';

export function Field({ label, hint, error, children }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: C.txtSub, marginBottom: 6 }}>
        {label}
      </span>
      {children}
      {error ? (
        <span style={{ display: 'block', fontSize: 12, color: '#dc2626', marginTop: 5 }}>{error}</span>
      ) : hint ? (
        <span style={{ display: 'block', fontSize: 12, color: C.txtMut, marginTop: 5 }}>{hint}</span>
      ) : null}
    </label>
  );
}

export function Input({ error, style, ...rest }) {
  return (
    <input
      className={`tp-input${error ? ' error' : ''}`}
      style={{
        width: '100%',
        padding: '10px 13px',
        borderRadius: 9,
        border: `1px solid ${C.border}`,
        fontSize: 14.5,
        background: C.bg,
        color: C.txt,
        ...style,
      }}
      {...rest}
    />
  );
}

const EYE_BUTTON = {
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  display: 'flex',
  alignItems: 'center',
  padding: 6,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: C.txtMut,
};

export function PasswordField({ label, hint, error, value, onChange, placeholder }) {
  const [show, setShow] = useState(false);
  return (
    <Field label={label} hint={hint} error={error}>
      <div style={{ position: 'relative' }}>
        <Input
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          style={{ paddingRight: 40 }}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? 'Hide password' : 'Show password'}
          style={EYE_BUTTON}
        >
          <Icon name={show ? 'eyeOff' : 'eye'} size={17} />
        </button>
      </div>
    </Field>
  );
}

export function Select({ error, style, children, ...rest }) {
  return (
    <select
      className={`tp-input${error ? ' error' : ''}`}
      style={{
        width: '100%',
        padding: '10px 13px',
        borderRadius: 9,
        border: `1px solid ${C.border}`,
        fontSize: 14.5,
        background: C.bg,
        color: C.txt,
        cursor: 'pointer',
        ...style,
      }}
      {...rest}
    >
      {children}
    </select>
  );
}
