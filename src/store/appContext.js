import { createContext } from 'react';
import { initialState } from './reducer';

export const AppContext = createContext(initialState);
