import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link, NavLink } from 'react-router-dom';

const Header = ({ user, setUser }) => {

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setUser(null);
      } else {
        console.error('Wylogowanie nie powiodło się');
      }
    } catch (error) {
      console.error('Błąd podczas wylogowywania:', error);
    }
  };

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        {}
        <Navbar.Brand as={Link} to="/">Bulletin</Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="ms-auto">

            {user && (
              <span className="me-3">Witaj, {user.login}!</span>
            )}

            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            {user
              ? (
                <Nav.Link onClick={handleLogout}>Sign out</Nav.Link>
              ) : (
                // jeśli niezalogowany → „Sign in” i „Sign up”
                <>
                  <Nav.Link as={NavLink} to="/auth/login">Sign in</Nav.Link>
                  <Nav.Link as={NavLink} to="/auth/register">Sign up</Nav.Link>
                </>
              )
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
