import { useEffect, useState } from 'react';
import { GlobalStyles } from './styles/GlobalStyles';
import { MainLayout } from './components/layout/MainLayout';
import { LoginPage } from './pages/login/LoginPage';
import { Dashboard } from './pages/dashboard/Dashboard';
import { DelayPredictionPage } from './pages/delay/DelayPredictionPage';
import { WorkloadScorePage } from './pages/workload/WorkloadScorePage';
import { SprintRiskPage } from './pages/sprint/SprintRiskPage';
import { ProfilePage } from './pages/profile/ProfilePage';
import { useAuth } from './hooks/useAuth';
import { canAccessNav } from './utils/roles';

const PAGES = {
  dashboard: Dashboard,
  delay: DelayPredictionPage,
  workload: WorkloadScorePage,
  sprint: SprintRiskPage,
  profile: ProfilePage,
};

// Every role has a profile, so it sits outside the ROLES permissions matrix
// (unlike dashboard/delay/workload/sprint) and is exempt from the access check below.
const UNGATED_VIEWS = ['dashboard', 'profile'];

export function App() {
  const { authed, role, login, register, updateProfile, logout } = useAuth();
  const [view, setView] = useState('dashboard');
  const Page = PAGES[view] || Dashboard;

  // If a role loses access to the current view (or a different role signs
  // in after logout), fall back to the dashboard rather than a blank page.
  useEffect(() => {
    if (role && !UNGATED_VIEWS.includes(view) && !canAccessNav(role, view)) setView('dashboard');
  }, [role, view]);

  const handleLogout = () => {
    logout();
    setView('dashboard');
  };

  return (
    <>
      <GlobalStyles />
      {authed ? (
        <MainLayout view={view} setView={setView} onLogout={handleLogout} role={role}>
          <Page setView={setView} role={role} onUpdateProfile={updateProfile} />
        </MainLayout>
      ) : (
        <LoginPage onLogin={login} onRegister={register} />
      )}
    </>
  );
}
