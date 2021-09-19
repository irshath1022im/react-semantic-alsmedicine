import React, { useEffect, useState } from 'react'
import { Button, Container, Icon, Image, Label, Message, Segment, SegmentGroup, Table} from 'semantic-ui-react'
import ItemLogsModal from '../../Components/Item/ItemLogsModa'

export default function ShowItem(props) {
    
  

    const [item, setItem] = useState({})
    const [noItem, setNoItem] = useState(false)
    
useEffect(() => {
        
        // console.log('useeffect')

        if(!props.location.state) {
            setNoItem(true)
        } else {
            
            setItem(props.location.state)
        }
   
}, [])


    return (
        <div>
            <SegmentGroup>

                {
                    !noItem ? 
                   <> 
                    
                        <Segment>
                            <Container>
                                <h4>{item.item_name} 
                                    <Label 
                                        color="red" 
                                        content={`ERP Code: ${item.erp_code} `}
                                        // corner="left"
                                        // attached="left"
                                        pointing="left"
                                        tag={true}
                                     
                                    
                                    /></h4>
                                <Image src={`/cover_photos/itemCoverPhotos/medicine.jpg`} />

                                <Segment>
                                    <h4>Batches <Icon name="add" circular color="brown"></Icon></h4>

                                    <Table unstackable>
                                     
                                            <Table.Header>
                                                <Table.Row>                                            
                                                    <Table.HeaderCell>#</Table.HeaderCell>
                                                    <Table.HeaderCell>Batch Number</Table.HeaderCell>
                                                    <Table.HeaderCell>Expiry Date</Table.HeaderCell>
                                                    <Table.HeaderCell>In Stock</Table.HeaderCell>
                                                    <Table.HeaderCell></Table.HeaderCell>
                                                </Table.Row>                                     
                                            </Table.Header>

                   {    
                   
                    item.batch_numbers &&
                         item.batch_numbers.length > 0 ?
                                item.batch_numbers.map( (item,key)=>{
                                    return(
                                        <Table.Body>
                                            <Table.Row>
                                                <Table.Cell>{key +1}</Table.Cell>
                                                <Table.Cell>{item.batch_number}</Table.Cell>
                                                <Table.Cell>{item.expiry_date}</Table.Cell>
                                                <Table.Cell>{item.inStock}</Table.Cell>
                                                <Table.Cell>
                                                    <ItemLogsModal batch_number_id={item.batch_number_id} />
                                                </Table.Cell>
                                            </Table.Row>
                                        </Table.Body>
                                          )
                                    })                     
                                           
                                :
                                            <Table.Body>
                                                <Table.Row>                                                  
                                                    <Message info>
                                                        Sorry!  No Batches Found
                                                    </Message>
                                                </Table.Row>                                              
                                            </Table.Body>

                    } 

                                      
                                    </Table>

                                </Segment>
                            </Container>
                        </Segment>
                    </>

                :
                <Segment>
                    <Message info>Sorry!, No Item Found</Message>
                </Segment>

                }

            </SegmentGroup>
        </div>
    )
}
