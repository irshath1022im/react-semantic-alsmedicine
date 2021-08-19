import React from 'react'

export default function ReceivingLog({log}) {
    return (
        <>
              <tr>
                <td >{log.item_name}</td>
                <td>{log.batch_number}</td>
                <td>{log.po}</td>
                <td>{log.invoice_no}</td>
                <td>{log.delivery_note}</td>
                <td>{log.qty}</td>
                <td>{log.unit_price}</td>
                <td>{log.cost}</td>
            </tr>
        </>
    )
}
