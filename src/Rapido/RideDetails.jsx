import React from 'react';
import '../CSS/ride.css'; // Assuming you have a CSS file with the provided styles
import riders from '../riders';
import { useNavigate } from 'react-router-dom';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomAlphabets() {
  const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const randomIndex1 = Math.floor(Math.random() * alphabets.length);
  const randomIndex2 = Math.floor(Math.random() * alphabets.length);

  const randomAlphabet1 = alphabets[randomIndex1];
  const randomAlphabet2 = alphabets[randomIndex2];
  return randomAlphabet1 + randomAlphabet2;
}


function calculatefare(distance) {
  let cost = 0;
  for (let index = 0; index < distance; index++) {
    if (index <= 5) {
      cost += 7.5;
    } else if (index > 5 && index <= 10) {
      cost += 9.5;
    } else {
      cost += 11.5;
    }
  }
  return (cost);
}

function SaveData(event) {
  return (new Promise((resolve, reject) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const fare = calculatefare(data.get('distance'));

    //What need to be derived or generated
    //rideid,conviniencefee,invoiceno,vehicle no,captian name,taxes
    const obj = {
      name: data.get('name'),
      date: data.get('datetime'),
      pickup: data.get('pickup'),
      drop: data.get('drop'),
      duration: data.get('duration'),
      distance: data.get('distance'),
      rideCharges: fare,
      rideId: "RD" + getRandomNumber(15000000000000000, 19000000000000000),
      rider: riders[getRandomNumber(0, riders.length - 1)],
      vehicleNumber: "KA" +getRandomNumber(10,40)+getRandomAlphabets() + getRandomNumber(1000, 9999),
      bookingFee: getRandomNumber(5, ((fare / 100) * 10)),
    }
    localStorage.rapido = JSON.stringify(obj);
    resolve();
  }))
}


function RideDetails() {
  const nav = useNavigate();
  return (
    <div className="container">
      <h1>Ride Details</h1>
      <form action="" method="get" onSubmit={(event)=>{SaveData(event).then(()=>{nav("/rapido_invoice")})}}>
        <div className="field">
          <label htmlFor="datetime">Date and Time:</label>
          <input type="datetime-local" id="datetime" name="datetime" required />
        </div>
        <div className="field">
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="field">
          <label htmlFor="pickup">Pickup Location:</label>
          <input type="text" id="pickup" name="pickup" required />
        </div>
        <div className="field">
          <label htmlFor="drop">Drop Location:</label>
          <input type="text" id="drop" name="drop" required />
        </div>
        <div className="field">
          <label htmlFor="distance">Distance:</label>
          <input type="number" id="distance" name="distance" required />
        </div>
        <div className="field">
          <label htmlFor="duration">Duration:</label>
          <input type="text" id="duration" name="duration" required />
        </div>
        {/* <div className="field">
          <label htmlFor="captain">Captain Name:</label>
          <input type="text" id="captain" name="captain" required />
        </div>
        <div className="field">
          <label htmlFor="vehicle">Vehicle Number:</label>
          <input type="text" id="vehicle" name="vehicle" required />
        </div> */}
        <button type='submit' className="button">Generate invoice</button>
      </form>
    </div>
  );
}
export default RideDetails;
