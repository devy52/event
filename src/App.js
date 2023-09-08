import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginForm from './pages/login_register';
import AdminPage from './pages/admin_edit';
import HomeUser from './pages/home_user_login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/user" element={<HomeUser />} />
        {/* Use the custom AdminRoute component for the admin route */}
        <Route path="/admin" element={<AdminPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
