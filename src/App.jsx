import AuthProvider from './auth/AuthProvider';
import { useAuth } from './auth/useAuth';
import DashboardPage from './components/dashboard/DashboardPage';
import LandingPage from './components/landing/landingpage';

function Pages() {
  const { status, user } = useAuth();

  if (status === 'loading') return <div className="boot" aria-busy="true" />;
  return user ? <DashboardPage /> : <LandingPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <Pages />
    </AuthProvider>
  );
}