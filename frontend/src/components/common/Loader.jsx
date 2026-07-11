import { C } from '../../styles/theme';

export function Loader({ size = 18, color = C.p500 }) {
  return (
    <span
      className="tp-spin"
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        border: `2.5px solid ${color}33`,
        borderTopColor: color,
      }}
    />
  );
}
