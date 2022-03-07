import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { Col, Row } from 'react-bootstrap';




const style = {
  position: 'absolute',
  top: '40%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


const AddCertificate = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [amount, setAmount] = useState(0);
  const [status, setStatus] = useState(0);
  const [profile_id, setProfile_id] = useState(0);
  const [user_id, setUser_id] = useState(0);
  const [toAdd, setToAdd] = useState(false);
  const [allProfileList, setAllProfile] = useState([]);
  const [allUser, setAllUser] = useState([]);
  const handleSelectStatus = (e) => {
    setStatus(e.target.value);
  }

  const handleAdd = () => {
    setToAdd(!toAdd);
  }
  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };



  useEffect(() => {
    axiosInstanse.get("/get-name-profile", { headers })
      .then(response => {
        setAllProfile(response.data.body);
      })
  }, [])



  useEffect(() => {
    axiosInstanse.get("/get-user-name", { headers })
      .then(response => {
        setAllUser(response.data.body);
      })
  }, [])

  async function addCertificate() {
    if (!toAdd)
      return;
    const certificates = {
      amount: amount,
      status: status,
      profile_id: profile_id,
      user_id: user_id,

    };
     axiosInstanse.post('/add-certificate', certificates, { headers })
      .then(response => {
        if (response.data.error) {
          alert("Something is went wrong!")
        }
        handleClose();
        setAmount("");
        setUser_id("");
        props.getCertificate(1);

        setToAdd(false);
      }).catch(ex => {
        setToAdd(false);
        alert("Adding error:" + ex);
      });
  }
  useEffect(() => {

    addCertificate();
  }, [toAdd]);

  return <div>
    <button onClick={handleOpen} className='Addbuttons' style={{ marginTop: '10px' }}>+ Add certificate</button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Add certificate</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Amount:</p>
              <input type="text" value={amount} onInput={e => setAmount(e.target.value)} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Profile:</p>
              <select name="" id="" style={{ height: '30px' }} onChange={e => setProfile_id(e.target.value)}>
                <option value="0">Select...</option>
                {
                  allProfileList?.map((element, i) => {
                    return (<option value={element.id}>{element.nameTM}</option>)
                  })
                }
              </select>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>User:</p>
              <select name="" style={{ height: '30px' }} id="" onChange={e => setUser_id(e.target.value)}>
                <option value="0">Select...</option>
                {
                  allUser?.map((element, i) => {
                    return (<option value={element.id}>{element.fullname}</option>)
                  })
                }
              </select>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Status:</p>
              <select name="" onChange={e => handleSelectStatus(e)} style={{ height: '30px' }} id="">
                <option value="0">Status...</option>
                <option value="1">Active</option>
                <option value="2">Passive</option>
              </select>
            </Stack>
          </Col>
        </Row>
        <div className="BannerAddButton" id='addPromoButton'>
          <button onClick={handleAdd}>+ Add</button>
        </div>
      </Box>
    </Modal>
  </div>;
};

export default AddCertificate;
