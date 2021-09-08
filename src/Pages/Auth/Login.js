import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Message, Segment, SegmentGroup } from 'semantic-ui-react'
import {  logginRequestAction } from '../../Redux/Actions/AuthAction';



function Login(props) {

    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')


    const dispatch = useDispatch();
    const loginStatus = useSelector( state => state.Authentication)

const loginFormHandle = () =>{

    let data = {
       userName,
        password
    }
    // alert('test')

    if(userName === ''  || password === '') 
    {
        
        alert('Fields are Empty')
    }else{

        dispatch(logginRequestAction(data))
         

    }


}


useEffect(() => {
//    console.log('useEffect')
   if(loginStatus.loggedIn) {
    setTimeout( ()=>{
        props.history.push('/items/create')
    }, 1000)
}
}, [loginStatus])

    return (
        <SegmentGroup>
            
            <Message info>{loginStatus.message}</Message>

            <Segment>
                <Form>
                    <Form.Input
                        type="text"
                        label="User Name"
                        onChange={ (e)=>setUserName(e.target.value)}
                        value={userName}
                    
                        
                    />

                    <Form.Input
                        type="password"
                        label="Password"
                        onChange={ (e)=>setPassword(e.target.value)}
                        value={password}

                        
                    />
                <Button onClick={loginFormHandle}>Submit</Button>
                </Form>
            </Segment>
        </SegmentGroup>
    )
}



export default Login;