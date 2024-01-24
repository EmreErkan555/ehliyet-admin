import React, { useState, useEffect } from 'react';
import AudioPlayer from 'react-audio-player';
import { getSectionPartAudio } from '../../services/apiService';
import { useParams, useLocation } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export default function Audio() {
  const { sectionPartId } = useParams();
  const { t } = useTranslation(['book']);

  const location = useLocation();
  const { images } = location.state;

  const [sesDosyasiYolu, setSesDosyasiYolu] = useState('');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    document.title = t('headers:audio');
    fetchAudio()
  }, []);

  const fetchAudio = async () => {
    const url = await getSectionPartAudio(sectionPartId)
    setSesDosyasiYolu(url)
  }

  const handleImageChange = (direction) => {
    if (direction === 'next') {
      setCurrentImageIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
    } else if (direction === 'prev') {
      setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
    }
  };

  return (
    <Container className="text-center mt-5">
      <Row>
        <Col md={12}>
          <img
            src={images[currentImageIndex]}
            alt={`Resim ${currentImageIndex + 1}`}
            className="img-fluid mb-3"
            style={{ maxWidth: '100%', width: 'auto', maxHeight: '75vh', objectFit: 'contain' }}
          />
        </Col>
      </Row>
      {images.length > 1 && <Row className='mb-3'>
        <Col md={6} className="d-flex justify-content-end">
          <Button disabled={currentImageIndex === 0 ? true : false} variant="outline-primary" onClick={() => handleImageChange('prev')} className="align-self-center">
            {t('book:prev')}
          </Button>
        </Col>
        <Col md={6} className="d-flex justify-content-start">
          <Button variant="outline-primary" onClick={() => handleImageChange('next')} className="align-self-center">
            {currentImageIndex === images.length - 1 ? t('book:toFirst') : t('book:next')}
          </Button>
        </Col>
      </Row>}
      <Row>
        <Col md={12}>
          <AudioPlayer
            src={sesDosyasiYolu}
            autoPlay={false}
            controls
            className="mx-auto"
          />
        </Col>
      </Row>
    </Container>
  );
};