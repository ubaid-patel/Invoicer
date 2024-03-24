import React from "react";
import styles from '../CSS/app.module.css'; // Import CSS module
import PaymentSummary from "./PaymentSummary";
import TaxInvoice1 from "./TaxInvoice1";
import TaxInvoice2 from "./taxInvoice2";
import Map from './Map';

function copyText() {
    const data = JSON.parse(localStorage.rapido);
    let text = `invoicefile${data.rideId}`;
    // Attempt to copy using the Clipboard API
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text)
            .then(() => {
                const btn = document.getElementById("printbtn");
                btn.style.display = "none";
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    } else {
        // Fallback for browsers/devices that don't support Clipboard API
        var textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed'; // Avoid scrolling to bottom
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'Text copied!' : 'Unable to copy text!';
        } catch (err) {
            console.error('Could not copy text: ', err);
        }
        document.body.removeChild(textarea);
    }
}

export default function RapidoInvoice() {
    window.onbeforeprint = copyText;
    return (
        <React.Fragment>
            <PaymentSummary />
            <div className={styles['page-break']}></div>
            <TaxInvoice1 />
            <div className={styles['page-break']}></div>
            <TaxInvoice2 />
            <button id="printbtn" className={styles.printbtn} onClick={() => { new Promise((resolve, reject) => { copyText(); setTimeout(() => { resolve() }, 500); }).then(() => { window.print() }) }}>
                Print
            </button>
            <Map />
        </React.Fragment>
    );
}
