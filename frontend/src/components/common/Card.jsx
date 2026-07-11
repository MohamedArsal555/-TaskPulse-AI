import { C } from '../../styles/theme';

export function Card({ children, style, className = '', hover = true, padding = 24, ...rest }) {
  return (
    <div
      className={`${hover ? 'tp-card' : ''} ${className}`.trim()}
      style={{
        background: C.surface,
        border: `1px solid ${C.border}`,
        borderRadius: 10,
        padding,
        boxShadow: '0 1px 2px rgba(36,33,25,0.04)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
