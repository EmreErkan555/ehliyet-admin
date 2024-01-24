import React, { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { getExams } from '../services/apiService';

function ExamList() {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const token = localStorage.getItem('token');

  async function fetchExams() {
    const data = await getExams()
    setExams(data);
  }

  const deleteExam = async (examId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/exams/${examId}`, {
        method: 'DELETE',
        headers: {
          Authorization: token
        }
      });

      if (response.ok) {
        fetchExams();
      } else {
        console.error('Sınav silinirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error deleting exam:', error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

  return (
    <Container>
      <h2 className="my-4">Sınav Listesi</h2>
      <Card>
        <ListGroup variant="flush">
          {exams.map((exam, index) => (
            <ListGroup.Item key={exam._id} onClick={() => navigate(`/addquestion/${exam._id}`, { state: { examName: exam.name } })} className={index % 2 === 0 ? '' : 'bg-light'}>
                <div className="d-flex justify-content-between align-items-center">
                <h3>{exam.name}</h3>
                <Button variant="danger" onClick={() => deleteExam(exam._id)}>Sil</Button>
                </div>
            </ListGroup.Item>

          ))}
        </ListGroup>
      </Card>
    </Container>
  );
}

export default ExamList;
