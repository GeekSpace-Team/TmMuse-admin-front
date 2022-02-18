import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { IoMdClose } from 'react-icons/io';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';




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

const UpdateAds = ({ adsID, nameTM, nameRU, profileID, image, siteURL, isMain, comment_of_admin,allProfileList }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [profile_id, setPofile_id] = useState(0);

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
          <p className='bannerModalTitle'>Update advertisement</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Name TM:</p>
              <input type="text" value={nameTM} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Profile:</p>
              <select style={{ height: '30px' }} name="" id="" onChange={e => setPofile_id(e.target.value)}>
                <option value="0">Select...</option>
                {
                  allProfileList.map((element, i) => {
                    return (<option value={element.id}>{element.nameTM}</option>)
                  })
                }
              </select>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={2}>
              <p className='inputTitle'>Name RU:</p>
              <input type="text" value={nameRU} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={2}>
              <p className='inputTitle'>Ads image:</p>
              <input type="file" className='custom-file-input' />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={2}>
              <p className='inputTitle'>Site link:</p>
              <input type="text" value={siteURL} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={2}>
              <p className='inputTitle'>Is Main?:</p>
              <select style={{ height: '30px' }} name="" id="">
                {
                  // isMain?
                  // <option value={true}>Yes</option><option value={false}>NO</option>:
                  // <option value={false}>NO</option><option value={false}>Yes</option>
                }
              </select>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12} >
            <Stack direction='column' spacing={0} marginTop={2}>
              <p className='inputTitle'>Comment of admin:</p>
              <input type="text" value={comment_of_admin} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={2}>
              <p className='cantAdd'> Can't add site link and Prfile together! Only the profile will  be accepted if you enter both!</p>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={-2}>
              <img src="images/tower.svg" alt="" style={{ width: '170px' }} />
            </Stack>
          </Col>
        </Row>
        <div className="BannerAddButton">
          <button>+ Add</button>
        </div>
      </Box>
    </Modal>
  </div>;
};

export default UpdateAds;

