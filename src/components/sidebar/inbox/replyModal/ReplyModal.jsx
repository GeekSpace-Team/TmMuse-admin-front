import React from 'react'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { IoMdClose } from 'react-icons/io';
import { Col, Row } from 'react-bootstrap';
import { useState } from 'react';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { showError, showSuccess } from '../../../toast/toast';

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

const ReplyModal = ({inboxId,getInbox}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ title, setTitle ] = useState('');
    const [ message, setMessage ] = useState('');


    const ReplySend = () => {
        axiosInstanse.post('/add-answered-message',{
            title:title,
            message:message,
            inbox_id:inboxId
        })
        .then(response=>{
            if(!response.data.error){
                showSuccess("Successfully sent!");
                setTitle("");
                setMessage("");
                handleClose();
                getInbox();
            } else {
                showError("Something went wrong!")
            }
        })
        .catch(err=>{
            showError(err+"");
        })
    }
  return (
    <div>
 <button onClick={handleOpen}><img src="images/send.svg"  style={{marginRight:'10px', height: '17px'}} alt="" /> Reply</button>

         <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Stack direction='row' justifyContent='space-between'>
                        <p className='bannerModalTitle'>Reply message</p>
                        <IoMdClose className='Xicon' onClick={handleClose} />
                    </Stack>
                    <Row>
                        <Col lg={12} md={12} xs={12} sm={12}>
                            <Stack direction='column' spacing={-2}>
                                <p style={{ color: '#31456A', fontSize: '15px' }}>Title:</p>
                                <input type="text" value={title} onChange={e=>setTitle(e.target.value)}></input>
                            </Stack>
                        </Col>
                        <Col lg={12} md={12} xs={12} sm={12}>
                            <Stack direction='column' marginTop={2} spacing={-2}>
                                <p style={{ color: '#31456A', fontSize: '16px' }}>Message:</p>
                                <textarea name="" id="" cols="30" rows="10"  value={message} onChange={e=>setMessage(e.target.value)}></textarea>
                            </Stack>
                        </Col>
                        <Col lg={9}></Col>
                        <Col lg={3} md={12} xs={6} sm={6}>
                            <Stack marginLeft={3} direction='row' spacing={2} marginTop={3}>
                                <div className="sentButtonInbox">
                                    <button onClick={() => ReplySend()}><img src="images/send.svg" style={{ marginRight: '10px', height: '17px' }} alt="" /> Send</button>
                                </div>
                            </Stack>
                        </Col>

                    </Row>
                </Box>
            </Modal>    
        
 {/* <button onClick={handleOpen}><img src="images/send.svg"  style={{marginRight:'10px', height: '17px'}} alt="" /> Reply</button> */}
             
    </div>
  )
}

export default ReplyModal
