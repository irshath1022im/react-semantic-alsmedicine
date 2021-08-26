import React from 'react'
import { Grid } from 'semantic-ui-react'

export default function ConsumptionLog2({log}) {
    const {date,item_name,batch_number,qty,location} = log
    return (
        
        
       
            <Grid.Row style={{ backgroundColor: '#F0F8FF'}} className="ui message">
                 
                                <Grid.Column >{date}</Grid.Column>
                                <Grid.Column >{item_name}</Grid.Column>
                                <Grid.Column >{batch_number}</Grid.Column>
                                <Grid.Column >{location}</Grid.Column>
                                <Grid.Column >{qty}</Grid.Column>
            </Grid.Row>
     

         
                               
      
    )
}
