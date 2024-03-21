import logo from './logo.svg';
import './CSS/App.css';
import { useNavigate } from 'react-router-dom';

function App() {
  const nav = useNavigate();
  return (
    <div className="container">
      <h1>Welcome to Invoicer App</h1>
      <p>Please select a client:</p>
      <div className="client-selection">
        <button className="client-button" onClick={() => { nav("/ride_details") }}>Rapido</button>
        <button className="client-button" onClick={() => { nav("/order_details") }}>Zomato</button>
      </div>
    </div>)
}

export default App;
