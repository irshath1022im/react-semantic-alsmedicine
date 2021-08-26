import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Container, Icon, IconGroup, Menu} from 'semantic-ui-react'


export default function NavigationMenu() {

    const [iconVisible, setIconVisible] = useState('none')
    const [screenWidth, setScreenWidth] = useState(window.innerWidth)
    const [menuDisplay, setMenuDisplay] = useState('')

useEffect( ()=>{

    if(screenWidth < 768) {
        setIconVisible('')
        setMenuDisplay('none')
    } 


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
                setTimeout( ()=>setMenuDisplay('none') , 300)
            }
}




    return (
        <Container>
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
        </Container>
    )
}
