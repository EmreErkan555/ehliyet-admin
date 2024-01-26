import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, ListGroup } from 'react-bootstrap';
import { FaBook, FaChalkboardTeacher, FaClipboardList } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getLatestExams, getSections } from '../../services/apiService';
import { useNavigate } from 'react-router-dom';
import bgIcon from '../../theme/assets/bg-icon.png'

function Dashboard() {
  const { t } = useTranslation(['dashboard']);
  const [exams, setExams] = useState([]);
  const [sections, setSections] = useState([])
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = t('headers:main-page');
    fetchLatestExams()
    fetchBooks()
  }, [])

  const fetchLatestExams = async () => {
    const exams = await getLatestExams();
    setExams(exams)
  }

  const fetchBooks = async () => {
    const books = await getSections();
    setSections(books)
  }

  return (
    <Container fluid style={{ 
      backgroundImage: `url(${bgIcon})`,
      backgroundPosition: 'center',
      backgroundSize: '30%',
      backgroundRepeat: 'no-repeat',
    }}>
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
      <Row className="mt-4">
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <Card style={{ margin: 15, width: '70%', alignSelf: 'center' }} className="h-100">
            <Card.Title className='text-center mt-3'>
              <FaChalkboardTeacher className="dashboard-icon" /> {t('dashboard:latest-exams')}
            </Card.Title>
            {exams.map((exam, index) => (
              <Link key={exam.id} to={`/questions/${exam.id}`}>
                <ListGroup className='text-center'>
                  <ListGroup.Item style={{ fontSize: 18, backgroundColor: index % 2 === 1 ? '#f0f0f0' : "white" }} className="flex-grow-1">
                    {/* <Card.Title> */}
                      {exam.name}
                    {/* </Card.Title> */}
                  </ListGroup.Item>
                </ListGroup>
              </Link>
            ))}
          </Card>
        </Col>
        <Col md={6} className="d-flex justify-content-center align-items-center">
          <Card style={{ margin: 15, width: '70%', alignSelf: 'center' }} className="h-100">
            <Card.Title className='text-center mt-3'>
              <FaBook className="dashboard-icon" /> {t('dashboard:latest-books')}
            </Card.Title>
            <Row className='mt-3 justify-content-center'>
              {sections.map((book, index) => (
                <Col 
                  key={index} 
                  md={3} 
                  className="mb-4"
                  onMouseEnter={() => setHoveredCardIndex(index)}
                  onMouseLeave={() => setHoveredCardIndex(null)}
                >
                  <Card 
                    className="mx-0"
                    style={{ 
                      transform: hoveredCardIndex === index ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: hoveredCardIndex === index ? '0 0 10px rgba(0, 0, 0, 0.5)' : '0 5px 5px rgba(0, 0, 0, 0.5)',
                      backgroundColor: 'white',
                      borderRadius: 5,
                      alignSelf: 'center',
                      borderBottomColor: "#03045e",
                      borderBottomWidth: 5,
                    }}
                    onClick={() => navigate(`/bookparts/${book.id}`)}
                  >
                    <Card.Img variant="top" src={book.image} alt={book.name} />
                    <Card.Body className="flex-grow-1">
                      <Card.Title className="text-center">{book.name}</Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
