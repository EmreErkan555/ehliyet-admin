import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';

function NavigationBar() {
  const { isAuthenticated, logout } = useAuth();

  if (!isAuthenticated) {
    return null; // Kullanıcı giriş yapmadıysa navigasyonu gösterme
  }

  return (
    <Navbar bg="light" expand="lg" style={{ justifyContent: 'space-between', padding: '0 1rem' }}>
      <Navbar.Brand as={Link} to="/">Ehliyet</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
            <Nav.Link as={Link} to="/dashboard">Anasayfa</Nav.Link>
            <Nav.Link as={Link} to="/addexam">Sınav Ekle</Nav.Link>
            <Nav.Link as={Link} to="/adduser">Kullanıcı Ekle</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <Button variant="outline-danger" onClick={logout} style={{ marginLeft: 'auto', marginTop: '10px', marginBottom: '10px' }}>Çıkış Yap</Button>
    </Navbar>
  );
}

export default NavigationBar;
