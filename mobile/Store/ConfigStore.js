import { createStore } from 'redux';
import toggleFavorite from './Reducer';

export default createStore(toggleFavorite)