
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Form, Input, Label, Message } from 'semantic-ui-react'
import SearchItem from '../Shared/SearchItem'

export default function CreateConsumption(props) {

    const [consumptionDate, setConsumptionDate] = useState()
    const [selectedLocation, setSelectedLocation] = useState('')
    const [qty, setQty] = useState(0)
    const [locations, setLocations] = useState([])
    const [locationError, setLocationError] = useState('')
    const [isFormLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState('')
    const [formSuccess, setFormSuccess] = useState('')
    const [qtyError, setQtyError] = useState('')
    const [searchBar, setSearchBar] = useState(false)
    const [item_id, setItem_id] = useState('')
    const [option_batch_numbers, setOptionBatchNumbers] = useState([])  //for form select option 
    const [batch_number_id, setBatch_number_id] = useState('')
    const [item_name, setItemName] = useState('')
    const [inStock, setInStock] = useState(0)
    const [selectedBatchNumberId, setSelectedBatchNumberId] = useState([])
    const [selectedItem, setSelectedItem] = useState({})   // this should be updated by api request and props from itemcard
   




const getLocation = async()=>{
    try {
        
        let result = await axios.get(`${process.env.REACT_APP_API_SERVER}/locations`)
        let response = await result.data

        let locations=[{key:0,value:0, text:'select'}]
            
            response.forEach((element,key) => {
                locations.push(
                        {
                         key: key+1,
                         value: element.id,
                         text:  element.location
                        })
                
            });

        setLocations(locations)
    } catch (error) {
        
    }
}

useEffect( ()=>{

    getLocation()

    if(props.location.state){
        const {id,item_name,batch_numbers} = props.location.state.item
        const {selectedBatchNumberId,inStock} = props.location.state

        let batchNumberOptions=[{key:0,value:0, text:'select'}]
            
        batch_numbers.forEach((element,key) => {
            batchNumberOptions.push(
                    {
                     key: key+1,
                     value: element.batch_number_id,
                     text:  element.batch_number
                    })
            
        });

        setOptionBatchNumbers(batchNumberOptions)
        setItem_id(id)
        setBatch_number_id(selectedBatchNumberId)
        setItemName(item_name)
        setInStock(inStock)
        setSelectedItem(props.location.state.item)

    }

},[])


const handleBatchNumberSelection = (e) =>{


    setBatch_number_id(e.value)

    //get the inStock value from previous api request and update the value inStock

    if(e.value !== 0) {

        let selectedBatchNumberInStock = selectedItem.batch_numbers.filter( item => {
            return item.batch_number_id === e.value
        })

    setInStock(selectedBatchNumberInStock[0].inStock)

    } else {
        setInStock(0)
    }

}


const formHandle = (e,data)=>{
    // console.log(data)
    setFormLoading(true)


//   console.log(inStock)

    if( !qty ||qty > inStock || qty <= 0){
       setQtyError('Qty is more then available stock!')
       setFormLoading(false)
    } else if(!selectedLocation || selectedLocation == 0 ) {
        setLocationError('Location is required!')
        setFormLoading(false)
    }else {
        setQtyError('')
        setLocationError('')
        setFormLoading(true)

            let data = {
                    date : consumptionDate,
                    location_id : selectedLocation,
                    item_id : item_id,
                    batch_number_id : batch_number_id,
                    qty: qty,
                    user_id:1
            }

         sendFormValuesToDb(data)
    }
   


}

const sendFormValuesToDb = async(values) =>{

    try {
        let url = `${process.env.REACT_APP_API_SERVER}/consumption`;
        const result = await axios.post(url, values)
        
        const response = await result
    
        // console.log(response)
        if(response.status === 201) {
        
            setFormLoading(false)
            ClearForm()
            setFormError('')
            setFormSuccess('Request is added!!') 

            setTimeout(() => {
                setFormSuccess('') 
            }, 3000);
        }
    } catch (error) {
        console.log(error)
        if(error.response.status === 422) {
            setFormLoading(false)
            setFormError(error.response.data.message)
            setFormSuccess('')
        }

    }


}

const ClearForm = ()=>{
    setConsumptionDate('')
    setSelectedLocation('')
    setQty('')
    setInStock(0)
    setItemName('')
    setBatch_number_id(0)
    setItem_id('')
}

const onSearchResultSelect = async (values) =>{
    // console.log(value)
    ClearForm()
    try {
        let url = `${process.env.REACT_APP_API_SERVER}/items/${values.id}`
        const result = await axios.get(url)
        const response = await result.data
    
        console.log(response)
        const {id, item_name, batch_numbers} = response.data

        setItem_id(id)
        setItemName(item_name)
        setSelectedItem(response.data)

        if(batch_numbers.length > 0) {

            let batchNumberOptions=[{key:0,value:0, text:'select'}]
            
            batch_numbers.forEach((element,key) => {
                batchNumberOptions.push(
                        {
                         key: key+1,
                         value: element.batch_number_id,
                         text:  element.batch_number
                        })
                
            });

            setOptionBatchNumbers(batchNumberOptions)
           
        }


    } catch (error) {
        
    }

}


return (

      

        <Container>
            <h5>Create Consumption</h5>
            <hr/>

            {
                searchBar &&
                <>
                <SearchItem 
                    onSearchResultSelect={onSearchResultSelect}  
                />
                <hr />
                </>
            }

            <Button
                onClick={ ()=>setSearchBar(!searchBar)}
            >Search Item</Button>
            
            <Form
                error={!!formError}
                success={!!formSuccess}
                loading={isFormLoading}
                onSubmit={formHandle}
            >

            <Form.Group>

                <Form.Field 
                    control={Input}
                    label="Item"
                    value={item_name}
                    required
                />

                    <Form.Select
                            label="Batch Numbers"
                            options={option_batch_numbers}
                            required
                            onChange={ (action, e)=> handleBatchNumberSelection(e)}
                            value={batch_number_id}
                    />

                    <Label basic color={inStock >= 1 ? 'green' : 'red'}>Available Pcs : <br/><span>{inStock}</span></Label>


            </Form.Group>



                  {
                      item_id !== '' ?


                        batch_number_id !== 0  ?
                        
                                inStock >= 1 ?
                                
                            

                                        <Form.Group>

                                            
                                                <Form.Field
                                                    control={Input}
                                                    type="date"
                                                    label="Date"
                                                    required
                                                    onChange={ (action,e)=>setConsumptionDate(e.value)}
                                                    value={consumptionDate}
                                                />
                                                
                                    
                                                    <Form.Select
                                                            label="Used Location"
                                                            options={locations}
                                                            required
                                                            onChange={ (action, e)=>setSelectedLocation(e.value)}
                                                            error={!!locationError}
                                                            value={selectedLocation}
                                                    />

                                                    

                                                    <Form.Field 
                                                        control={Input}
                                                        label="Qty"
                                                        placeholder="Qty"
                                                        type={"Number"}
                                                        required
                                                        onChange={ (action, e)=>setQty( e.value)}
                                                        // error={!!qtyError}
                                                        value={qty}
                                                        error={ !!qtyError && {content: qtyError , pointing: 'below'} }                    
                                                    
                                                    />

                                        </Form.Group>
                                :

                                    <Message info color="red"> Sorry!, No Quantity is available for selected Items</Message>

                            :

                            <Message info color="red"> Select the Batch Number!!!</Message>



                        :
                        <Message info color="red"> Item not selected!!!</Message>

                  }

                <Message
                    error
                    header='Action Forbidden'
                    content={formError}
                />

                
                
                <Message success>
                    <Message.Header>Success !</Message.Header>
                    <p><Link to="/">Return Home</Link></p>
                </Message>
                  
            
               
                <Button type='submit' disabled={inStock <= 0}>Submit</Button>

            </Form>
        </Container>
        

       
    )
}
