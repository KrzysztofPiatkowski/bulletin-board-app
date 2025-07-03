import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAds } from '../features/ads/adsSlice';
import { Row, Col, Card, Spinner, Alert, Form, Button, Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { IMGS_URL } from '../config';

const HomePage = ({ user }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { list, status, error } = useSelector(state => state.ads);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('');

  useEffect(() => {
    dispatch(fetchAds());
  }, [dispatch]);

  const handleSearch = e => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/search/${encodeURIComponent(search)}`);
    }
  };

  return (
    <Container className="py-4">
      <Form onSubmit={handleSearch} className="mb-4">
        <Row className="align-items-center">
          <Col xs={12} md={user ? 8 : 10} className="mb-2 mb-md-0">
            <Form.Control
              type="text"
              placeholder="Search ads..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col xs={6} md={2} className="mb-2 mb-md-0">
            <Button type="submit" className="w-100">Search</Button>
          </Col>
          {user && (
            <Col xs={6} md={2}>
              <Button variant="success" className="w-100" onClick={() => navigate('/ads/add')}>
                Add your ad
              </Button>
            </Col>
          )}
        </Row>
      </Form>

      {status === 'loading' && <Spinner animation="border" />}
      {status === 'failed' && <Alert variant="danger">{error}</Alert>}

      <Row>
        {list.map(ad => (
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

    </Container>
  );
};

export default HomePage;
