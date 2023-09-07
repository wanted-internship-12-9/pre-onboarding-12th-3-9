import React from 'react';
import GlobalStyles from './styles/GlobalStyles.style';
import Home from './pages/home';
import { worker } from './mocks/browser';

if (process.env.NODE_ENV === 'development') {
  worker.start();
}

function App() {
  return (
    <>
      <GlobalStyles />
      <Home />
    </>
  );
}

export default App;
