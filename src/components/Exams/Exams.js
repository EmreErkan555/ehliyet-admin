import React, { useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { getExams } from '../../services/apiService';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Exams() {
  const { t } = useTranslation(['dashboard']);
  const [exams, setExams] = useState([]);

  useEffect(() => {
    document.title = t('headers:exams');
    fetchExams()
  }, [])

  const fetchExams = async () => {
    const exams = await getExams();
    setExams(exams)
  }

  return (
    <Container>
      <h1 className='text-center mb-4'>{t('dashboard:exam-list')}</h1>
      {exams.map((exam) => (
        <Link key={exam.id} to={`/questions/${exam.id}`}>
          <Card style={{ margin: '10px' }} className='text-center'>
            <Card.Body>
              <Card.Title>
                {exam.name}
              </Card.Title>
            </Card.Body>
          </Card>
        </Link>
      ))}
    </Container>
  );
};
