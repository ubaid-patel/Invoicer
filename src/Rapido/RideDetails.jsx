import React, { useEffect, useState } from 'react';
import styles from '../CSS/details.module.css'; // Import CSS module
import riders from '../riders';
import { useNavigate } from 'react-router-dom';
import { fetchAddress, fetchLocation, convertLatLong, getRandomAlphabets, getRandomNumber, calculatefare, getAddresses } from './utils';
import { useSelector, useDispatch } from 'react-redux'
import { update } from '../redux/mainSlice';


function RideDetails() {
  const nav = useNavigate();
  const a = useSelector((state)=>console.log(state))
  const dispatch = useDispatch(); // Correct usage of useDispatch

  function SaveData(event) {
    event.preventDefault();
    const data = new FormData(event.target);
    const fare = calculatefare(data.get('distance'));

    const obj = {
      name: data.get('name'),
      date: data.get('datetime'),
      // pickup: data.get('pickup'),
      // drop: data.get('drop'),
      duration: data.get('duration'),
      distance: data.get('distance'),
      rideCharges: fare,
      rideId: "RD" + getRandomNumber(15000000000000000, 19000000000000000),
      rider: riders[getRandomNumber(0, riders.length - 1)],
      vehicleNumber: "KA" + getRandomNumber(10, 40) + getRandomAlphabets() + getRandomNumber(1000, 9999),
      bookingFee: getRandomNumber(5, ((fare / 100) * 10)),
      invoiceId: `2324KA007${getRandomNumber(1000000, 9999999)}`,
      latNlong: convertLatLong(data)
    };

    // Dispatch the action with the data object
    dispatch(update(obj)); // Correct usage of dispatch
    
    nav("/rapido_invoice")
  }

  return (
    <div className={`${styles.container}`}>
      <h1>Ride Details</h1>
      <form action="" method="get" onSubmit={SaveData}>
        <div className={`${styles.field}`}>
          <label htmlFor="datetime">Date and Time:(Feb 22nd 2024, 6:56 PM)</label>
          <input type="text" id="datetime" name="datetime" required step={1}/>
        </div>
        <div className={`${styles.field}`}>
          <label htmlFor="name">Name:</label>
          <input type="text" id="name" name="name" required />
        </div>
        {/* <div className={`${styles.field}`}>
          <label htmlFor="pickup">Pickup Location:</label>
          <input type="text" id="pickup" name="pickup" required />
        </div>
        <div className={`${styles.field}`}>
          <label htmlFor="drop">Drop Location:</label>
          <input type="text" id="drop" name="drop" required />
        </div> */}
        <div className={`${styles.field} ${styles.distance}`}>
          <label htmlFor="distance">Distance:</label>
          <input type="text" id="distance" name="distance" value={0} />
        </div>
        <div className={`${styles.field}`}>
          <label htmlFor="duration">Duration:</label>
          <input type="text" id="duration" name="duration" required />
        </div>
        <div className={`${styles.field}`}>
          <label htmlFor="duration">Pick up latitude,longitude:</label>
          <input type="text" id="pickLatLong" name="pickLatLong" />
          <button type='button' onClick={()=>{fetchLocation("pickLatLong")}}><img src="location.svg" alt="" /></button>
        </div>
        <div className={`${styles.field}`}>
          <label htmlFor="duration">Drop latitude,longitude:</label>
          <input type="text" id="dropLatLong" name="dropLatLong" />
          <button type='button' onClick={()=>{fetchLocation("dropLatLong")}}><img src="location.svg" alt="" /></button>
        </div>
        <button type='submit' className={`${styles.button}`}>Generate invoice</button>
      </form>
    </div>
  );
}
export default RideDetails;
