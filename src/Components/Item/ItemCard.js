import React, { useState } from 'react'
import { withRouter } from 'react-router-dom';
import {  Button, Card,  Icon,  Image, Label, Popup} from 'semantic-ui-react';
import ItemLogsModal from './ItemLogsModa';


function ItemCard(props) {
    const {item_name,stocks} = props.item



    return (
        <Card centered>
         
            <Image src={`/cover_photos/itemCoverPhotos/medicine.jpg`}
                />
            <Card.Content>
        
            <Card.Header><span style={{ textTransform: 'uppercase'}}>{item_name}</span></Card.Header>

                {
                    stocks.length > 0 ?

                        stocks.map( (stock,key)=>{
                            return(

                                        <div key={key}>
                                            <Label as='a' color={`${key === 0 ? 'green' : 'orange'}`} ribbon>
                                                    {stock.batch_number}  /
                                                <Label circular color="red">{stock.inStock}pcs</Label>
                                                <Label circular color="red" >{stock.expiry_date}</Label>

                                                <ItemLogsModal batch_number_id={stock.batch_number_id}  />


                                             
                                                    <Button size="small" onClick={ ()=> props.history.push('/consumption/create', {...stock})}><Icon name="cart" color="red" /></Button>

                                                
                                            </Label>
                                        </div>

                            )
                        })
                
                                

                    :

                    <div>

                            <Label as='a' color="orange" ribbon> No Stock
                        </Label>
                    </div>

                }
                
                    
              <Card.Description extras="true">

                 
                    {/* <Label 
                        as="a" 
                        color="teal" 
                        
                        onClick={()=>props.history.push('/items/10')}
                        >Logs
                    </Label> */}

                    
        
                    
              </Card.Description>


            </Card.Content>

        </Card>
    )
}


export default withRouter(ItemCard)