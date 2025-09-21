import { createRoot } from 'react-dom/client';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import App from './App.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import './index.css';

import { Theme } from '@radix-ui/themes';
import Cadastro from './pages/cadastro/Cadastro.jsx';
import CollectionPoints from './pages/collection-points/CollectionPoints.jsx';
import CollectionStatus from './pages/collection-status/CollectionStatus.jsx';
import Login from './pages/login/Login.jsx';
import ProfilePage from './pages/profile/Profile.jsx'; 
import ViewProfile from './pages/profile/ViewProfile.jsx'; 
import Pev from './pages/pev/Pev.jsx';

createRoot(document.getElementById('root')).render(
  <Theme
    accentColor="mint"
    grayColor="gray"
    panelBackground="solid"
    scaling="100%"
    radius="large"
  >
    <BrowserRouter>
      <Routes>
        {/* Páginas públicas */}
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Cadastro />} />
        <Route path="/pev" element={ <Pev />  } />
         

        {/* Páginas protegidas */}
        <Route
          path="/collection-status"
          element={
            <ProtectedRoute>
              <CollectionStatus />
            </ProtectedRoute>
          }
        />
        <Route
          path="/collection-points"
          element={
            <ProtectedRoute>
              <CollectionPoints />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-profile"
          element={
            <ProtectedRoute>
              <ViewProfile />
            </ProtectedRoute>
          }
        />
    

        {/* Redirecionamento padrão */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  </Theme>
);
