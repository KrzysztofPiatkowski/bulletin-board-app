// src/components/AdDetailsPage.js
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Spinner, Alert, Container, Image, Button } from 'react-bootstrap';
import { IMGS_URL } from '../config';

const AdDetailsPage = ({ user }) => {
  const { id } = useParams(); // Pobieramy `id` z adresu URL
  const navigate = useNavigate();
  const [ad, setAd] = useState(null); // Tu zapiszemy dane ogłoszenia
  const [loading, setLoading] = useState(true); // Czy trwa ładowanie
  const [error, setError] = useState(null); // Czy wystąpił błąd

  useEffect(() => {
    // Gdy komponent się załaduje lub zmieni się `id`
    const fetchAd = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/ads/${id}`, {
          credentials: 'include', // dodajemy, jeśli backend używa sesji
        });

        if (!response.ok) throw new Error('Failed to fetch ad');

        const data = await response.json();
        setAd(data);       // Zapisujemy dane ogłoszenia do stanu
        console.log('📅 Data z backendu:', data.date);
        setLoading(false); // Wyłączamy spinner
      } catch (err) {
        setError(err.message); // Zapisujemy komunikat o błędzie
        setLoading(false);
      }
    };

    fetchAd(); // Wywołujemy funkcję
  }, [id]);

  // Ładowanie...
  if (loading) return <Spinner animation="border" />;

  // Błąd
  if (error) return <Alert variant="danger">{error}</Alert>;

  // Jeśli wszystko działa
  return (
    <Container className="py-4">
      <h1>{ad.title}</h1>
      <p><strong>Localization:</strong> {ad.localization}</p>
      <p><strong>Description:</strong> {ad.content}</p>
      <p><strong>Published:</strong> {new Date(ad.date).toLocaleDateString()}</p>
      {ad.photo && (
        <Image
          src={IMGS_URL + ad.photo}
          alt={ad.title}
          fluid
          className="my-3"
        />
      )}
      <p><strong>Price:</strong> {ad.price} zł</p>

      <p><strong>Seller login:</strong> {ad.sellerInfo?.login || 'unknown'}</p>
      <p><strong>Seller phone:</strong> {ad.sellerInfo?.phone || 'unknown'}</p>

      {user && ad.sellerInfo && (
        (user.id === ad.sellerInfo._id || user.id === ad.sellerInfo) && (
          <><Button variant="warning" onClick={() => navigate(`/ads/edit/${ad._id}`)}>
            ✏️ Edit
          </Button>
          <Button variant="danger"
            onClick={async () => {
              if (window.confirm('Czy na pewno chcesz usunąć to ogłoszenie?')) {
                try {
                  const res = await fetch(`http://localhost:8000/api/ads/${ad._id}`, {
                    method: 'DELETE',
                    credentials: 'include',
                  });

                  if (!res.ok) throw new Error('Usuwanie nie powiodło się');

                  alert('✅ Ogłoszenie zostało usunięte');
                  navigate('/'); // przekieruj na stronę główną
                } catch (err) {
                  alert('❌ Błąd przy usuwaniu ogłoszenia');
                  console.error(err);
                }
              }
            }}>
              Delete
          </Button></>
        )
      )}
    
      {ad.sellerInfo?.avatar && (
        <Image
          src={`${IMGS_URL}${ad.sellerInfo.avatar}`}
          alt={ad.sellerInfo.login}
          roundedCircle
          style={{ width: '100px', height: '100px', objectFit: 'cover' }}
          className="my-3"
        />
      )}

    </Container>
  );
};

export default AdDetailsPage;
