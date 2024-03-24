import React from "react";
import styles from '../CSS/app.module.css'; // Import CSS module
import Summary from "./Summary";
import RideTax from "./RideTax";
import Map from './Map';
import ServiceTax from "./ServiceTax";
import { useSelector, useDispatch } from 'react-redux'

function copyText(data) {
    
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
    const data = useSelector((state)=>state.data.data);
    console.log(data)
    window.onbeforeprint = ()=>{copyText(data)};
    return (
        <React.Fragment>
            <Summary/>
            <div className={styles['page-break']}></div>
            <RideTax />
            <div className={styles['page-break']}></div>
            <ServiceTax />
            <button id="printbtn" className={styles.printbtn} onClick={() => { new Promise((resolve, reject) => { copyText(data); setTimeout(() => { resolve() }, 500); }).then(() => { window.print() }) }}>
                Print
            </button>
        </React.Fragment>
    );
}
