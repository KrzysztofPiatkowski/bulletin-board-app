import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Spinner, Alert } from 'react-bootstrap';
import AdForm from '../components/AdForm';

const EditAdPage = () => {
  const { id } = useParams();
  const [ad, setAd] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAd = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/ads/${id}`, {
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Nie udało się pobrać ogłoszenia');

        const data = await res.json();
        setAd(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAd();
  }, [id]);

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <Container className="py-4">
      <h1>Edit your ad</h1>
      <AdForm mode="edit" initialData={ad} adId={id} />
    </Container>
  );

};

export default EditAdPage;
