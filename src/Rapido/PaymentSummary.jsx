import '../CSS/rapido_invoice.css'
export default function PaymentSummary() {
    const data = JSON.parse(localStorage.rapido)
    return (
        <div className='main'>

            <div className="row header">
                <div><h3>Payment Summary</h3></div>
                <div><img src="logo.jpg" alt="" /></div>
            </div>

            <div className="column rideid">
                <div className="row">
                    <div>Ride ID</div>
                    <div>{data.rideId}</div>
                </div>
                <div className="row">
                    <div>Time of Ride</div>
                    <div>{data.date}</div>
                </div>
            </div>

            <div className="total">
                <div className="column">
                    <div className="vericalItem">Total</div>
                    <div className="vericalItem">₹{(Math.round((data.rideCharges+data.bookingFee)*100)/100).toFixed(2)}</div>
                </div>
            </div>

            <div className="row addrmap" >
                <div className="column map">
                    <img src="error.svg" alt="" className="error" />
                    <p>This site can't load google Maps Correctly.</p>
                    <p>g.co/staticmaperror/signature</p>
                </div>
                <div className="info">
                    <div className="column distance">
                        <div className="vericalItem">{data.distance} kms</div>
                        <div className="vericalItem">Distance</div>
                    </div>
                    <div className="distancegap"/>
                    <div className="column duration">
                        <div className="vericalItem">{data.duration}mins</div>
                        <div className="vericalItem">Duration</div>
                    </div>
                </div>
            </div>

            <div className="column addressdetails">
                <div className="row pickup">
                    <div className="dot" />
                    <div>{data.pickup}</div>
                </div>
                <div className="gap" />
                <div className="row drop">
                    <div className="dot" />
                    <div>{data.drop}</div>
                </div>
            </div>


            <div className="billdetails">
                <h3 className="billHeading">Bill Details</h3>
                <div className="column charges">
                    <div className="row">
                        <div>Ride Charge</div>
                        <div>₹ {Math.round((data.rideCharges)*100/100).toFixed(2)}</div>
                    </div>
                    <div className="row">
                        <div>Booking fees & Convenience Charges</div>
                        <div>₹ {Math.round((data.bookingFee)*100/100).toFixed(2)}</div>
                    </div>
                </div>
                
                <div className="row billtotal ">
                    <div className="column">
                        <div>Total Amount</div>
                        <div>(inclusive of taxes)</div>
                        
                    </div>
                    <div>₹{(Math.round((data.rideCharges+data.bookingFee)*100)/100).toFixed(2)}</div>
                </div>
            </div>

            <div className="paymentmethod row">
                <div className="column">
                    <div>You paid using</div>
                    <div>cash</div>{}
                </div>
                <div className='pmtotal'>₹{(Math.round((data.rideCharges+data.bookingFee)*100)/100).toFixed(2)}</div>
            </div>
        </div>
    )
}