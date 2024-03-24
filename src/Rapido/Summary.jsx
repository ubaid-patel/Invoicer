import React from 'react';
import styles from '../CSS/summary.module.css'; // Import CSS module
import Mapc from './Map';

export default function Summary() {
    const data = JSON.parse(localStorage.rapido);

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

            <div className={`${styles.row} ${styles.addrmap}`}>
                <div className={`${styles.column} ${styles.map} ${styles.real}`}>
                    {/* <img src="error.svg" alt="" className="error" />
                    <p>This site can't load google Maps Correctly.<br/>
                    g.co/staticmaperror/signature</p> */}
                    <Mapc />
                </div>
                <div className={styles.infops}>
                    <div className={`${styles.column} ${styles.distance}`}>
                        <div className={styles.vericalItem}>{(((data.distance) * 100) / 100).toFixed(2)} kms</div>
                        <div className={styles.vericalItem}>Distance</div>
                    </div>
                    <div className={styles.distancegap} />
                    <div className={`${styles.column} ${styles.duration}`}>
                        <div className={styles.vericalItem}>{(((data.duration) * 100) / 100).toFixed(2)} mins</div>
                        <div className={styles.vericalItem}>Duration</div>
                    </div>
                </div>
            </div>

            <div className={styles.column}>
                <p className={styles.pickup}>
                    <div><div className={styles.dot} /> &nbsp;&nbsp;{data.pickup}</div>
                </p>
                <div className={styles.gap} />
                <div className={styles.drop}>
                    <div><div className={styles.dot} />&nbsp;&nbsp; {data.drop}</div>
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
                    <div>Cash</div>{}
                </div>
                <div className={styles.pmtotal}>₹{(((data.rideCharges + data.bookingFee) * 100) / 100).toFixed(2)}</div>
            </div>
        </div>
    );
}
