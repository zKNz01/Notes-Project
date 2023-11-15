import React from 'react';
import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';

import Routes from './routers';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
};

export default App;
