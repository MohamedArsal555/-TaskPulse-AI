import { C } from '../../styles/theme';
import { Icon } from './Icon';

// Shown on predictor pages when the signed-in role can view but not submit,
// per the role's entry in utils/roles.js.
export function ReadOnlyNotice({ message }) {
  return (
    <div
      style={{
        gridColumn: '1 / -1',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '9px 13px',
        borderRadius: 9,
        background: C.p50,
        border: `1px solid ${C.p200}`,
        color: C.p700,
        fontSize: 12.5,
        fontWeight: 500,
      }}
    >
      <Icon name="eye" size={14} style={{ flexShrink: 0 }} />
      {message}
    </div>
  );
}
