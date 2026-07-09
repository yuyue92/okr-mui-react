import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import MainLayout from './layouts/MainLayout.jsx'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import MyOkrPage from './pages/MyOkrPage.jsx'
import DepartmentOkrPage from './pages/DepartmentOkrPage.jsx'
import OkrDetailPage from './pages/OkrDetailPage.jsx'
import CheckInPage from './pages/CheckInPage.jsx'
import CyclesPage from './pages/CyclesPage.jsx'
import OrgPage from './pages/OrgPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import NotFoundPage from './pages/NotFoundPage.jsx'
import { useOkr } from './context/OkrContext.jsx'

function PrivateRoute({ children }) {
  const { currentUser } = useOkr()
  if (!currentUser) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <MainLayout />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="my-okr" element={<MyOkrPage />} />
          <Route path="department-okr" element={<DepartmentOkrPage />} />
          <Route path="okr/:objectiveId" element={<OkrDetailPage />} />
          <Route path="check-in" element={<CheckInPage />} />
          <Route path="cycles" element={<CyclesPage />} />
          <Route path="org" element={<OrgPage />} />
          <Route path="reports" element={<ReportsPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
