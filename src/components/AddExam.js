import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

function AddExam() {
  const [examName, setExamName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/exams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`
        },
        body: JSON.stringify({ name: examName })
      });

      if (response.ok) {
        navigate('/dashboard');
        console.log('Sınav eklendi.');
      } else {
        console.error('Sınav eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error adding exam:', error);
    }
  };

  return (
    <Container>
      <h2 className="my-4">Sınav Ekle</h2>
      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="examName">
              <Form.Label>Sınav Adı</Form.Label>
              <Form.Control
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                required
                size="lg"
                style={{ marginBottom: '10px' }}
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              Sınav Ekle
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default AddExam;
