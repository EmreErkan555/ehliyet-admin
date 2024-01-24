import React, { useState, useEffect } from 'react';
import { Container, Card } from 'react-bootstrap';
import { getLessons } from '../../services/apiService';
import { useTranslation } from 'react-i18next';

const Lesson = () => {
  const { t } = useTranslation(['headers']);

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    document.title = t('headers:lessons');
    fetchExams()
  }, [])

  const fetchExams = async () => {
    const response = await getLessons();
    setVideos(response)
  }

  return (
    <Container className="mt-5">
      {videos.map((video, index) => (
        <Card key={index} className="mb-4">
          <iframe
            title={video.name}
            width="100%"
            height="600"
            src={video.link}
            allowFullScreen
          ></iframe>
          <Card.Body>
            <Card.Title>{video.name}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
};

export default Lesson;
