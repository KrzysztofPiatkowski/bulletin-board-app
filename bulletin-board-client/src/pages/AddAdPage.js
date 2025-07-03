import React from 'react';
import { Container } from 'react-bootstrap';
import AdForm from '../components/AdForm';

const AddAdPage = () => {
    return (
        <Container className="py-4">
            <h1>Add a new advertisment</h1>
            <AdForm />
        </Container>
    );
};

export default AddAdPage;