import axios from 'axios'
import React from 'react'
import { NavLink } from 'react-router-dom'
import { Button, Card, Container,  Icon,  Message, Pagination, } from 'semantic-ui-react'
import ItemCard from '../Components/Item/ItemCard'
import SearchItem from '../Components/Shared/SearchItem'

export default class ItemsHome extends React.Component {
    constructor(props){
        super(props)

        this.state={
            loading:true,
            items:[],
            meta:{},
            links:{},
            msg:'Sending Request',
        }
    }


componentDidMount (){
    const{activeMenu} = this.state
    let url = `${process.env.REACT_APP_API_SERVER}/items`

        this.getItems(url)

}


getItems = async(url)=>{

    if( url != null) {

        this.setState({
            loading: true
        })
  
    try {
        const result = await axios.get(url)
        const response = await result.data

        this.setState({
            loading: false,
            items: response.data,
            meta:response.meta,
            links:response.links
        })
    } catch (error) {
       

       console.log(error.request)
       if(error.request) {

           this.setState({
               loading: true,
               items:[],
               msg: 'Error!, Something Wrong with Request'
           })
       }
        
    }
}
}


onSearchResultSelect = (details) =>{

    // console.log(details)
    let url = `${process.env.REACT_APP_API_SERVER}/items?item_name=${details.title}`
    this.getItems(url)
}



    render(){
        const {loading,items,meta,links,msg} = this.state
            return (
                <Container>
                    <hr />
                    <SearchItem  
                        // updateSearchResult = {this.updateSearchResult} 
                        onSearchResultSelect={this.onSearchResultSelect}  
                        resetSearchValue={ ()=>this.getItems(meta.path)}
                    />

                    <Button 
                        color="instagram"
                        as={NavLink} exact to="/items/create"
                        >New Item</Button>

                    {
                      
                            !loading ?

                                items.length > 0 &&
                                <div>
                                    <Card.Group> 
                                    {
                                        items.map( item => {
                                            return(
                                                <ItemCard key={item.id} item={item}/>
                                            )
                                        })
                                    }
                                    </Card.Group>

                                    <Pagination 
                                    // defaultActivePage={15}
                                    activePage={meta.current_page}
                                    ellipsisItem={null}
                                    firstItem={{content: <Icon name='angle double left' />, icon: true , onClick: ()=>this.getItems(links.first)}}
                                    lastItem={{ content:<Icon name='angle double right' />, icon : true, onClick: ()=>this.getItems(links.last)}}
                                    prevItem={{content: <Icon name='angle left' />, icon: true , onClick: ()=>this.getItems(links.prev)}}
                                    nextItem= {{content: <Icon name='angle right' />, icon: true , onClick: ()=>this.getItems(links.next)}}
                                    totalPages={meta.last_page}
                                    onPageChange={ (event,data)=>this.getItems(`${meta.path}?page=${data.activePage}`)}
                                    />


                                </div>
                            :

                            <Message info>
                                <Message.Header>{msg}</Message.Header>
                            </Message>
                    
                        
                }
                   

               
                    

            </Container>
            )
        }
}
