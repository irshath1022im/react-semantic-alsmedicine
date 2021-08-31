
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {  Button, Grid, Label, Search } from 'semantic-ui-react'

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
        let result = await axios.get(`${process.env.REACT_APP_API_SERVER}/itemSearch?itemName=${value}`)
        let response = await result.data

        // console.log(response)
            setLoading(false)
            setResult(response.data)

        // props.updateSearchResult(response)
        

    } catch (error) {
        
    }
}

useEffect( ()=> {

    if(value !== null) {
            getSearchValue() 
    }
}, [value])


const searchReset = () =>{

    setValue('');
    props.resetSearchValue()
}


    return (
        <Grid>
            <Grid.Column width={16}>
                <Search
                    size={'large'}
                    input={ { icon:'search', iconPosition: 'left'}}
                    loading= {loading}
                    onResultSelect={ (data,event) =>props.onSearchResultSelect(event.result)}
                    onSearchChange={ (event,data)=>startSearch(data)}
                    // onFocus={ (e,data)=>startSearch(data)}
                    results={result}
                    value={value}
                    resultRenderer={ ({title})=> <Label content={title} />}
                    minCharacters={1}
                    
                />
               
               {
                   props.resetSearchValue && 
               
                <Button size="tiny"
                 onClick={ searchReset} disabled={ value == '' || value === null} >Reset</Button>

               }
            

               
            </Grid.Column>
        </Grid>
    )
}
