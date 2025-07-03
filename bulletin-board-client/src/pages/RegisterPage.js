import React, { useState } from 'react';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('login', login);
    formData.append('password', password);
    formData.append('phone', phone);
    if (avatar) formData.append('avatar', avatar);

    try {
        const response = await fetch('http://localhost:8000/auth/register', {
        method: 'POST',
        body: formData,
        credentials: 'include',
        });

        const text = await response.text();

        if (!response.ok) throw new Error(text || 'Błąd rejestracji');

        alert('✅ Rejestracja zakończona pomyślnie!');
        console.log('✅ SERVER RESPONSE:', text);
        navigate('/');
    } catch (err) {
        setError(err.message);
    }
    };

  return (
    <Container className="py-4">
      <h2>Zarejestruj się</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit} encType="multipart/form-data">
        <Form.Group controlId="login" className="mb-3">
          <Form.Label>Login</Form.Label>
          <Form.Control
            type="text"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Hasło</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="phone" className="mb-3">
          <Form.Label>Numer telefonu</Form.Label>
          <Form.Control
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="avatar" className="mb-3">
          <Form.Label>Avatar</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setAvatar(e.target.files[0])}
            accept="image/*"
          />
        </Form.Group>

        <Button type="submit">Zarejestruj</Button>
      </Form>
    </Container>
  );
};

export default RegisterPage;
