import axios from 'axios'
import React from 'react'
import { Card, Container, Icon, Message, Pagination } from 'semantic-ui-react'
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
            msg:'Sending Request'
        }
    }


componentDidMount (){

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

        this.setState({
            loading: false,
            items: result.data.data,
            meta:result.data.meta,
            links:result.data.links
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

updateSearchResult = (result)=>{

    // console.log(result)

    this.setState({
        loading: false,
        items: result.data,
    })
}



    render(){
        const {loading,items,meta,links,msg} = this.state
            return (
                <Container>
                    <SearchItem  updateSearchResult = {this.updateSearchResult}/>

                  

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
