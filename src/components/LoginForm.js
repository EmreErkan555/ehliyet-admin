import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login(email, password);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
      <Card style={{ minWidth: '35%', maxWidth: '60%', backgroundColor: '#e6f7ff' }}>
        <Card.Body>
          <h2 className="text-center mb-4">Giriş Yap</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </Form.Group>
            <Form.Group id="password" className="mb-4">
              <Form.Label>Şifre</Form.Label>
              <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </Form.Group>
            <Button className="w-100" type="submit">Giriş</Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default LoginForm;
