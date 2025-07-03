import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IMGS_URL } from '../config';

const SearchResultsPage = () => {
  const { query } = useParams();
  const ads = useSelector(state => state.ads.list);

  const filteredAds = ads.filter(ad =>
    ad.title.toLowerCase().includes(query.toLowerCase()) ||
    ad.content.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Container className="py-4">
      <h2>Wyniki wyszukiwania dla: <em>{query}</em></h2>

      {filteredAds.length === 0 ? (
        <Alert variant="warning">Nie znaleziono ogłoszeń pasujących do zapytania.</Alert>
      ) : (
        <Row>
          {filteredAds.map(ad => (
            <Col key={ad._id} md={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={IMGS_URL + ad.photo}
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <Card.Body>
                  <Card.Title>{ad.title}</Card.Title>
                  <Card.Text>{ad.localization}</Card.Text>
                  <Button as={Link} to={`/ads/${ad._id}`} variant="primary">
                    Read more
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchResultsPage;
