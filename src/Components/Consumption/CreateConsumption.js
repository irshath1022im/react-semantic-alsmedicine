
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Container, Form, Input, Label, Select } from 'semantic-ui-react'

export default function CreateConsumption() {

    const [formValues, setFomrValues] = useState({})
    const [locations, setLocations] = useState([])


const getLocation = async()=>{
    try {
        
        let result = await axios.get(`${process.env.REACT_APP_API_SERVER}/locations`)
        let response = await result.data

        setLocations(response)
    } catch (error) {
        
    }
}

useEffect( ()=>{

    getLocation()

},[])

    return (
        <Container>
            Consumption
            <Form>
                <Form.Field>
                    <Label>Date</Label>
                    <Form.Input 
                        placeholder="date" type="date" onChange={ (e)=>setFomrValues({date: e.target.value})}
                        />
                </Form.Field>

                {/* <Form.Group>
                    <Form.Field>
                        <Label>Item Name</Label>
                        <Form.Input type="text" placeholder="item name" />
                    </Form.Field>
                    <Form.Field>
                        <Label>Batch Number</Label>
                        <Form.Input type="text" placeholder="Batch Number" />
                    </Form.Field>
                </Form.Group> */}

                <Form.Group>
                    {/* <Form.Field 
                        control={Select}
                        label="Location"
                        options={locations}
                        placeholder="Locations"
                    /> */}

                    <Form.Select
                        
                    />

                    

                    <Form.Field 
                        control={Input}
                        label="Qty"
                        placeholder="Qty"
                        type={"Number"}
                        required
                    />
                </Form.Group>

                <Button type='submit'>Submit</Button>

            </Form>
        </Container>
    )
}
