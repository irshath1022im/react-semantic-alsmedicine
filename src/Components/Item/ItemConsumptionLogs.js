
import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dimmer, Loader, Message } from 'semantic-ui-react'
import ConsumptionLog from '../Consumption/ConsumptionLog'

export default class ItemConsumptionLogs extends Component {

    state = {
        loading: true,
        loading_msg: 'requesting',
        logs:[]
    }

async componentDidMount () {

    let url = `${process.env.REACT_APP_API_SERVER}/consumptionsByBatchNumber/${this.props.batch_number_id}`

    try {
        
        const result = await axios.get(url)
        const response = await result.data

        this.setState({
            loading: false,
            logs: response.data
        })
      
    } catch (error) {
        
    }
}

    render() {
        const {loading, loading_msg,logs} = this.state

        if(loading) {
            return(
                <div>
                     <Dimmer active>
                        <Loader>{loading_msg}</Loader>
                    </Dimmer>
                </div>
            )
        } else {
            return (
                    <div>

                                        <Dimmer active ={loading}>
                                                <Loader />
                                        </Dimmer>
                        {
                        
                            logs.length > 0 ?


                                        <table className="ui celled table unstackable">
                                        <thead>
                                            <tr>
                                            <th>DATE NAME</th>
                                            <th>ITEM NAME</th>
                                            <th>BATCH NUMBER</th>
                                            <th>QTY</th>
                                            <th>LOCATION</th>
                                            <th>USER</th>
                    
                                        </tr></thead>

                                        <tbody>

                                     

                                       {
                                        
                                                    logs.map( (log)=>{
                                                        
                                                        return(
                                                            <ConsumptionLog log={log} key={log.line_id} />
                                                        )
                                                    })
                                        }
                                    

                                        </tbody>

                                        </table>
                              :

                              <Message info>
                                <Message.Header>Sorr!, No Receivings are found...</Message.Header>
                                <p>Visit Home Page Click <Link to="/">Here</Link></p>
                            </Message>

                                

                          
                             }

                </div>
            )
        }
    }
}
