import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './redux/store.js';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import reportWebVitals from './reportWebVitals';
import { fakeBackend } from './components/shared/helper/fake-backend.js';
import { fakeBackendCategory } from './components/shared/helper/fake-backend-category.js';
import { fakeBackendProduct } from './components/shared/helper/fake-backend-product.js';

import 'bootstrap/dist/css/bootstrap.css';

fakeBackend();
fakeBackendCategory();
fakeBackendProduct();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter >
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
