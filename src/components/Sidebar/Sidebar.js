import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Col } from "react-bootstrap";
import { FaBook, FaCar } from "react-icons/fa";
import { MdHotelClass } from "react-icons/md";
import { PiExamFill } from "react-icons/pi";
import { SiGoogleclassroom } from "react-icons/si";
import { useAuth } from "../../contexts/AuthContext";
import { USER_ROLES } from "../../helper/constants";

const Sidebar = () => {
  const { user } = useAuth();
  return (
    <Col className="bg-light sidebar">
      <Container
        fluid
        className="p-0"
        style={{ flex: 1, height: "100vh", marginLeft: 15 }}
      >
        <Navbar expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="flex-column">
              <Nav.Link
                as={Link}
                to="/users"
                style={{ fontSize: 20, color: "black" }}
              >
                <FaBook /> Kullanıcılar
              </Nav.Link>
              {user?.role.id === USER_ROLES.ADMIN && (
                <>
                  <Nav.Link
                    as={Link}
                    to="/roles"
                    style={{ fontSize: 20, color: "black" }}
                  >
                    <MdHotelClass /> Roller
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/courses"
                    style={{ fontSize: 20, color: "black" }}
                  >
                    <FaCar /> Kurslar
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/exams"
                    style={{ fontSize: 20, color: "black" }}
                  >
                    <PiExamFill /> Sınavlar
                  </Nav.Link>
                  <Nav.Link
                    as={Link}
                    to="/lessons"
                    style={{ fontSize: 20, color: "black" }}
                  >
                    <SiGoogleclassroom /> Dersler
                  </Nav.Link>
                </>
              )}
              {/* Diğer sayfa linkleri */}
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </Col>
  );
};

export default Sidebar;
