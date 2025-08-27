import { createRoot } from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import './index.css'
import Cadastro from './pages/cadastro/Cadastro.jsx'
import CollectionPoints from './pages/collection-points/CollectionPoints.jsx'
import CollectionStatus from './pages/collection-status/CollectionStatus.jsx'
import Login from './pages/login/Login.jsx'

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/collection-status' replace />} />

        <Route path='collection-status' element={
          <ProtectedRoute>
            <CollectionStatus />
          </ProtectedRoute>
        } />

        <Route path='collection-points' element={
          <ProtectedRoute>
            <CollectionPoints />
          </ProtectedRoute>
        } />

        <Route path='login' element={<Login />} />
        <Route path='register' element={<Cadastro />} />
        <Route path='*' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
)
