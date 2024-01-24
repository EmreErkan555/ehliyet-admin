import React, { useEffect, useState } from 'react'
import { getPartsbySection } from '../../services/apiService'
import { Card, Container, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function SectionParts() {
  const { t } = useTranslation(['headers']);

  const { sectionId } = useParams();

  const [sectionParts, setSectionParts] = useState([])
  const [hoveredCardIndex, setHoveredCardIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = t('headers:book-parts');
    getSectionParts()
  }, [])

  const getSectionParts = async () => {
    const parts = await getPartsbySection(sectionId);
    setSectionParts(parts)
  }
  return (
    <Container>
      <Row className='mt-3'>
        {sectionParts.map((sectionPart, index) => (
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
              onClick={() => navigate(`/audio/${sectionPart.id}`, { state: { images: sectionPart.images } })}
            >
              <Card.Img variant="top" src={sectionPart.coverImage} alt={sectionPart.name} />
              <Card.Body>
                <Card.Title className="text-center">{sectionPart.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  )
}
