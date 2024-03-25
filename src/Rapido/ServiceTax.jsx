import React from "react";
import styles from '../CSS/serviceTax.module.css'; // Import CSS module
import { useSelector } from "react-redux";

function generateQRUrl(info) {
    const data = encodeURIComponent(`Name of the supplier: Roppen Transportation Private Limited,
GST Number: 29AAHCR1710J1ZC,
Bank Account details: 10068403940,
IFSC: IDFB0080157,
Invoice number: ${info.invoiceId},
Invoice Date: ${info.date},
InvoiceAmount: ${info.bookingFee},
CGST: ${(info.bookingFee / 100) * 9},
SGST: ${(info.bookingFee / 100) * 9},
IGST: 0.00,
UPI ID: RAPIDO.06@CMSIDFC`);

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=1005x1005&data=${data}`;
    return (qrUrl);
}

export default function ServiceTax() {
    const data = useSelector((state)=>state.data.data);
    return (
        <React.Fragment>
            <div className={`${styles.header} ${styles.row} ${styles.inv2}`}>
                <div className={`${styles.col} ${styles.txinv}`}>
                    <h2>Tax Invoice</h2>
                    <span>{data.rideId}</span>
                </div>
                <div>
                    <img src="logo.jpg" alt="" />
                </div>
            </div>

            <div className={styles.info}>
                <div className={`${styles.qrdetails} ${styles.row}`}>
                    <div className={styles.details}>
                        <h3 className={styles.txinv2coname}>Roppen Transportation Private Limited</h3>
                        <p>80/1,81/1,81/2, Green Glen <br />
                           Layout, Salarpuria Softzone,<br />
                            Bellandur Village, Varthur<br />
                            Hobli, Bangalore South<br />
                            Taluk, Bangalore, Karnataka,<br />
                            560103
                        </p>
                    </div>
                    <div className={styles.qrcode}>
                        <img src={generateQRUrl(data)} alt="" />
                    </div>
                </div>
                <div className={styles.custdetails}>
                    <h3>{data.name}</h3>
                    <p>
                        {data.pickup}
                    </p>
                </div>
                <div className={styles.row}>
                    <div>Invoice No.</div>
                    <div>{data.invoiceId}</div>
                </div>
                <div className={styles.row}>
                    <div>Invoice Date</div>
                    <div>{data.date}</div>
                </div>
                <div className={styles.row}>
                    <div>Tax Category</div>
                    <div>Other services n.e.c.(999799)</div>
                </div>
                <div className={styles.row}>
                    <div>Place of Supply</div>
                    <div>Karnataka</div>
                </div>
                <div className={styles.row}>
                    <div>GST</div>
                    <div>29AAHCR1710J1ZC</div>
                </div>
            </div>
            <div className={styles.billDtails}>
                <h2>Bill Details</h2>
                <div className={styles.row}>
                    <div>Booking Fee</div>
                    <div>₹ 1.00</div>
                </div>
                <div className={styles.row}>
                    <div>Convenience Charges</div>
                    <div>₹ {(data.bookingFee).toFixed(2)}</div>
                </div>
                <div className={`${styles.row} ${styles.subttlr}`}>
                    <div><h3 className={styles.sbttl}>Sub total</h3></div>
                    <div className={styles.sbttl}>₹ {(data.bookingFee + 1).toFixed(2)}</div>
                </div>
                <div className={styles.row}>
                    <div>CGST (9%)</div>
                    <div> ₹ {(data.bookingFee + 1 * 0.09).toFixed(2)}</div>
                </div>
                <div className={styles.row}>
                    <div>SGST (9%)</div>
                    <div> ₹ {(data.bookingFee + 1 * 0.09).toFixed(2)}</div>
                </div>
                <div className={styles.row}>
                    <div>IGST (0%)</div>
                    <div>₹ 0.00</div>
                </div>
                <div className={`${styles.row} ${styles.fnlamt}`}>
                    <div className={`${styles.col} ${styles.billRideCharges}`}>
                        <div>Final Amount</div>
                        <div>(Inclusive of Taxes)</div>
                    </div>
                    <div className={`${styles.ridecrg} ${styles.ridecrg2}`}> ₹ {(data.bookingFee + 1 + (data.bookingFee + 1) * 0.18).toFixed(2)}</div>
                </div>
                <div className={styles.tax1decl}>
                    This is a system generated invoice and hence no signature required
                </div>
                <div className={styles.greetings}>
                    Thank you {data.name}
                </div>
            </div>
        </React.Fragment>
    );
}
