import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Button, Container, Grid, Icon, IconGroup, Label, Menu} from 'semantic-ui-react'
import { logOutRequest } from '../../Redux/Actions/AuthAction'


export default function NavigationMenu() {

    const [iconVisible, setIconVisible] = useState('none')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [menuDisplay, setMenuDisplay] = useState('')

    const loginStatus = useSelector(state => state.Authentication)
    const dispatch = useDispatch()


useEffect( ()=>{

    if(screenWidth < 768) {
        setIconVisible('')
        setMenuDisplay('none')
    } 
// console.log(loginStatus)

},[])

useEffect( ()=>{

            window.addEventListener('resize', 
            ()=> {
                // console.log(window.innerWidth)
                setScreenWidth(window.innerWidth)
                    if(window.innerWidth <= 768) {
                        setIconVisible('')
                        setMenuDisplay('none')
                    }else if(window.innerWidth > 768) {
                        setIconVisible('none')
                        setMenuDisplay('')
                    }
                })
            
            return () =>{
                window.removeEventListener('resize', ()=>{}, false)
            }

})


 const menuHandle = () =>{

            if(screenWidth < 768 ){
                setTimeout( ()=>setMenuDisplay('none') , 100)
            }
}




    return (
        <Container>

            <Grid>
                <Grid.Row>

                    <Grid.Column width={11}>

                        <IconGroup style={{ display: iconVisible}}>
                        <Icon 
                                    name='list layout'
                                    size="big"
                                    style={{ display: menuDisplay === 'none' ? '' : ''}}    
                                    onClick={ ()=> setMenuDisplay('')} 
                                    disabled={menuDisplay ? false : true}               
                            />
                    </IconGroup>

                                <Menu 
                                    pointing 
                                    stackable
                                    borderless={false}
                                    style={{ display: menuDisplay}}
                                    // onItemClick={ (event,data) => console.log(data)}
                                >
                                    
                                    <Menu.Item 
                                        name="Home"
                                        // active={activeMenu === 'Home'}
                                        // onClick={ () => this.menuHandle('Home') }
                                        as={NavLink} exact to="/"
                                        onClick={ () => menuHandle() }

                                    />

                                    
                                    <Menu.Item 
                                        name="Items"
                                        // active={activeMenu === 'Home'}
                                        // onClick={ () => this.menuHandle('Home') }
                                        as={NavLink} exact to="/items"
                                        onClick={ () => menuHandle() }

                                    />  

                                    <Menu.Item 
                                        name="Receivings"
                                        as={NavLink} to="/receivings"
                                        // active={activeMenu === 'Receivings'}
                                        onClick={ () => menuHandle() }
                                    />

                                    <Menu.Item 
                                        name="Consumptions"
                                        as={NavLink} to="/consumptions"
                                        // active={activeMenu === 'Consumptions'}
                                        onClick={ () => menuHandle() }
                                    />

                                    <Menu.Item 
                                        name="Summary"
                                        as={NavLink} to="/Summary"
                                        // active={activeMenu === 'Summary'}
                                        onClick={ () => menuHandle() }
                                    />
                                    <Menu.Item 
                                        name="Login"
                                        as={NavLink} to="/login"
                                        // active={activeMenu === 'Login'}
                                        onClick={ () => menuHandle() }
                                    />

                                
                                </Menu>

                    </Grid.Column>

                    <Grid.Column width={5} floated="right"  textAlign="right" verticalAlign="bottom">
                        {
                            loginStatus.loggedIn ?
                               
                                <Grid.Row columns={'equal'}>
                                    <Grid.Column >
                                        <Button color="green" onClick={ () => dispatch( logOutRequest())}>Log Out </Button>
                                    </Grid.Column>

                                    <Grid.Column >
                                        <Label color="teal">{loginStatus.loggedBy} </Label>
                                    </Grid.Column>
                                </Grid.Row>
                              
                                
                            :

                                <Button color="blue" as={NavLink} to="/login">Log In </Button>
                        }
                                </Grid.Column>
                </Grid.Row>
                      
            </Grid>
            
        </Container>
    )
}
