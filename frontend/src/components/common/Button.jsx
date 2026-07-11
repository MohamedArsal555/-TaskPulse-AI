import { C } from '../../styles/theme';

const VARIANTS = {
  primary: {
    className: 'tp-btn-pri',
    style: { background: C.gradBtn, color: '#fff', border: 'none' },
  },
  ghost: {
    className: 'tp-btn-ghost',
    style: { background: 'transparent', color: C.txtSub, border: `1px solid ${C.border}` },
  },
  outline: {
    className: 'tp-btn-ghost',
    style: { background: '#fff', color: C.p700, border: `1px solid ${C.p200}` },
  },
};

export function Button({ children, variant = 'primary', loading = false, disabled, style, ...rest }) {
  const v = VARIANTS[variant] || VARIANTS.primary;
  return (
    <button
      className={v.className}
      disabled={disabled || loading}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        padding: '11px 20px',
        borderRadius: 10,
        fontSize: 14.5,
        fontWeight: 600,
        cursor: 'pointer',
        ...v.style,
        ...style,
      }}
      {...rest}
    >
      {loading && (
        <span
          className="tp-spin"
          style={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            border: '2px solid currentColor',
            borderTopColor: 'transparent',
            opacity: 0.85,
          }}
        />
      )}
      {children}
    </button>
  );
}
