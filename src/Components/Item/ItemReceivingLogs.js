
import axios from 'axios'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Dimmer, Loader, Message } from 'semantic-ui-react'
import ReceivingLog from '../Receiving/ReceivingLog'

export default class ItemReceivingLogs extends Component {

    state = {
        loading: true,
        loading_msg: 'requesting',
        logs:[]
    }

async componentDidMount () {

    let url = `${process.env.REACT_APP_API_SERVER}/receivingsByBatchNumber/${this.props.batch_number_id}`

    try {
        
        const result = await axios.get(url)

        this.setState({
            loading:false,
            logs: result.data.data
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

                        {
                            

                                logs.length > 0 ?

                            
                                    <table className="ui celled table unstackable">
                                    <thead>
                                        <tr><th>ITEM_NAME</th>
                                        <th>BATCH NO</th>
                                        <th>PO#</th>
                                        <th>INV#</th>
                                        <th>DEL#</th>
                                        <th>QTY</th>
                                        <th>U.PRICE</th>
                                        <th>COST</th>
                                    </tr></thead>

                                    <tbody>
                                    {                          
                                        logs.map( (log,key)=>{
                                            return(
                                            <ReceivingLog log={log} key={key}/>
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
