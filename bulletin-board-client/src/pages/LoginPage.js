import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';

const LoginPage = ({ setUser }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);

    try {
      const response = await fetch('http://localhost:8000/auth/login', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Błędne dane logowania');
      }

      const userRes = await fetch('http://localhost:8000/auth/user', {
        credentials: 'include',
      });

      if (userRes.ok) {
        const userData = await userRes.json();
        setUser(userData);
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <Container className="py-5" style={{ maxWidth: '500px' }}>
      <h1>Logowanie</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button type="submit">Zaloguj się</Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
