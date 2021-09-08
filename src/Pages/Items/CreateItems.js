import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Button, Container, Dimmer, Dropdown, Form, Loader, Segment, SegmentGroup } from 'semantic-ui-react'

function CreateItems(props) {

        const [categories, setCategory] = useState([])

        const [itemName, setItemName] = useState('')
        const [erpCode, setErpCode] = useState('')
        const [barCode, setBarCode] = useState('')
        const [remark, setRemark] = useState('')
        const [dimmerActive, setDimmerActive] = useState(false)
        const [selectedCategory, setselectedCategory] = useState(0)

        const loginStatus = useSelector(state => state.Authentication.loggedIn)
        const categoryStore  = useSelector(state => state.categories)


useEffect( () => {
    // console.log(props)
    // props.dispatch( () =>{
    //     type: 'CHECK_AUTH_STATUS'
    // })
//    props.dispatch( { type: 'Logg_REQUEST'})

    if(!loginStatus)
    {
        props.history.push('/login')
    }

}, [loginStatus])


useEffect(() => {
    
    let category=[{key:0, value:0, text:"Select" }]
    categoryStore.forEach((el,key) => {
       category.push({key: key+1, value:el.id, text:el.category })
    });

    setCategory(category)
   
}, [])

const formHandle = () => {
   
    setDimmerActive(true)

    setTimeout( ()=>{ setDimmerActive(false)}, 500)

}
        return (
                    <Container>
                       <SegmentGroup>
            
                           <Segment>
                           <h4>Create New Item</h4>
            
                           </Segment>

                           <Dimmer active={dimmerActive} inverted>
                                <Loader size="mini">Loading</Loader>
                            </Dimmer>
                            
                            
                                <Segment> 
                                        <Form onSubmit={formHandle}>
                                            <Form.Group widths='equal'>
                                                <Form.Input
                                                    label="Item Name"
                                                    type="text"
                                                    placeholder="Item Name"
                                                    value={itemName}
                                                    onChange={ (e)=>setItemName(e.target.value)}
                                                    required
                                                    
                                                />

                                            <Dropdown                                          
                                                placeholder="Category"
                                                selection
                                                options={categories}
                                                onChange={ (event, data) => setselectedCategory(data.value)}
                                                value={selectedCategory}
                                        />

                
                                                <Form.Input 
                                                    label="ERP Code"
                                                    placeholder="ERP Code"
                                                    type="text"
                                                    value={erpCode}
                                                    onChange={ (e)=>setErpCode(e.target.value)}
                                                    required
                                                />
                
                                            </Form.Group>
                
                                            <Form.Group widths='equal'>
                
                                            <Form.Input 
                                                type="text"
                                                label="BarCode"
                                                placeholder="Item BarCode"
                                                value={barCode}
                                                onChange={ (e)=>setBarCode(e.target.value)}
                                                required
                                            />
                
                                    

                                            </Form.Group>
                
                                            <Form.Input 
                                                type="textarea"
                                                label="Remark"
                                                onChange={ (e)=>setRemark(e.target.value)}
                                                value={remark}
                                            />
                
                                            <Button color="blue"> Submit</Button>
                
                
                
                                            
                
                                        </Form>
                                </Segment>
                           
            
                       </SegmentGroup>
                    </Container>
                )

}




export default CreateItems;