import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { configureAppStore } from 'store/configureStore';

import mapboxgl from 'mapbox-gl';

import 'assets/css/index.css';

import 'mapbox-gl/dist/mapbox-gl.css';
import 'assets/css/custom-mapbox-gl.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

(mapboxgl as any).workerClass =
  // eslint-disable-next-line import/no-webpack-loader-syntax
  require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;

const store = configureAppStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
