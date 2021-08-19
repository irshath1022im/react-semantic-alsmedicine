
import React from 'react'

export default function ConsumptionLog(props) {
    const {date,item_name,batch_number,qty,location,user} = props.log
    return (
        <>
            <tr>
                <td >{date}</td>
                <td >{item_name}</td>
                <td>{batch_number}</td>
                <td>{qty}</td>
                <td>{location}</td>
                <td>{user}</td>
            </tr>
        </>
    )
}
