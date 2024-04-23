import React, { useState } from 'react';
import styles from '../CSS/details.module.css'; // Import CSS module
import riders from '../riders';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { update } from '../redux/mainSlice';
import { calculatefare, getRandomAlphabets, getRandomNumber } from './utils';

const convertLatLong = (data) => {
    let pick = data.pickLatLong;
    let drop = data.dropLatLong;
    let latNlong = []
    if (pick !== "" && drop !== "") {
        latNlong.push(pick.split(",").map((string) => parseFloat(string)));
        latNlong.push(drop.split(",").map((string) => parseFloat(string)));
        return (latNlong[0] !== null && latNlong[0].length > 1 && latNlong[1] !== null && latNlong[1].length > 1) ? latNlong : []
    } else {
        return (latNlong)
    }
}

function RawDetails() {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const [jsonInput, setJsonInput] = useState('');
    
    const handleJsonInputChange = (event) => {
        setJsonInput(event.target.value);
    };

    function SaveData() {
        try {
            const jsonData = JSON.parse(jsonInput);
            console.log(jsonData.name)
            let fare = jsonData.fare;
                if(fare === undefined || fare === null || typeof fare === "string")
                    fare = 0;
            const obj = {
                name: jsonData.name,
                date: jsonData.datetime,
                pickup: jsonData.pickup,
                drop: jsonData.drop,
                duration: jsonData.duration,
                distance: jsonData.distance,
                rideCharges: fare,
                rideId: "RD" + getRandomNumber(15000000000000000, 19000000000000000),
                rider: riders[getRandomNumber(0, riders.length - 1)],
                vehicleNumber: "KA" + getRandomNumber(10, 40) + getRandomAlphabets() + getRandomNumber(1000, 9999),
                bookingFee: getRandomNumber(5, ((fare / 100) * 10)),
                invoiceId: `2324KA007${getRandomNumber(1000000, 9999999)}`,
                latNlong: convertLatLong(jsonData)
            };

            dispatch(update(obj));
            // alert(jsonData.name)
              nav("/rapido_invoice");
        } catch (error) {
            console.error("Error parsing JSON input:", error);
        }
    }

    return (
        <div className={`${styles.container}`}>
            <h1>Ride Details</h1>
            <div className={`${styles.field}`}>
                <label htmlFor="jsonInput">Enter JSON Data:</label>
                <textarea id="jsonInput" rows="10" cols="50" value={jsonInput} onChange={handleJsonInputChange} />
            </div>
            <button onClick={SaveData} className={`${styles.button}`}>Generate invoice</button>
        </div>
    );
}

export default RawDetails;
