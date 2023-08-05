import { useState, useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function AddQuestion() {
  const navigate = useNavigate();
  const { examId } = useParams();

  const location = useLocation();
  const { examName } = location.state;

  const [form, setForm] = useState({
    exam: examId,
    questionText: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctChoice: 'A',
    image: '',
  });
  const [questions, setQuestions] = useState([]);

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/questions/byexam/${examId}`, {
        headers: {
            Authorization: localStorage.getItem('token')
        }
      });
      console.log("response", response)

      if (response.ok) {
        const data = await response.json();
        console.log("data", data)
        setQuestions(data);
      } else {
        console.error('Sorular alınırken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/questions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: localStorage.getItem('token')
        },
        body: JSON.stringify(form)
      });

      if (response.ok) {
        fetchQuestions();
        toast.success('Soru eklendi');
      } else {
        console.error('Soru eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value
    }));
  };

  const handleDelete = async (questionId) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/questions/${questionId}`, {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('token')
        }
      });

      if (response.ok) {
        fetchQuestions(); // Soru silindikten sonra soruları tekrar çek
      } else {
        console.error('Soru silinirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Error deleting question:', error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prevForm) => ({
          ...prevForm,
          image: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [examId]);

  return (
    <Container>
      <h2 className="my-4">Soru Ekle - {examName}</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Soru</Form.Label>
          <Form.Control
            type="text"
            name="questionText"
            value={form.questionText}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>A şıkkı</Form.Label>
          <Form.Control
            type="text"
            name="optionA"
            value={form.optionA}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>B şıkkı</Form.Label>
          <Form.Control
            type="text"
            name="optionB"
            value={form.optionB}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>C şıkkı</Form.Label>
          <Form.Control
            type="text"
            name="optionC"
            value={form.optionC}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>D şıkkı</Form.Label>
          <Form.Control
            type="text"
            name="optionD"
            value={form.optionD}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Doğru şık</Form.Label>
          <Form.Select
            name="correctChoice"
            value={form.correctChoice}
            onChange={handleChange}
            required
          >
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </Form.Select>
        </Form.Group>
        <Form.Group controlId="image">
          <Form.Label>Fotoğraf Ekle</Form.Label>
          <Form.Control type="file" accept="image/*" onChange={handleImageUpload} />
        </Form.Group>
        <Button variant="primary" type="submit" style={{marginTop: 20}}>
          Soru Ekle
        </Button>
      </Form>
      <ListGroup style={{marginTop: 50}}>
        {questions.map((question, index) => (
          <Card key={question._id} className="mb-3">
            <Card.Header>{index + 1 + ") " + question.questionText}</Card.Header>
            {question.image && (
                <Card.Img variant="top" src={question.image} alt="Soru Fotoğrafı" />
            )}
            <ListGroup variant="flush">
                <ListGroup.Item>A {question.optionA}</ListGroup.Item>
                <ListGroup.Item>B {question.optionB}</ListGroup.Item>
                <ListGroup.Item>C {question.optionC}</ListGroup.Item>
                <ListGroup.Item>D {question.optionD}</ListGroup.Item>
                <ListGroup.Item>Doğru şık: {question.correctChoice}</ListGroup.Item>
                <ListGroup.Item>
                    <Button variant="danger" onClick={() => handleDelete(question._id)}>Sil</Button>
                </ListGroup.Item>
            </ListGroup>
          </Card>
        ))}
      </ListGroup>
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={true} />
    </Container>
  );
}

export default AddQuestion;
