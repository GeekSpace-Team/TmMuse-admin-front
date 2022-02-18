import React from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
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

const UpdatePost = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return <div>
    <img src="images/Edit.svg" onClick={handleOpen} alt="" />
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Update post</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Name TM:</p>
              <input type="text" />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Profile:</p>
              <select name="" style={{ height: '30px' }} id=""><option value="">Select...</option></select>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Name RU:</p>
              <input type="text" />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Post image:</p>
              <input className='custom-file-input' type="file" />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Description TM:</p>
              <textarea name="" id="" cols="20" rows="4"></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5} >
              <p className='inputTitle'>Description RU:</p>
              <textarea name="" id="" cols="20" rows="4"></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Promotion:</p>
              <input type="text" />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Comment of admin:</p>
              <input type="text" />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Status:</p>
              <select name="" style={{ height: '30px' }} id=""><option value="">Active</option><option value="">Passive</option></select>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Site link:</p>
              <input type="text" />
            </Stack>
          </Col>
        </Row>
        <div id='addPostButton' className="BannerAddButton">
          <button>Update</button>
        </div>
      </Box>
    </Modal>
  </div>;
};

export default UpdatePost;
