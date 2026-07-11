import { C } from '../../styles/theme';

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
