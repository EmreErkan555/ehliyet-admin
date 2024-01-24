import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { NavDropdown, Navbar, Nav } from 'react-bootstrap';
import { USER_ROLES } from '../helper/constants';
import '../App.css'
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

function NavigationBar() {
  const { t } = useTranslation(['navbar']);

  const { isAuthenticated, logout, user } = useAuth();
  const languageOptions = [
    { value: 'tr', label: 'Türkçe' },
    { value: 'en', label: 'English' },
    { value: 'fr', label: 'Français' },
    { value: 'ar', label: 'العربية' },
    { value: 'fa', label: 'فارسی' },
    { value: 'ru', label: 'Русский' },
  ];
  
  const [currentLanguage, setCurrentLanguage] = useState("Türkçe")

  useEffect(() => {
    const storedLanguage = localStorage.getItem('selectedLanguage');
    if (storedLanguage) {
      languageOptions.forEach(item => item.value === storedLanguage && setCurrentLanguage(item.label));
      i18next.changeLanguage(storedLanguage)
    }
  }, []);
  
  if (!isAuthenticated) {
    return null; // Kullanıcı giriş yapmadıysa navigasyonu gösterme
  }

  const onChangeLanguage = (lang) => {
    i18next.changeLanguage(lang.value);
    setCurrentLanguage(lang.label)
    localStorage.setItem('selectedLanguage', lang.value);
  };

  return (
    <Navbar bg="light" expand="lg" style={{ justifyContent: 'space-between', padding: '0 1rem' }}>
      <Helmet>
        <link rel="icon" type="image/png" href={user?.course?.icon} sizes="16x16" />      
      </Helmet>
      <Navbar.Brand className='spin-animation' as={Link} to="/">
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
          <Nav.Link as={Link} to="/">{t('navbar:main-page')}</Nav.Link>
          <Nav.Link as={Link} to="/exam">{t('navbar:exams')}</Nav.Link>
          <Nav.Link as={Link} to="/books">{t('navbar:books')}</Nav.Link>
          <Nav.Link as={Link} to="/lesson">{t('navbar:lessons')}</Nav.Link>
        </Nav>
      </Navbar.Collapse>
      <NavDropdown title={currentLanguage} id="basic-nav-dropdown" style={{ marginLeft: 'auto', marginTop: '10px', marginBottom: '10px', marginRight: '25px' }}>
        {
          languageOptions.map(item => {
            return (
              <NavDropdown.Item onClick={() => onChangeLanguage(item)}>{item.label}</NavDropdown.Item>
            )
          })
        }
      </NavDropdown>
      <NavDropdown title={user?.firstName + ' ' + user?.lastName } id="basic-nav-dropdown" style={{ marginLeft: 'auto', marginTop: '10px', marginBottom: '10px', marginRight: '10px' }}>
        {/* Add dropdown items or links here */}
        {user?.role.id === USER_ROLES.ADMIN && 
          <><NavDropdown.Item as={Link} to="/users">Yönetici Paneli</NavDropdown.Item><NavDropdown.Divider /></>}
        {user?.role.id === USER_ROLES.COURSEADMIN && 
          <><NavDropdown.Item as={Link} to="/users">Yönetici Paneli</NavDropdown.Item><NavDropdown.Divider /></>
        }

        <NavDropdown.Item onClick={logout} style={{color: 'red'}}>Çıkış Yap</NavDropdown.Item>
      </NavDropdown>
      {/* <NavDropdown as={Link} to="/adduser" style={{ marginLeft: 'auto', marginTop: '10px', marginBottom: '10px', marginRight: '10px' }}>{user?.userName}</Nav.Link> */}
      {/* <Button variant="outline-danger" onClick={logout} style={{ marginLeft: 'auto', marginTop: '10px', marginBottom: '10px' }}>Çıkış Yap</Button> */}
    </Navbar>
  );
}

export default NavigationBar;
