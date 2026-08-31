import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './src/App.jsx';

try {
  console.log('Attempting to render <App /> to string...');
  const html = renderToString(<App />);
  console.log('SUCCESS! Rendered HTML length:', html.length);
} catch (err) {
  console.error('CRASH DURING RENDER:');
  console.error(err);
}
