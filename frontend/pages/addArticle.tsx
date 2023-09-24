import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import Link from 'next/link';


const Index = () => {
  return (
    <Container>
      <Link href="/">Return Home</Link>
    </Container>
  );
};

export default Index;
