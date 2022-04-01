import React, { useEffect, useState } from 'react'
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { Col, Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { IoMdClose } from 'react-icons/io';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { showError, showSuccess, showWarning } from '../../../toast/toast';
import { ToastContainer } from 'react-toastify';
import { CSVLink } from 'react-csv';


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


const AddTmCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [date_of_birth, setDate_of_birth] = useState('');
  const [gender, setGender] = useState('');
  const [email, setEmail] = useState('');
  const [is_sms, setIs_sms] = useState(true);
  const [status, setStatus] = useState('');
  const [fullname, setFullname] = useState('');
  const [phone_number, setPhone_number] = useState('');
  const [ card_id, setCard_id ] = useState('');
  const [ expired, setExpired ] = useState('');
  const [toAdd, setToAdd] = useState(false);
  const handleAdd = () => {
    setToAdd(!toAdd);
  }
  const handleSelectGender = (e) => {
    setGender(e.target.value);
  }

  const handleSelectIsSms = (e) => {
    setIs_sms(e.target.value);
  }

  const handleSelectStatus = (e) => {
    setStatus(e.target.value);
  }

  async function addCard() {
    if (!toAdd)
      return;
    if (fullname == '') {
      // alert("Please enter required informations!")
      showWarning("Please enter required informations!");
      return;
    }

    const card = {
      date_of_birth: date_of_birth,
      gender: gender,
      email: email,
      is_sms: is_sms,
      status: status,
      card_id: card_id,
      expired: expired,
      fullname: fullname,
      phone_number: phone_number
    }

    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
     axiosInstanse.post('/add-card', card, { headers })
      .then(response => {
        if (response.data.error) {
          // alert("Something is went wrong!")
          showWarning("Something is went wrong!");
        }
        handleClose();
        setPhone_number('');
        setEmail('');
        setDate_of_birth('');
        setFullname('');
        props.getCard(1);
        setToAdd(false);
        showSuccess('Successfully added!!!');

      }).catch(ex => {
        setToAdd(false);
        // alert("Adding error:" + ex);
        showError("Adding error:" + ex);
      });
  }
  useEffect(() => {
    addCard();
  }, [toAdd]);
  return (
    <div>
      <button className='Addbuttons' onClick={handleOpen} style={{ marginLeft: '90px', marginBottom: "30px" }}>+ Add cards</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack direction='row' justifyContent='space-between'>
            <p className='bannerModalTitle'>Add card</p>
            <IoMdClose className='Xicon' onClick={handleClose} />
          </Stack>
          <Row>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' spacing={-2}>
                <p>Full name:</p>
                <input type="text" value={fullname} onInput={e => setFullname(e.target.value)} />
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' spacing={-2}>
                <p>Gender:</p>
                <select name="" id="" style={{ height: '30px' }} onChange={e => handleSelectGender(e)}>
                  <option value="0">Gender</option>
                  <option value="1">Man</option>
                  <option value="2">Woman</option>
                </select>
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Status:</p>
                <select name="" onChange = { e => handleSelectStatus(e)} style={{ height: '30px' }} id="">
                <option value="0">Status</option>
                <option value="1">Active</option>
                <option value="2">Passive</option>
              </select>
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Date of birth:</p>
                <input type="date" style={{ width: '100%' }} onInput={e => { let date = e.target.value.slice(8, 10) + "/" + e.target.value.slice(5, 7) + "/" + e.target.value.slice(0, 4); setDate_of_birth(date) }} />
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Expired time:</p>
                <input type="date" style={{ width: '100%' }} onInput={e => { let date = e.target.value.slice(8, 10) + "/" + e.target.value.slice(5, 7) + "/" + e.target.value.slice(0, 4); setExpired(date) }} />
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Phone number:</p>
                <input type="text" value={phone_number} onInput={e => setPhone_number(e.target.value)} />
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Card Id:</p>
                <input type="text" value={card_id} onInput={e => setCard_id(e.target.value)} />
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Notify type:</p>
                <select name="" onChange = { e => handleSelectIsSms(e)} style={{ height: '30px' }} id="">
                <option value="true">Inbox</option>
                <option value="false">Email</option>
              </select>
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Email:</p>
                <input type="text" value={email} onInput={e => setEmail(e.target.value)} />
              </Stack>
            </Col>
            <Col lg={9} md={9} xs={9} sm={9}></Col>
            <Col lg={3} xs={3} md={3} sm={3}>
              <button onClick={() => handleAdd()} style={{ marginTop: '30px', width: '130px', height: "33px", borderRadius: "8px", background: 'linear-gradient(134.99deg, #7C057B 0%, #CD2791 77.02%)', color: 'white', border: 'transparent', marginLeft: '15px' }}>+ Add</button>
            </Col>
          </Row>
        </Box>
      </Modal>
      <ToastContainer/>
    </div>
  )
}

export default AddTmCard
