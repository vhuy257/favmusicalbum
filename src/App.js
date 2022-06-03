import React, { useEffect, useReducer } from 'react';
import { Container } from '@chakra-ui/react'
import CreateAlbum from './components/CreateAlbum/CreateAlbum';
import ListAlbum from './components/ListAlbum/ListAlbum';
import { AppContext } from './store/appContext';
import reducer, { initialState } from './store/reducer';
import {
  getListAlbum
} from './services/AlbumService';
import {
  fetchListAlbumAction
} from './store/actions';

function App() {
  const [{listAlbum, display}, dispatch] = useReducer(reducer, initialState);  

  useEffect(() => {
    const fetchDataList = async() => {
      const dataList = await getListAlbum();
      dispatch(fetchListAlbumAction(dataList));
    }
    fetchDataList();
  }, [])

  return (
    <AppContext.Provider
      value={{
        listAlbum,
        dispatch
      }}
    >
      <Container maxW='container'>
        <CreateAlbum dispatch={dispatch}/>
        <ListAlbum listAlbum={listAlbum} dispatch={dispatch} display={display}/>
      </Container>
    </AppContext.Provider>
  );
}

export default App;
