import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { IoMdClose } from 'react-icons/io';
import { Col, Row } from 'react-bootstrap';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 700,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ReplyModal = ({inboxid}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
  return (
    <div>
        
 <button onClick={handleOpen}><img src="images/send.svg" onClick={handleOpen} style={{marginRight:'10px', height: '17px'}} alt="" /> Reply</button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction='row' justifyContent='space-between'>
                        <p className='bannerModalTitle'>Reply message {inboxid}</p>
                        <IoMdClose className='Xicon' onClick={handleClose} />
                    </Stack>
                    <Row>
                        <Col lg={12} md={12} xs={12} sm={12}>
                            <Stack direction='column' spacing={-2}>
                                <p style={{ color: '#31456A', fontSize: '15px' }}>Title:</p>
                                <input type="text"></input>
                            </Stack>
                        </Col>
                        <Col lg={12} md={12} xs={12} sm={12}>
                            <Stack direction='column' marginTop={2} spacing={-2}>
                                <p style={{ color: '#31456A', fontSize: '16px' }}>Message:</p>
                                <textarea name="" id="" cols="30" rows="10"></textarea>
                            </Stack>
                        </Col>
                        <Col lg={9}></Col>
                        <Col lg={3} md={12} xs={6} sm={6}>
                            <Stack marginLeft={3} direction='row' spacing={2} marginTop={3}>
                                <div className="sentButtonInbox">
                                    <button><img src="images/send.svg" style={{ marginRight: '10px', height: '17px' }} alt="" /> Send</button>
                                </div>
                            </Stack>
                        </Col>

                    </Row>
                </Box>
            </Modal>      
    </div>
  )
}

export default ReplyModal
