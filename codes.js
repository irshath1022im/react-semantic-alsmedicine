<Modal
                                                        onClose={ ()=>setOpen(false)}
                                                        onOpen={ () => setOpen(true)}
                                                        open={open}
                                                       
                                                        onMount= { ()=>getLogs(stock.batch_number)}
                                                        onUnmount={ () => setSelectedBatchNumber(null)}
                                                    >

                                                    <Modal.Header>Logs</Modal.Header>
                                                    <Modal.Content>

                                                        {
                                                            ! modalLoading ?
                                                                <Modal.Description>
                                                                    <ItemLogs batch_number={selectedBatchNumber}/>
                                                                </Modal.Description>
                                                            :
                                                            <Modal.Description>
                                                             <Dimmer active>
                                                                    <Loader size='mini'>Loading</Loader>
                                                            </Dimmer> 
                                                            </Modal.Description>
                                                        }

                                                    </Modal.Content>

                                                    <Modal.Actions>
                                                        <Button color="black" onClick={ ()=>setOpen(false)}>Close</Button>
                                                    </Modal.Actions>
                                                </Modal>