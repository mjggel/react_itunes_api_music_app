import React, { useEffect } from 'react';
import './App.css';
import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import AlbumPage from './pages/AlbumPage';
import FavoritesPage from './pages/FavoritesPage';

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user') && location.pathname !== '/register') {
      navigate('/register');
    }
  }, [location, navigate]);

  const shouldRenderHeader = !['/login', '/register'].includes(
    location.pathname
  );

  return (
    <div className='App'>
      {shouldRenderHeader && <Header />}
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile' element={<ProfilePage />} />
        <Route path='/album/:id' element={<AlbumPage />} />
        <Route path='/favorites/' element={<FavoritesPage />} />
      </Routes>
    </div>
  );
}

export default App;
