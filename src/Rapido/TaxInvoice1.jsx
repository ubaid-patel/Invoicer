import './taxinvoice1.css'
function TaxInvoice1() {
    const data = JSON.parse(localStorage.rapido)
    return (<>
        <div className="main">
            <div className="header row">
                <div className="col txinv">
                    <h2>Tax Invoice</h2>
                    <span>{data.rideId}</span>
                </div>
                <div>
                    <img src="logo.jpg" alt="" />
                </div>
            </div>

            <div className="info col">
                <div className="row">
                    <div>Invoice No.</div>
                    <div>{data.invoiceId}</div>
                </div>
                <div className="row">
                    <div>Invoice Date</div>
                    <div>{data.date}</div>
                </div>
                <div className="row">
                    <div>State</div>
                    <div>Karnataka</div>
                </div>
                <div className="row">
                    <div className='column'>
                        <div>Tax Category</div>
                        <div className="txcatbrdr"><div/></div>
                    </div>
                    <div>Other local transportation services of <br /> passengers n.e.c. (996419){" "}</div>
                </div>
                <div className="row">
                    <div>Place of Supply</div>
                    <div>Karnataka</div>
                </div>
                <div className="row">
                    <div>GST Number</div>
                    <div>29AAHCR1710J1ZC</div>
                </div>
                <div className="row">
                    <div>Captain Name</div>
                    <div>{data.rider}</div>
                </div>
                <div className="row">
                    <div>Vehicle Number</div>
                    <div>{data.vehicleNumber}</div>
                </div>
                <div className="row custnm">
                    <div className="col">
                        <div>Customer Name</div>
                        <div className="inv1pickup">
                            <div>Customer Pick Up Address</div>
                            <div>{data.pickup}</div>
                        </div>
                    </div>
                    <div>{data.name}</div>
                </div>
            </div>

            <div className="billDtails">
                <h2>Bill Details</h2>
                <div className="row">
                    <div>Captain Fee</div>
                    <div>₹ {((data.rideCharges / 100) * 95).toFixed(2)}</div>
                </div>
                <div className="row">
                    <div>CGST (2.5%)</div>
                    <div> ₹ {((data.rideCharges / 100) * 2.5).toFixed(2)}</div>
                </div>
                <div className="row">
                    <div>SGST (2.5%)</div>
                    <div> ₹ {((data.rideCharges / 100) * 2.5).toFixed(2)}</div>
                </div>
                <div className="row">
                    <div>IGST (0%)</div>
                    <div>₹ 0.00</div>
                </div>
                <div className="row ridecrg">
                    <div className="col billRideCharges">
                        <div>Ride Charge</div>
                        <div>(Inclusive of Taxes)</div>
                    </div>
                    <div className='ridecrg'> ₹ {(data.rideCharges).toFixed(2)}</div>
                </div>
                <div className="tax1decl">
                    This document is issued by Transport Service Provider and not by Roppen{" "}
                    <br />
                    Transportation Services Private Limited (Rapido). Rapido acts only as an{" "}
                    <br />
                    Electronic Commerce Operator for the transportation services.
                </div>
            </div>
        </div>
    </>
    )
}

export default TaxInvoice1