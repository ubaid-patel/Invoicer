import React from "react";
import './taxInvoice2.css'

function generateQRUrl() {
    const info = JSON.parse(localStorage.rapido)
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
    return (qrUrl)
}

export default function TaxInvoice2() {
    const data = JSON.parse(localStorage.rapido)
    return (
        <React.Fragment>
            <div className="header row inv2">
                <div className="col txinv">
                    <h2>Tax Invoice</h2>
                    <span>{data.rideId}</span>
                </div>
                <div>
                    <img src="logo.jpg" alt="" />
                </div>
            </div>

            <div className="info col">
                <div className="qrdetails row">
                    <div className="details">
                        <h3>Roppen Transportation Private Limited</h3>
                        <p>80/1,81/1,81/2, Green Glen <br />
                           Layout, Salarpuria Softzone,<br />
                            Bellandur Village, Varthur<br />
                            Hobli, Bangalore South<br />
                            Taluk, Bangalore, Karnataka,<br />
                            560103
                        </p>
                    </div>
                    <div className="qrcode">
                        <img src={generateQRUrl()} alt="" />
                    </div>
                </div>
                <div className="custdetails">
                    <h3>{data.name}</h3>
                    <p>
                        {data.pickup}
                    </p>
                </div>
                <div className="row">
                    <div>Invoice No.</div>
                    <div>{data.invoiceId}</div>
                </div>
                <div className="row">
                    <div>Invoice Date</div>
                    <div>{data.date}</div>
                </div>
                <div className="row">
                    <div>Tax Category</div>
                    <div>Other services n.e.c.(999799)</div>
                </div>
                <div className="row">
                    <div>Place of Supply</div>
                    <div>Karnataka</div>
                </div>
                <div className="row">
                    <div>GST</div>
                    <div>29AAHCR1710J1ZC</div>
                </div>
            </div>
            <div className="billDtails">
                <h2>Bill Details</h2>
                <div className="row">
                    <div>Booking Fee</div>
                    <div>₹ 1.00</div>
                </div>
                <div className="row">
                    <div>Convenience Charges</div>
                    <div>₹ {(data.bookingFee).toFixed(2)}</div>
                </div>
                <div className="row subttlr">
                    <div><h3 className="sbttl">Sub total</h3></div>
                    <div className="sbttl">₹ {(data.bookingFee + 1).toFixed(2)}</div>
                </div>
                <div className="row">
                    <div>CGST (9%)</div>
                    <div> ₹ {(data.bookingFee + 1 * 0.09).toFixed(2)}</div>
                </div>
                <div className="row">
                    <div>SGST (9%)</div>
                    <div> ₹ {(data.bookingFee + 1 * 0.09).toFixed(2)}</div>
                </div>
                <div className="row">
                    <div>IGST (0%)</div>
                    <div>₹ 0.00</div>
                </div>
                <div className="row fnlamt">
                    <div className="col billRideCharges">
                        <div>Final Amount</div>
                        <div>(Inclusive of Taxes)</div>
                    </div>
                    <div className="ridecrg ridecrg2"> ₹ {(data.bookingFee + 1 + (data.bookingFee + 1) * 0.18).toFixed(2)}</div>
                </div>
                <div className="tax1decl">
                    This is a system generated invoice and hence no signature required
                </div>
                <div className="greetings">
                    Thank you {data.name}
                </div>
            </div>
        </React.Fragment>
    )
}
