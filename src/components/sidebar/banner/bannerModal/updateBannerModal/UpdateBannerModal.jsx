import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
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

const UpdateBannerModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    return (
        <div>
                <img src="images/Edit.svg" onClick={handleOpen} alt="" />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
      <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Update banner</p>
          <IoMdClose className='Xicon' onClick={handleClose}/>
      </Stack>
      <Row>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} >
            <p className='inputTitle'>Site link:</p>
            <input type="text" />
          </Stack>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} >
            <p className='inputTitle'>Site link:</p>
            <select style={{height: '30px'}} name="" id=""><option value="">Select...</option></select>
          </Stack>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} marginTop={2}>
            <p className='inputTitle'>Order:</p>
            <input type="text" />
          </Stack>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} marginTop={2}>
            <p className='inputTitle'>Banner image:</p>
            <input type='file' className='custom-file-input' />
          </Stack>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} marginTop={2}>
            <p className='inputTitle'>Comment of admin:</p>
            <input type="text" />
          </Stack>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} marginTop={2}>
            <p className='cantAdd'> Can't add site link and Prfile together! Only the profile will  be accepted if you enter both!</p>
          </Stack>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' marginTop={-3}>
            <img src="images/tower.svg" alt="" style={{width: '150px'}} />
          </Stack>
        </Col>
      </Row>
            <div className="BannerAddButton">
                <button>Update</button>
            </div>
        </Box>
      </Modal>
        </div>
    )
}

export default UpdateBannerModal
