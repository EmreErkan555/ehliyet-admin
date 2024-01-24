import React, { useEffect, useReducer, useState } from 'react';
import { Container, Card, Form, Image, Button, Modal } from 'react-bootstrap';
import { getQuestionsbyExam } from '../../services/apiService';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const Questions = () => {
  const { examId } = useParams();
  const { t } = useTranslation(['questions']);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [showCorrectAnswers, setShowCorrectAnswers] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [statics, setStatics] = useState({
    correct: 0,
    wrong: 0,
    note: 0
  })

  useEffect(() => {
    document.title = t('headers:questions');
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    const questionsData = await getQuestionsbyExam(examId);
    setQuestions(questionsData);
  };

  const handleOptionPress = (value, index) => {
    answers[index] = value;
    forceUpdate()
  };

  const showAnswers = () => {
    let correctCounter = 0
    let wrongCounter = 0
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctChoice) correctCounter++
      else wrongCounter++
    });
    setStatics({
      correct: correctCounter,
      wrong: wrongCounter,
      note: correctCounter * 2,
    })
    setModalVisible(true)
    setShowCorrectAnswers(true)
  };

  const handleClose = () => {
    setModalVisible(false)
  }

  return (
    <Container>
      {questions.length === 0 && <h1 className='text-center mt-3'>
        {t('questions:no-question')}          
      </h1>}
      {questions.map((question, index) => (
        <Card key={question.id} className="my-4">
          {question.image && (
            <Image src={question.image} alt="Question Image" fluid className="mx-auto mt-3" />
          )}
          <Card.Body>
            <Card.Title>{(index + 1) + "- " + question.questionText}</Card.Title>
            <Form>
              {['A', 'B', 'C', 'D'].map((option) => (
                <Form.Check
                  key={option}
                  type="radio"
                  id={`option-${option}`}
                  label={question[`option${option}`]}
                  name={`question-${question.id}`}
                  checked={answers[index] === option}
                  onChange={() => handleOptionPress(option, index)}
                  style={{
                    backgroundColor:
                      answers[index] === option || question.correctChoice === option
                        ? showCorrectAnswers
                          ? question.correctChoice === option
                            ? '#90EE90'
                            : '#e71d36'
                          : 'white'
                        : 'white'
                  }}
                />
              ))}
            </Form>
          </Card.Body>
        </Card>
      ))}
      {questions.length > 0 && <Button variant="outline-primary" onClick={showAnswers} className="align-self-center mb-4">
        {t('questions:result')}      
      </Button>}

      <Modal show={modalVisible} onHide={handleClose}>
        <Modal.Body className='text-center'>
          <h4 style={{ color: 'green' }}>
            {t('questions:correct')}{statics.correct}
          </h4>
          <h4 style={{ color: 'red' }}>
            {t('questions:wrong')}{statics.wrong}
          </h4>
          <h4>
            {t('questions:score')}{statics.note}
          </h4>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={handleClose}>
            {t('questions:review')}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Questions;
