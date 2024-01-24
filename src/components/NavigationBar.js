import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { NavDropdown, Navbar, Nav } from "react-bootstrap";
import { USER_ROLES } from "../helper/constants";
import "../App.css";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

function NavigationBar() {
  const { t } = useTranslation(["navbar"]);

  const { isAuthenticated, logout, user } = useAuth();

  const [currentLanguage, setCurrentLanguage] = useState("Türkçe");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("selectedLanguage");
    if (storedLanguage) {
      user.languages.forEach(
        (item) =>
          item.value === storedLanguage && setCurrentLanguage(item.label)
      );
      i18next.changeLanguage(storedLanguage);
    }
  }, []);

  const onChangeLanguage = (lang) => {
    i18next.changeLanguage(lang.value);
    setCurrentLanguage(lang.label);
    localStorage.setItem("selectedLanguage", lang.value);
  };

  return (
    <div>
      {isAuthenticated && (
        <Navbar
          bg="light"
          expand="lg"
          style={{ justifyContent: "space-between", padding: "0 1rem" }}
        >
          <Navbar.Brand className="spin-animation" as={Link} to="/">
            <img
              id="icon"
              src={user?.course?.icon}
              className="d-inline-block align-top"
              alt="Car Logo"
              height="50"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} id="main" to="/">
                {t("navbar:main-page")}
              </Nav.Link>
              <Nav.Link as={Link} id="exam" to="/exam">
                {t("navbar:exams")}
              </Nav.Link>
              <Nav.Link as={Link} id="books" to="/books">
                {t("navbar:books")}
              </Nav.Link>
              <Nav.Link as={Link} id="lesson" to="/lesson">
                {t("navbar:lessons")}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <NavDropdown
            title={currentLanguage}
            id="basic-nav-dropdown"
            style={{
              marginLeft: "auto",
              marginTop: "10px",
              marginBottom: "10px",
              marginRight: "25px",
            }}
          >
            {user.languages.map((item) => {
              return (
                <NavDropdown.Item id={item.id} onClick={() => onChangeLanguage(item)}>
                  {item.label}
                </NavDropdown.Item>
              );
            })}
          </NavDropdown>
          <NavDropdown
            title={user?.firstName + " " + user?.lastName}
            id="basic-nav-dropdown"
            style={{
              marginLeft: "auto",
              marginTop: "10px",
              marginBottom: "10px",
              marginRight: "10px",
            }}
          >
            {(user?.role.id === USER_ROLES.ADMIN || user?.role.id === USER_ROLES.COURSEADMIN) && (
              <>
                <NavDropdown.Item as={Link} id="users" to="/users">
                  Yönetici Paneli
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </>
            )}
            <NavDropdown.Item onClick={logout} id="logout" style={{ color: "red" }}>
              Çıkış Yap
            </NavDropdown.Item>
          </NavDropdown>
        </Navbar>
      )}
    </div>
  );
}

export default NavigationBar;
