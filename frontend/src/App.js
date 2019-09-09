import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Provider} from 'react-redux'
import {BrowserRouter} from 'react-router-dom'
import store from './store/store';
import Routes from './Routes';
import Layout from './components/Layout';
function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes />
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
