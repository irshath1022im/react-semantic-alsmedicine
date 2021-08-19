import React from 'react'
import { Tab} from 'semantic-ui-react'
import ItemReceivingLogs from './ItemReceivingLogs'
import ItemConsumptionLogs from './ItemConsumptionLogs'




const panes = (props) => {

    return [
                { menuItem: 'Receiving', render: () => <Tab.Pane ><ItemReceivingLogs batch_number_id={props.batch_number_id} /></Tab.Pane> },
                { menuItem: 'Consumptions', render: () => <Tab.Pane><ItemConsumptionLogs batch_number_id={props.batch_number_id} /></Tab.Pane> }, 
            ]
        }

const ItemLogsTaps = (props) =>

                
    <Tab panes={panes(props)} />

export default ItemLogsTaps