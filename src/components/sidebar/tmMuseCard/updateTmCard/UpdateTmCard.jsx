import React from 'react'
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { Col, Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { IoMdClose } from 'react-icons/io';


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


const UpdateTmCard = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <div>
      <img src='images/Edit.svg' onClick={handleOpen} />
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction='row' justifyContent='space-between'>
            <p className='bannerModalTitle'>Update card</p>
            <IoMdClose className='Xicon' onClick={handleClose} />
          </Stack>
          <Row>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' spacing={-2}>
                <p>Full name:</p>
                <input type="text" />
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' spacing={-2}>
                <p>Gender:</p>
                <select name="" id="" style={{height: '30px'}}>
                  <option value="">Man</option>
                  <option value="">Woman</option>
                </select>
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Job:</p>
                <select name="" id="" style={{height: '30px'}}>
                  <option value="">Select...</option>
                  <option value="">Select...</option>
                  <option value="">Select...</option>
                </select>
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Status:</p>
                <select name="" id="" style={{height: '30px'}}>
                  <option value="">Active</option>
                  <option value="">Passive</option>
                </select>
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Date of birth:</p>
                <input type="text" />
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Passport info:</p>
                <input type="text" />
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Passport info???:</p>
                <input type="text" />
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Notify type:</p>
                <select name="" id="" style={{height: '30px'}}>
                  <option value="">Sms</option>
                  <option value="">MMS</option>
                </select>
              </Stack>
            </Col>
            <Col lg={9} md={9} xs={9} sm={9}></Col>
            <Col lg={3} xs={3} md={3} sm={3}>
              <button style={{ marginTop: '30px', width: '130px', height: "33px", borderRadius: "8px", background: 'linear-gradient(134.99deg, #7C057B 0%, #CD2791 77.02%)', color: 'white', border: 'transparent', marginLeft: '15px' }}>Update</button>
            </Col>
          </Row>
        </Box>
      </Modal>

    </div>
  )
}

export default UpdateTmCard
