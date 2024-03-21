import React from "react"
import PaymentSummary from "./PaymentSummary"
import TaxInvoice1 from "./TaxInvoice1"

export default function RapidoInvoice(){
    return (
        <React.Fragment>
            <PaymentSummary/>
            <TaxInvoice1/>
        </React.Fragment>
    )
}