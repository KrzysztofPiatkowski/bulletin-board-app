import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AdForm = ({ mode = 'add', initialData = {}, adId = null }) => {

  const [title, setTitle] = useState(initialData.title || '');
  const [content, setContent] = useState(initialData.content || '');
  const [localization, setLocalization] = useState(initialData.localization || '');
  const [price, setPrice] = useState(initialData.price || '');
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !price) {
      return setError('Wypełnij wymagane pola!');
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('localization', localization);
    formData.append('price', price);
    formData.append('date', new Date().toISOString()); // aktualna data
    if (photo) formData.append('photo', photo);

    try {
      let uploadedPhotoName = initialData.photo || '';

      // Jeśli użytkownik wybrał nowe zdjęcie — uploaduj
      if (photo) {
        const uploadForm = new FormData();
        uploadForm.append('photo', photo);

        const uploadRes = await fetch('http://localhost:8000/upload/photo', {
          method: 'POST',
          body: uploadForm,
          credentials: 'include',
        });

        if (!uploadRes.ok) throw new Error('Błąd podczas przesyłania zdjęcia');

        const uploadData = await uploadRes.json();
        uploadedPhotoName = uploadData.filename;
      }

      const payload = {
        title,
        content,
        localization,
        price,
        photo: uploadedPhotoName,
        date: mode === 'edit' ? initialData.date : new Date().toISOString(),
      };

      const endpoint = mode === 'edit'
        ? `http://localhost:8000/api/ads/${adId}`
        : `http://localhost:8000/api/ads`;

      const method = mode === 'edit' ? 'PUT' : 'POST';

      const res = await fetch(endpoint, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Błąd przy ${mode === 'edit' ? 'edycji' : 'dodawaniu'} ogłoszenia`);

      navigate('/');

    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      {error && <Alert variant="danger">{error}</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Title*</Form.Label>
        <Form.Control
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description*</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Localization</Form.Label>
        <Form.Control
          type="text"
          value={localization}
          onChange={(e) => setLocalization(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Price*</Form.Label>
        <Form.Control
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Photo</Form.Label>
        <Form.Control
          type="file"
          onChange={(e) => setPhoto(e.target.files[0])}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        {mode === 'edit' ? 'Zapisz zmiany' : 'Dodaj ogłoszenie'}
      </Button>
    </Form>
  );
};

export default AdForm;
