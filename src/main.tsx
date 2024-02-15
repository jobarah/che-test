import React from 'react';
import { createRoot } from 'react-dom/client';
import Application from './App';

// Say something
console.log('[ERWT] : Renderer execution started');

  // Application to Render
  const app = <Application />;
  // Render application in DOM
  createRoot(document.getElementById('app')).render(app);

export const init = (clientId: string) => {
  console.log('clientId', clientId);
}