import logo from './logo.svg';
import styles from './CSS/app.module.css'; // Import CSS module
import { useNavigate } from 'react-router-dom';
import Map from './Rapido/Map';

function App() {
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <h1>Welcome to Invoicer App</h1>
      <p>Please select a client:</p>
      <div className={styles['client-selection']}>
        <button className={styles['client-button']} onClick={() => { nav("/ride_details") }}>Rapido</button>
        <button className={styles['client-button']} onClick={() => { nav("/order_details") }}>Zomato</button>
      </div>
    </div>
  );
}

export default App;
