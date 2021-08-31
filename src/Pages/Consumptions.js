import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Container, Segment,Grid, Message, Icon, Button, ButtonGroup } from 'semantic-ui-react'
import ConsumptionLog2 from '../Components/Consumption/ConsumptionLog2'
import SearchItem from '../Components/Shared/SearchItem'

export default function Consumptions() {

    const [consumptions, setConsumptions] = useState([])
    const [links, setLinks] = useState({
        first: null,
        last: null,
        next:null,
        prev:null

    })
    const [path, setPath] = useState(null)

    const [requestLoading, setrequestLoading] = useState(false)

useEffect(() => {
    let url = `${process.env.REACT_APP_API_SERVER}/consumption`
    getConsumptions(url)
   
}, [])

const getConsumptions = async (url)=>{

    setrequestLoading(true)


    try {
      
        const result = await axios.get(url)
        const response = await result.data

            
            setConsumptions(response.data)
            setLinks(response.links)
            setrequestLoading(false)
            setPath(response.meta.path)

       
    } catch (error) {
        
    }
}

const onSearchResultSelect = (searchResult) =>{

    // console.log(details)
    let url = `${process.env.REACT_APP_API_SERVER}/consumption?item_id=${searchResult.id}`
     getConsumptions(url)
}



    return (
                <Container>


                    <Segment.Group>


                         <Segment>
                             {/* <Input icon="search" fluid placeholder="Search By BatchNumber / Items" focus /> */}
                        {/* this need to be send updateSearchResult  */}
                              
                             <SearchItem 
                                onSearchResultSelect={ onSearchResultSelect} 
                                resetSearchValue={()=>getConsumptions(path)}
                                
                            />
                         </Segment>

                        {
                            requestLoading ?

                                <Segment>
                                    <Message info>
                                    <Icon name='circle notched' loading />
                                    <Message.Content>
                                    <Message.Header>Just one second</Message.Header>
                                        We are fetching that content for you.
                                    </Message.Content>
                                    </Message>
                                </Segment>


                        :

                        
                     
                            consumptions.length > 0 ?
                                <Segment color='purple' padded >
                                    <Grid divided columns={6}>
                                  
                                        <Grid.Row color="teal">

                                            <Grid.Column >Date</Grid.Column>
                                            <Grid.Column >Items</Grid.Column>
                                            <Grid.Column >ERP#</Grid.Column>
                                            <Grid.Column >BNumber</Grid.Column>
                                            <Grid.Column >Location</Grid.Column>
                                            <Grid.Column >Qty</Grid.Column>
                                        </Grid.Row>

                                     
                                        {
                                                    consumptions.map( (item,key) => {
                                                        return(
                                                     

                                                            <ConsumptionLog2 log={item} key={key}/>
                                                                                                                                              
                                                    
                                                        )
                                                    })
                                        }
                                       

                                 </Grid>
                                 </Segment>
                            :

                            <Segment>
                                <Message warning>
                                <Message.Content>
                                    <Message.Header>Sorry!, No Consumption has found for this item</Message.Header>
                                </Message.Content>
                            </Message>
                        </Segment>


                        }

                        <Segment color='grey'>
                            <ButtonGroup>
                                <Button 
                                     basic color='brown'
                                    onClick={ ()=> getConsumptions(links.prev)}
                                    disabled={ !links.prev }
                                    
                                >
                                    Load Prev
                                </Button>

                                <Button 
                                    basic color='violet'
                                    onClick={ ()=> getConsumptions(links.next)}
                                    disabled={!links.next}
                                >
                                    Load More
                                </Button>
                            </ButtonGroup>
                        </Segment>
                        
                        </Segment.Group>
                        
                </Container>
    )
}
