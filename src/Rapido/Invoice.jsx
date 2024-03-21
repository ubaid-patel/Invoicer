import React from "react"
import PaymentSummary from "./PaymentSummary"
import TaxInvoice1 from "./TaxInvoice1"
import TaxInvoice2 from "./taxInvoice2"

export default function RapidoInvoice(){
    return (
        <React.Fragment>
            <PaymentSummary/>
            <TaxInvoice1/>
            <TaxInvoice2/>
        </React.Fragment>
    )
}