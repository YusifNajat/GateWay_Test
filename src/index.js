import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import Store from './store/Store'
import { Provider } from "react-redux";
import 'antd/dist/antd.css'
// import {registerServiceWorker} from './register-sw'
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('../firebase-messaging-sw.js')
//      .then(function(registration) {
//         console.log('Registration successful, scope is:', registration.scope);
//      }).catch(function(err) {
//         console.log('Service worker registration failed, error:', err);
//      });
// }
// registerServiceWorker()
ReactDOM.render(
  <React.StrictMode>
    <Provider store={Store}>
  
    <App />
    
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

