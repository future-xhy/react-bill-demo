import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import router from '@/router';
import { RouterProvider } from 'react-router-dom';

import store from './store';
import { Provider } from 'react-redux';

// 引入主题色
import "./theme.css"

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
  </Provider>
);  
