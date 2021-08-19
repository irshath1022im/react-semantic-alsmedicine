import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import ItemLogs from './ItemLogs'

function ItemLogsModal(props) {

  const [open, setOpen] = React.useState(false)

//   const gotToPreviousUrl = () =>{
//     useHistory().goBack()
//   }

  return (
    
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size='small'
    //   onUnmount={ ()=>props.history.push('/')}
      trigger={<Button as="button" size="small">Logs</Button>}
    >
      <Header icon>
      </Header>

      <Modal.Content>
            <ItemLogs batch_number_id={props.batch_number_id}/>
      </Modal.Content>
      <Modal.Actions>
        {/* <Button basic color='red' inverted onClick={() => setOpen(false)}>
          <Icon name='remove' /> Close
        </Button> */}
      
      </Modal.Actions>
    </Modal>
  )
}

export default ItemLogsModal