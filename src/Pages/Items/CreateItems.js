import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Container, Dimmer, Dropdown, Form, Loader, Message, Segment, SegmentGroup } from 'semantic-ui-react'
import { addItem } from '../../Redux/Actions/ItemAction'

function CreateItems(props) {
    
        const itemStore = useSelector( state => state.item)
            

        const [categories, setCategory] = useState([])

        const [itemName, setItemName] = useState(!itemStore.items.name && '')
        const [erpCode, setErpCode] = useState(!itemStore.items.erp_code && '')
        const [barCode, setBarCode] = useState(!itemStore.items.bar_code && '')
        const [remark, setRemark] = useState(!itemStore.items.remark && '' )
        const [selectedCategory, setselectedCategory] = useState(!itemStore.items.category_id && '')

        const loginStatus = useSelector(state => state.Authentication.loggedIn)
        const categoryStore  = useSelector(state => state.categories)
        const dispatch = useDispatch();


useEffect( () => {
    console.log('useEffect')
    // props.dispatch( () =>{
    //     type: 'CHECK_AUTH_STATUS'
    // })
//    props.dispatch( { type: 'Logg_REQUEST'})

    if(!loginStatus)
    {
        props.history.push('/login')
    }

}, [loginStatus, itemStore])


useEffect(() => {
    
    let category=[{key:'', value:'', text:"Select" }]
    categoryStore.forEach((el,key) => {
       category.push({key: key+1, value:el.id, text:el.category })
    });

    setCategory(category)
   
}, [])

const formHandle = () => {
   
    // setDimmerActive(true)

    let submitedData = {
        name: itemName,
        thumbnail: '',
        category_id: selectedCategory,
        erp_code: erpCode,
        remark: remark,
        bar_code: barCode
    }

    dispatch( addItem(submitedData))
    
    if(itemStore.message === 'Created'){
        formClear();
            props.history.push('/items')

           
    }

}

const formClear = () => {
    setItemName('',)
    setErpCode('')
    setselectedCategory('')
    setBarCode('')
    setRemark('')
}


        return (
                    <Container>
                       <SegmentGroup>
            
                           <Segment>
                            <h4>Create New Item</h4>
            
                           </Segment>

                           {
                               itemStore.message !== '' &&

                                <Segment>
                                    <Message info>{itemStore.message}</Message>
                                </Segment>
                           }

                           <Dimmer active={itemStore.loading} inverted>
                                <Loader size="mini">{itemStore.message}</Loader>
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
                                                    // required
                                                    
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