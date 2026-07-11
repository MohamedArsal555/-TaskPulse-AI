import { useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/login/LoginPage';
import { Dashboard } from './pages/dashboard/Dashboard';
import { DelayPredictionPage } from './pages/delay/DelayPredictionPage';
import { WorkloadScorePage } from './pages/workload/WorkloadScorePage';
import { SprintRiskPage } from './pages/sprint/SprintRiskPage';
import { useAuth } from './hooks/useAuth';

const PAGES = {
  dashboard: Dashboard,
  delay: DelayPredictionPage,
  workload: WorkloadScorePage,
  sprint: SprintRiskPage,
};

export function App() {
  const { authed, login, logout } = useAuth();
  const [view, setView] = useState('dashboard');
  const Page = PAGES[view] || Dashboard;

  const handleLogout = () => {
    logout();
    setView('dashboard');
  };

  return (
    <>
      <GlobalStyles />
      {authed ? (
        <MainLayout view={view} setView={setView} onLogout={handleLogout}>
          <Page setView={setView} />
        </MainLayout>
      ) : (
        <LoginPage onLogin={login} />
      )}
    </>
  );
}
