// Small hand-picked line-icon set (no emoji) so the UI reads as designed,
// not generated. Single stroke weight, currentColor, 20px default.
const PATHS = {
  home: 'M3 10.5 12 3l9 7.5 M5.5 9.5V20a1 1 0 0 0 1 1H9v-6a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v6h2.5a1 1 0 0 0 1-1V9.5',
  clock: 'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7.5V12l3 2',
  scale: 'M4 21V13 M4 21h16 M11 21V8 M18 21V4',
  target:
    'M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 16.5a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9Z M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z',
  grid: 'M4 4h7v7H4V4Z M13 4h7v7h-7V4Z M4 13h7v7H4v-7Z M13 13h7v7h-7v-7Z',
  arrow: 'M4 12h15 M13 6l6 6-6 6',
  logout: 'M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4 M16 17l5-5-5-5 M21 12H9',
};

export function Icon({ name, size = 20, strokeWidth = 1.6, style, ...rest }) {
  const d = PATHS[name];
  if (!d) return null;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'block', flexShrink: 0, ...style }}
      {...rest}
    >
      <path d={d} />
    </svg>
  );
}
