import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBook, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Dashboard() {
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={4}>
          <Card className="dashboard-card snavlar">
            <Card.Body>
              <Card.Title>
                <FaClipboardList className="dashboard-icon" /> Sınavlar
              </Card.Title>
              <Card.Text>
                Bu alanda sınavlarınıza ait bilgileri görebilirsiniz.
              </Card.Text>
              <Link to="/sinavlar" className="btn btn-primary">
                Detaylar
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card kitaplar">
            <Card.Body>
              <Card.Title>
                <FaBook className="dashboard-icon" /> Kitaplar
              </Card.Title>
              <Card.Text>
                Bu alanda kitaplarınıza ait bilgileri görebilirsiniz.
              </Card.Text>
              <Link to="/kitaplar" className="btn btn-success">
                Detaylar
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card dersler">
            <Card.Body>
              <Card.Title>
                <FaChalkboardTeacher className="dashboard-icon" /> Dersler
              </Card.Title>
              <Card.Text>
                Bu alanda derslerinize ait bilgileri görebilirsiniz.
              </Card.Text>
              <Link to="/dersler" className="btn btn-warning">
                Detaylar
              </Link>
            </Card.Body>
          </Card>
        </Col>
        {/* İsterseniz buraya istediğiniz kadar başka alan ekleyebilirsiniz */}
      </Row>
    </Container>
  );
}

export default Dashboard;
