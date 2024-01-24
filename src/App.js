import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard/Dashboard';
import AddQuestion from './components/AdminPanel/AddQuestion';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // AuthProvider ve useAuth eklendi
import PrivateRoute from './helper/PrivateRoute';
import NavigationBar from './components/NavigationBar';
import './App.css';
import Lessons from './components/AdminPanel/Lessons';
import Courses from './components/AdminPanel/Courses';
import Users from './components/AdminPanel/Users';
import Exams from './components/AdminPanel/Exams';
import Sections from './components/AdminPanel/Sections';
import AddSectionPart from './components/AdminPanel/AddSectionPart';
import Audio from './components/Books/Audio';
import Books from './components/Books/Books';
import SectionParts from './components/Books/SectionPart';
import Lesson from './components/Lessons/Lesson';
import Exam from './components/Exams/Exams'
import Questions from './components/Questions/Questions';
import AdminRoute from './helper/AdminRoute';
import UsersRoute from './helper/UsersRoute';
import Languages from './components/AdminPanel/Languages';

function App() {

  return (
    <AuthProvider>
      <Router>
        <div>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<PrivateRoute> <Dashboard /> </PrivateRoute>} />
            <Route path="/addquestion/:examId" element={<AdminRoute> <AddQuestion /> </AdminRoute>} />
            <Route path="/lessons" element={<AdminRoute> <Lessons /> </AdminRoute>} />
            <Route path="/courses" element={<AdminRoute> <Courses /> </AdminRoute>} />
            <Route path="/users" element={<UsersRoute> <Users /> </UsersRoute>} />
            <Route path="/exams" element={<AdminRoute> <Exams /> </AdminRoute>} />
            <Route path="/sections" element={<AdminRoute> <Sections /> </AdminRoute>} />
            <Route path="/languages" element={<AdminRoute> <Languages /> </AdminRoute>} />
            <Route path="/addsectionpart/:sectionId" element={<AdminRoute> <AddSectionPart /> </AdminRoute>} />
            <Route path="/audio/:sectionPartId" element={<PrivateRoute> <Audio /> </PrivateRoute>} />
            <Route path="/books" element={<PrivateRoute> <Books /> </PrivateRoute>} />
            <Route path="/bookparts/:sectionId" element={<PrivateRoute> <SectionParts /> </PrivateRoute>} />
            <Route path="/books" element={<PrivateRoute> <Books /> </PrivateRoute>} />
            <Route path="/lesson" element={<PrivateRoute> <Lesson /> </PrivateRoute>} />
            <Route path="/exam" element={<PrivateRoute> <Exam /> </PrivateRoute>} />
            <Route path="/questions/:examId" element={<PrivateRoute> <Questions /> </PrivateRoute>} />
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

export default App;
