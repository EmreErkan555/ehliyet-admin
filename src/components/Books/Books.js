import React, { useEffect, useState } from 'react'
import { getSections } from '../../services/apiService'
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Books() {
  const { t } = useTranslation(['headers']);
  const [sections, setSections] = useState([])
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = t('headers:books');
    getBooks()
  }, [])

  const getBooks = async () => {
    const books = await getSections();
    setSections(books)
  }
  return (
    <Container>
      <Row className='mt-3'>
        {sections.map((book, index) => (
          <Col 
            key={index} 
            md={3} 
            className="mb-4"
            onMouseEnter={() => setHoveredCardIndex(index)}
            onMouseLeave={() => setHoveredCardIndex(null)}
          >
            <Card style={{ 
                transform: hoveredCardIndex === index ? 'scale(1.05)' : 'scale(1)',
                boxShadow: hoveredCardIndex === index ? '0 0 10px rgba(0, 0, 0, 0.5)' : '0 5px 5px rgba(0, 0, 0, 0.5)',
                backgroundColor: 'white',
                borderRadius: 5,
                alignSelf: 'center',
                borderBottomColor: "#03045e",
                borderBottomWidth: 5
              }}
              onClick={() => navigate(`/bookparts/${book.id}`)}
            >
              <Card.Img variant="top" src={book.image} alt={book.name} />
              <Card.Body>
                <Card.Title className="text-center">{book.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
