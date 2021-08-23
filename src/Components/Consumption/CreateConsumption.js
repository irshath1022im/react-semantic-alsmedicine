
import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { Link } from 'react-router-dom'
import { Button, Container, Form, Input, Label, Message } from 'semantic-ui-react'

export default function CreateConsumption(props) {

    const [consumptionDate, setConsumptionDate] = useState()
    const [selectedLocation, setSelectedLocation] = useState('')
    const [qty, setQty] = useState('')
    const [locations, setLocations] = useState([])
    const [locationError, setLocationError] = useState('')
    const [isFormLoading, setFormLoading] = useState(false)
    const [formError, setFormError] = useState('')
    const [formSuccess, setFormSuccess] = useState('')
    const [qtyError, setQtyError] = useState('')
   




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

},[])


const formHandle = (e,data)=>{
    // console.log(data)
    setFormLoading(true)

    const {inStock, batch_number_id,item_id} = props.location.state

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
}

    return (

      

        <Container>
            <h5>Create Consumption</h5>
            <hr/>
            <Form
                error={!!formError}
                success={!!formSuccess}
                loading={isFormLoading}
                onSubmit={formHandle}
            >
                <Form.Field>
                    <Label>Date</Label>
                    <Form.Input 
                        placeholder="date" type="date" 
                        onChange={ (action,e)=>setConsumptionDate(e.value)}
                        // required
                        value={consumptionDate}
                     
                        // error={{ content: 'Please enter your first name', pointing: 'below' }}
                        />
                </Form.Field>


                <Form.Group>
    
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

                <Message
                    error
                    header='Action Forbidden'
                    content={formError}
                />

                
                
                <Message success>
                    <Message.Header>Success !</Message.Header>
                    <p><Link to="/">Return Home</Link></p>
                </Message>
                  
            
               
                <Button type='submit'>Submit</Button>

            </Form>
        </Container>
        

       
    )
}
