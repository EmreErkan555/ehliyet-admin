import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import AddExam from './components/AddExam';
import AddQuestion from './components/AddQuestion';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // AuthProvider ve useAuth eklendi
import PrivateRoute from './helper/PrivateRoute';
import NavigationBar from './components/NavigationBar';
import './App.css';
import AddUser from './components/AddUser';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
            <Route path="/addexam" element={<PrivateRoute> <AddExam /> </PrivateRoute>} />
            <Route path="/addquestion/:examId" element={<PrivateRoute> <AddQuestion /> </PrivateRoute>} />
            <Route path="/adduser" element={<PrivateRoute> <AddUser /> </PrivateRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

function Home() {
  const { isAuthenticated } = useAuth();

  // Eğer kullanıcı oturumu açıksa, doğrudan dashboard sayfasına yönlendirme yapabilirsiniz.
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return <LoginForm />;
}

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return null; // Kullanıcı oturum açık değilse, çıkış yapma butonunu gösterme
  }

  return (
    <button onClick={logout} style={{ marginLeft: 'auto' }}>
      Çıkış Yap
    </button>
  );
}

export default App;
