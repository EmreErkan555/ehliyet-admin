import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import Button from 'react-bootstrap/Button';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { USER_ROLES } from '../helper/constants';

function NavigationBar() {
  const { isAuthenticated, logout, user } = useAuth();

  if (!isAuthenticated) {
    return null; // Kullanıcı giriş yapmadıysa navigasyonu gösterme
  }

  return (
    <Navbar bg="light" expand="lg" style={{ justifyContent: 'space-between', padding: '0 1rem' }}>
      <Navbar.Brand as={Link} to="/">
        <img 
          src={user?.course?.icon} 
          className="d-inline-block align-top"
          alt="Car Logo"
          height='50'
        />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/dashboard">Anasayfa</Nav.Link>
          <Nav.Link as={Link} to="/addexam">Sınav Ekle</Nav.Link>
          <Nav.Link as={Link} to="/examlist">Sınav Listesi</Nav.Link>
          <Nav.Link as={Link} to="/adduser">Kullanıcı Ekle</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <NavDropdown title={user?.firstName + ' ' + user?.lastName } id="basic-nav-dropdown" style={{ marginLeft: 'auto', marginTop: '10px', marginBottom: '10px', marginRight: '10px' }}>
        {/* Add dropdown items or links here */}
        {user?.role.id === USER_ROLES.ADMIN && 
          <><NavDropdown.Item as={Link} to="/panel">Yönetici Paneli</NavDropdown.Item><NavDropdown.Divider /></>}
        {user?.role.id === USER_ROLES.COURSEADMIN && 
          <><NavDropdown.Item as={Link} to="/panel">Yönetici Paneli</NavDropdown.Item><NavDropdown.Divider /></>
        }

        <NavDropdown.Item onClick={logout} style={{color: 'red'}}>Çıkış Yap</NavDropdown.Item>
      </NavDropdown>
      {/* <NavDropdown as={Link} to="/adduser" style={{ marginLeft: 'auto', marginTop: '10px', marginBottom: '10px', marginRight: '10px' }}>{user?.userName}</Nav.Link> */}
      {/* <Button variant="outline-danger" onClick={logout} style={{ marginLeft: 'auto', marginTop: '10px', marginBottom: '10px' }}>Çıkış Yap</Button> */}
    </Navbar>
  );
}

export default NavigationBar;
