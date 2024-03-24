import styles from '../CSS/taxInvoice1.module.css'; // Import CSS module

function RideTax() {
    const data = JSON.parse(localStorage.rapido);
    return (
        <>
            <div className={styles.main}>
                <div className={`${styles.header} ${styles.row}`}>
                    <div className={`${styles.col} ${styles.txinv}`}>
                        <h2>Tax Invoice</h2>
                        <span>{data.rideId}</span>
                    </div>
                    <div>
                        <img src="logo.jpg" alt="" />
                    </div>
                </div>

                <div className={styles.info}>
                    <div className={styles.row}>
                        <div>Invoice No.</div>
                        <div>{data.invoiceId}</div>
                    </div>
                    <div className={styles.row}>
                        <div>Invoice Date</div>
                        <div>{data.date}</div>
                    </div>
                    <div className={styles.row}>
                        <div>State</div>
                        <div>Karnataka</div>
                    </div>
                    <div className={styles.row}>
                        <div className={styles.column}>
                            <div>Tax Category</div>
                            <div className={styles.txcatbrdr}><div/></div>
                        </div>
                        <div>Other local transportation services of <br /> passengers n.e.c. (996419){" "}</div>
                    </div>
                    <div className={styles.row}>
                        <div>Place of Supply</div>
                        <div>Karnataka</div>
                    </div>
                    <div className={styles.row}>
                        <div>GST Number</div>
                        <div>29AAHCR1710J1ZC</div>
                    </div>
                    <div className={styles.row}>
                        <div>Captain Name</div>
                        <div>{data.rider}</div>
                    </div>
                    <div className={styles.row}>
                        <div>Vehicle Number</div>
                        <div>{data.vehicleNumber}</div>
                    </div>
                    <div className={`${styles.row} ${styles.custnm}`}>
                        <div className={styles.col}>
                            <div>Customer Name</div>
                            <div className={styles.inv1pickup}>
                                <div>Customer Pick Up Address</div>
                                <div>{data.pickup}</div>
                            </div>
                        </div>
                        <div>{data.name}</div>
                    </div>
                </div>

                <div className={styles.billDtails}>
                    <h2>Bill Details</h2>
                    <div className={styles.row}>
                        <div>Captain Fee</div>
                        <div>₹ {((data.rideCharges / 100) * 95).toFixed(2)}</div>
                    </div>
                    <div className={styles.row}>
                        <div>CGST (2.5%)</div>
                        <div> ₹ {((data.rideCharges / 100) * 2.5).toFixed(2)}</div>
                    </div>
                    <div className={styles.row}>
                        <div>SGST (2.5%)</div>
                        <div> ₹ {((data.rideCharges / 100) * 2.5).toFixed(2)}</div>
                    </div>
                    <div className={styles.row}>
                        <div>IGST (0%)</div>
                        <div>₹ 0.00</div>
                    </div>
                    <div className={`${styles.row} ${styles.ridecrgcnt}`}>
                        <div className={`${styles.col} ${styles.billRideCharges}`}>
                            <div>Ride Charge</div>
                            <div>(Inclusive of Taxes)</div>
                        </div>
                        <div className={styles.ridecrg}> ₹ {(data.rideCharges).toFixed(2)}</div>
                    </div>
                    <div className={styles.tax1decl}>
                        This document is issued by Transport Service Provider and not by Roppen{" "}
                        <br />
                        Transportation Services Private Limited (Rapido). Rapido acts only as an{" "}
                        <br />
                        Electronic Commerce Operator for the transportation services.
                    </div>
                </div>
            </div>
        </>
    );
}

export default RideTax;
