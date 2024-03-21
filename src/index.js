import React from 'react';
import ReactDOM from 'react-dom/client';
import './CSS/index.css';
import App from './App';
import RideDetails from './Rapido/RideDetails';
import OrderForm from './Zomato/OrderForm';
import RapidoInvoice from './Rapido/Invoice';
import { Route, BrowserRouter, Routes } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='' Component={App} />
        <Route path='/ride_details' Component={RideDetails} />
        <Route path='/order_details' Component={OrderForm} />
        <Route path='/rapido_invoice' Component={RapidoInvoice} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

