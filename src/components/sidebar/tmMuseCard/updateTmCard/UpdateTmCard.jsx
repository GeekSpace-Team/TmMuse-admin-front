import React, { useEffect, useState } from 'react';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { Col, Row } from 'react-bootstrap';
import Box from '@mui/material/Box';
import { IoMdClose } from 'react-icons/io';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { showSuccess } from '../../../toast/toast';
import { ToastContainer } from 'react-toastify';



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


const UpdateTmCard = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{props.handleClose()}
  const [ date_of_birth, setDate_of_birth ] = useState(props.data.date_of_birth);
  const [ gender, setGender ] = useState(props.data.gender);
  const [ email, setEmail ] = useState(props.data.email);
  const [ is_sms, setIs_sms ] = useState(props.data.is_sms);
  const [ phone_number, setPhone_number ] = useState(props.data.phone_number);
  const [ fullname, setFullname ] = useState(props.data.fullname);
  const [status, setStatus ] = useState(props.data.status);
  const handleSelectStatus = (e) => {
    setStatus(e.target.value);
  }
  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };
  const handleSelectIsSms = (e) => {
    if (e.target.value == 1) {
      setIs_sms(true);
    } else {
      setIs_sms(false);
    }

  }
  const UpdateMyCard = (id)=>{
    axiosInstanse.put("/update-card?id="+id,{
      date_of_birth: date_of_birth,
      gender: gender,
      email: email,
      is_sms: is_sms,
      phone_number: phone_number,
      fullname: fullname,
      status: status
    
    },{headers}).then((data)=>{
      console.log(data.data.body);
      props.handleClose()
      handleSelectStatus();
      props.getData(1)
      showSuccess("Successfully updated!!!");
    }).catch((err)=>{
      console.log(err);
    })

  }
  return (
    <div>
 
        <Box sx={style}>
          <Stack direction='row' justifyContent='space-between'>
            <p className='bannerModalTitle'>Update card</p>
            <IoMdClose className='Xicon' onClick={handleClose} />
          </Stack>
          <Row>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' spacing={-2}>
                <p>Full name:</p>
                <label style={{border:'1px solid black', height:'30px'}}>{props.data.fullname}</label>
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
                <p>Status:</p>
                <select name="" onChange={e => handleSelectStatus(e)} value={status} style={{ height: '30px' }} id="">
                <option key={"status1"} value={1}>Active</option>:
                <option key={"status12"} value={0}>Passive</option>
              </select>
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Date of birth:</p>
                <input onChange={(e)=>setDate_of_birth(e.target.value)} defaultValue={props.data.date_of_birth} type="date" style={{width: '100%'}}  onInput={e =>{let date=e.target.value.slice(8,10)+"/"+e.target.value.slice(5,7)+"/"+e.target.value.slice(0,4); setDate_of_birth(date)}} />
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Phone number:</p>
                <label style={{border:'1px solid black', height:'30px'}}>{props.data.phone_number}</label>
              </Stack>
            </Col>
            <Col lg={6} md={8} xs={12} sm={12}>
              <Stack direction='column' marginTop={2} spacing={-2}>
                <p>Notify type:</p>
                <select name="" id="" style={{ height: '30px' }} onChange={e => handleSelectIsSms(e)}>
                  <option value="1">Inbox</option>
                  <option value="2">Email</option>
                </select>
              </Stack>
            </Col>
            <Col lg={9} md={9} xs={9} sm={9}></Col>
            <Col lg={3} xs={3} md={3} sm={3}>
              <button onClick={()=>UpdateMyCard(props.data.id)} style={{ marginTop: '30px', width: '130px', height: "33px", borderRadius: "8px", background: 'linear-gradient(134.99deg, #7C057B 0%, #CD2791 77.02%)', color: 'white', border: 'transparent', marginLeft: '15px' }}>Update</button>
            </Col>
          </Row>
        </Box>
        <ToastContainer/>
    </div>
  )
}

export default UpdateTmCard
