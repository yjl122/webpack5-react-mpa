import React from 'react';
import { createRoot } from 'react-dom/client';
import src from './images/fireCar.png';

const App = ()=> {
    return (
      <>
        <img src={src} />
      </>
    )
}
const root = document.getElementById('root');
if(root) {
  createRoot(root).render(<App />)
}
