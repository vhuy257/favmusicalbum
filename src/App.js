import React, { useReducer } from 'react';
import { Container } from '@chakra-ui/react'
import CreateAlbum from './components/CreateAlbum/CreateAlbum';
import ListAlbum from './components/ListAlbum/ListAlbum';
import { AppContext } from './store/appContext';
import reducer, { initialState } from './store/reducer';

function App() {
  const [{listAlbum}, dispatch] = useReducer(reducer, initialState);  

  return (
    <AppContext.Provider
      value={{
        listAlbum,
        dispatch
      }}
    >
      <Container maxW='container.md' className="app"> {console.log(listAlbum)}
        <CreateAlbum dispatch={dispatch}/>
        <ListAlbum listAlbum={listAlbum}/>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
