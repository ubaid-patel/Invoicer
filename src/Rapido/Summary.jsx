import React, { useEffect, useState } from 'react';
import styles from '../CSS/summary.module.css'; // Import CSS module
import Map from './Map';
import { fetchAddress } from './utils';
import { useSelector, useDispatch } from 'react-redux'
import { updateAddress,updateDrop,updatePickup } from '../redux/mainSlice';

export default function Summary() {
    const data = useSelector((state) => state.data.data);
    useEffect(() => { getAddresses(data) }, []);
    const dispatch = useDispatch();

    function getAddresses(data) {
        let local = { ...data }
        let addresses = []

        return (new Promise((resolve, reject) => {

            if(data.pickup == "" && data.drop ==""){
                fetchAddress([...local.latNlong[0]].reverse()).then((addr0) => {
                    fetchAddress([...local.latNlong[1]].reverse()).then((addr1) => {
                        dispatch(updateAddress([addr0,addr1]))
                    })
                });
            }else if(data.pickup == ""){
                fetchAddress([...local.latNlong[0]].reverse()).then((addr) => {
                    dispatch(updatePickup([addr]))
                });
            }else if(data.drop == ""){
                fetchAddress([...local.latNlong[1]].reverse()).then((addr) => {
                    dispatch(updateDrop([addr]))
                });
            }
        }))
    }
    return (
        <div className={`${styles.main} ${styles.paymentsummary}`}>
            <div className={`${styles.row} ${styles.header}`}>
                <div><h3>Payment Summary</h3></div>
                <div><img src="logo.jpg" alt="" /></div>
            </div>

            <div className={`${styles.column} ${styles.rideid}`}>
                <div className={styles.row}>
                    <div>Ride ID</div>
                    <div><div>{data.rideId}</div></div>
                </div>
                <div className={styles.row}>
                    <div>Time of Ride</div>
                    <div><div>{data.date}</div></div>
                </div>
            </div>

            <div className={styles.total}>
                <div className={styles.column}>
                    <div className={styles.vericalItem}>Total</div>
                    <div className={`${styles.vericalItem} ${styles.ttlchrgps}`}>₹ {(((data.rideCharges + data.bookingFee) * 100) / 100).toFixed(2)}</div>
                </div>
            </div>
            <Map />
            <div className={`${styles.column} ${styles.pickNdrop}`}>
                <p className={styles.pickup}>
                    <div><div className={styles.dot} /> &nbsp;&nbsp;{data.pickup}</div>
                </p>
                <div className={styles.gap} />
                <div className={styles.drop}>
                    <div><div className={styles.dot} />&nbsp;&nbsp;{data.drop}</div>
                </div>
            </div>

            <div className={styles.billdetails}>
                <h3 className={styles.billHeading}>Bill Details</h3>
                <div className={`${styles.column} ${styles.charges}`}>
                    <div className={styles.row}>
                        <div>Ride Charge</div>
                        <div>₹ {((data.rideCharges) * 100 / 100).toFixed(2)}</div>
                    </div>
                    <div className={styles.row}>
                        <div>Booking fees & Convenience Charges</div>
                        <div>₹ {((data.bookingFee) * 100 / 100).toFixed(2)}</div>
                    </div>
                </div>

                <div className={`${styles.row} ${styles.billtotal}`}>
                    <div className={styles.column}>
                        <div>Total Amount</div>
                        <div>(inclusive of taxes)</div>
                    </div>
                    <div>₹{(((data.rideCharges + data.bookingFee) * 100) / 100).toFixed(2)}</div>
                </div>
            </div>

            <div className={styles.paymentmethod}>
                <div className={styles.column}>
                    <div>You Paid Using</div>
                    <div>Cash</div>{ }
                </div>
                <div className={styles.pmtotal}>₹{(((data.rideCharges + data.bookingFee) * 100) / 100).toFixed(2)}</div>
            </div>
        </div>
    );
}
