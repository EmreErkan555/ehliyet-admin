import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaBook, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

function Dashboard() {
  const { t } = useTranslation(['dashboard']);
  document.title = t('headers:main-page');
  return (
    <Container fluid>
      <Row className="mt-4">
        <Col md={4}>
          <Card className="dashboard-card snavlar">
            <Card.Body>
              <Card.Title>
                <FaClipboardList className="dashboard-icon" /> {t('dashboard:exams')}
              </Card.Title>
              <Card.Text>
                {t('dashboard:exams-desc')}
              </Card.Text>
              <Link to="/exam" className="btn btn-primary">
                {t('dashboard:details')}
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card kitaplar">
            <Card.Body>
              <Card.Title>
                <FaBook className="dashboard-icon" /> {t('dashboard:books')}
              </Card.Title>
              <Card.Text>
                {t('dashboard:books-desc')}
              </Card.Text>
              <Link to="/books" className="btn btn-success">
                {t('dashboard:details')}
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="dashboard-card dersler">
            <Card.Body>
              <Card.Title>
                <FaChalkboardTeacher className="dashboard-icon" /> {t('dashboard:lessons')}
              </Card.Title>
              <Card.Text>
                {t('dashboard:lessons-desc')}
              </Card.Text>
              <Link to="/lesson" className="btn btn-warning">
                {t('dashboard:details')}
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
