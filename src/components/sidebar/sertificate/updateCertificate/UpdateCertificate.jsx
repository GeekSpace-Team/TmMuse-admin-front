import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
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


const UpdateCertificate = ({selectAmount,selectProfile,selectuser,selectStatus}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [amount, setAmount] = useState(selectAmount);
  const [status, setStatus] = useState(selectStatus);
  const [profile_id, setProfile_id] = useState(0);
  const [user_id, setUser_id] = useState(0);


  const handleSelectStatus = (e) => {
    setStatus(e.target.value);
  }

  const [toAdd, setToAdd] = useState(false);

  const handleAdd = () => {
    setToAdd(!toAdd);
  }


  const [allProfileList, setAllProfile] = useState([]);
  const [allUser, setAllUser] = useState([]);

  // useEffect(() => {
  //   const headers = {
  //     'Authorization': 'Bearer my-token',
  //     'My-Custom-Header': 'foobar'
  //   };
  //   axiosInstanse.get("/get-name-profile", { headers })
  //     .then(response => {
  //       setAllProfile(response.data.body);
  //     })
  // },[])



  // useEffect(() => {
  //   const headers = {
  //     'Authorization': 'Bearer my-token',
  //     'My-Custom-Header': 'foobar'
  //   };
  //   axiosInstanse.get("/get-user-name", { headers })
  //     .then(response => {
  //       setAllUser(response.data.body);
  //     })
  // },[])








  async function addCertificate() {
    if (!toAdd)
      return;


    const certificate = {
      amount: amount,
      status: status,
      profile_id: profile_id,
      user_id: user_id,

    };
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    await axiosInstanse.put('/update-certificate', certificate, { headers })
      .then(response => {
        if (response.data.error) {
          alert("Something is went wrong!")
        } 
        alert("success")
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
    <img src="images/Edit.svg" onClick={handleOpen} alt="" />
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Update certificate</p>
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
              <select name="" style={{ height: '30px' }} id="" onChange={e => setProfile_id(e.target.value)}>
                <option value="0">Select...</option>
                {
                  allProfileList.map((element, i) => {
                    return (
                      selectProfile==element.nameTM?
                      <option value={element.id} selected>{element.nameTM}</option>:
                      <option value={element.id}>{element.nameTM}</option>
                    )
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
                  allUser.map((element, i) => {
                    return (
                      selectuser==element.fullname?
                      <option value={element.id} selected>{element.fullname}</option>:
                      <option value={element.id}>{element.fullname}</option>
                    )
                  })
                }
              </select>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Status:</p>
              <select name="" onChange = { e => handleSelectStatus(e)} style={{ height: '30px' }} id="">
                <option value="0">Status...</option>
                
                  <option value={1}>Active</option>:
                  <option value={0}>Passive</option>
                
              </select>
            </Stack>
          </Col>
        </Row>
        <div className="BannerAddButton" id='addPromoButton'>
          <button>Update</button>
        </div>
      </Box>
    </Modal>
  </div>;
};

export default UpdateCertificate;
