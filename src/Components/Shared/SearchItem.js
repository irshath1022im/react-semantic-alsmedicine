
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Grid, Label, Search } from 'semantic-ui-react'

export default function SearchItem(props) {

    const [result, setResult] = useState([])
    const [loading, setLoading] = useState(false)
    const [value, setValue] = useState('')
    

const startSearch = (data) =>{
    setLoading(true)
    setValue(data.value)
}


const getSearchValue = async () =>{
    try {
        let result = await axios.get(`${process.env.REACT_APP_API_SERVER}/items?item_name=${value}`)
        let response = await result.data

        // console.log(response)
            setLoading(false)
            setResult(response.data)
        props.updateSearchResult(response)
        

    } catch (error) {
        
    }
}

useEffect( ()=> {
       
   
        getSearchValue()
       
            // setResult([...result, data])
            // setLoading(true)
  
   
}, [value])





    return (
        <Grid>
            <Grid.Column width={16}>
                <Search
                    size={'large'}
                    input={ { icon:'search', iconPosition: 'left'}}
                    loading= {loading}
                    // onResultSelect={ (data,event) =>props.updateSearchResult(event.result)}
                    onSearchChange={ (e,data)=>startSearch(data)}
                    results={result}
                    value={value}
                    resultRenderer={ ({item_name})=> <Label content={item_name} />}
                    
                />

               
            </Grid.Column>
        </Grid>
    )
}
