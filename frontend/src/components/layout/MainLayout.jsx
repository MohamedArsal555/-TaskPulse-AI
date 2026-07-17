import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';
import { C } from '../../styles/theme';

export function MainLayout({ view, setView, onLogout, role, children }) {
  return (
    <div style={{ minHeight: '100vh', background: C.bg }}>
      <Sidebar view={view} setView={setView} onLogout={onLogout} role={role} />
      <div style={{ marginLeft: 240, display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopBar view={view} role={role} setView={setView} />
        <main className="tp-page" key={view} style={{ flex: 1, padding: '28px 32px 48px' }}>
          {children}
        </main>
      </div>
    </div>
  );
}
