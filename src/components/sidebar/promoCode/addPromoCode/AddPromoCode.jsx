import React, { useState, useEffect } from 'react';
import './AddPromoCode.css'
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';



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


const AddPromoCode = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [ promo_code, setPromo_code ] = useState('');
  const [ status, setStatus ] = useState('');
  const [ profile_id, setProfile_id ] = useState('');
  const [ user_id, setUser_id ] = useState('');
  const [allUser, setAllUser] = useState([]);
  const [allProfileList, setAllProfile] = useState([]);

  const handleSelectStatus = (e) => {
    setStatus(e.target.value);
  }
  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };
  

  const [toAdd, setToAdd] = useState(false);

  const handleAdd = () => {
    setToAdd(!toAdd);
  }

  useEffect(() => {
    axiosInstanse.get("/get-name-profile", { headers })
      .then(response => {
        setAllProfile(response.data.body);
      })
  },[])

  useEffect(() => {
    axiosInstanse.get("/get-user-name", { headers })
      .then(response => {
        setAllUser(response.data.body);
      })
  },[])
  async function addPromo() {
    if (!toAdd)
      return;

  const promo = {
    promo_code: promo_code,
    status: status,
    profile_id: profile_id,
    user_id: user_id
  }
   axiosInstanse.post('/add-promo-code', promo, { headers })
    .then(response => {
      if (response.data.error) {
        alert("Something is went wrong!")
      } 
      handleClose();
      setPromo_code('');
      props.getPromo(1);

      setToAdd(false);
    }).catch(ex => {
      setToAdd(false);
      alert("Adding error:" + ex);
    });
}



useEffect(() => {

  addPromo();
}, [toAdd]);
  return <div>
    <button onClick={handleOpen} className='Addbuttons' style={{ marginTop: '10px' }}>+ Add promo code</button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Add promo code</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column'  spacing={0}>
              <p className='inputTitle'>Promo code:</p>
              <input type="text" value={promo_code} onInput={e => setPromo_code(e.target.value)} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Profile:</p>
              <select name="" style={{ height: '30px' }} id="" onChange={e => setProfile_id(e.target.value)}>
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
            <Stack direction='column' marginTop={2} spacing={0}>
              <p className='inputTitle'>User:</p>
              <select name="" style={{ height: '30px' }} id="" onChange={e => setUser_id(e.target.value)}>
                <option value="0">Select...</option>
                {
                  allUser.map((element, i) => {
                    return (<option value={element.id}>{element.fullname}</option>)
                  })
                }
              </select>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={2} spacing={0}>
              <p className='inputTitle'>Status:</p>
              <select name="" onChange = { e => handleSelectStatus(e)} style={{ height: '30px' }} id="">
                <option value="0">Status</option>
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

export default AddPromoCode;
