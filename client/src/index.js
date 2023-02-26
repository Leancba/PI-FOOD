import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
//importo  browserRouter para las rutas
import { BrowserRouter } from 'react-router-dom';
//import Provider de React que permite que los componentes que lo consumen se suscriban a los cambios del contexto
import { Provider } from 'react-redux';
// import Store que es store es un objeto que mantiene el árbol de estado de la aplicación
// debo crearlo en un archivo js llamado obviamente store
import store from './redux/store';




ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();