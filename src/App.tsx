import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { AboutPage } from './pages/AboutPage';
import { ChildDetailPage } from './pages/ChildDetailPage';
import { ChildrenPage } from './pages/ChildrenPage';
import { DashboardPage } from './pages/DashboardPage';
import { DrugsPage } from './pages/DrugsPage';
import { FormulasPage } from './pages/FormulasPage';
import { GrowthPage } from './pages/GrowthPage';
import { GuidelinesPage } from './pages/GuidelinesPage';
import { SettingsPage } from './pages/SettingsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<DashboardPage />} />
          <Route path="anak" element={<ChildrenPage />} />
          <Route path="anak/:id" element={<ChildDetailPage />} />
          <Route path="growth" element={<GrowthPage />} />
          <Route path="obat" element={<DrugsPage />} />
          <Route path="rumus" element={<FormulasPage />} />
          <Route path="guideline" element={<GuidelinesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
