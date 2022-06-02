import React from 'react';
import { Container } from '@chakra-ui/react'
import CreateAlbum from './components/CreateAlbum/CreateAlbum';

function App() {
  return (
    <Container className="app">
      <CreateAlbum/>
    </Container>
  );
}

export default App;
