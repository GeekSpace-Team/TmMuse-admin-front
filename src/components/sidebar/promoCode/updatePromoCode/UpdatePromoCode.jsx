import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { showSuccess } from '../../../toast/toast';
import { ToastContainer } from 'react-toastify';




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
const UpdatePromoCode = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{props.handleClose()}
  const [profileId, setProfileId] = useState(props.data.profile_id);
  const [allProfileList, setAllProfile] = useState([]);
  const [promo_code,setPromo_code ] = useState(props.data.promo_code);
  const [status,setStatus ] = useState(props.data.status);
  const [profile_id,setProfile_id ] = useState(props.data.profile_id);
  const [user_id,setUser_id ] = useState(props.data.user_id);
  const [allUser, setAllUser] = useState([]);
  const handleSelectStatus = (e) => {
    setStatus(e.target.value);
  }
   console.log(props.data)


  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };
  useEffect(() => {
    axiosInstanse.get("/get-name-profile", { headers })
      .then(response => {
        setAllProfile(response.data.body);
      }).catch((err)=>{
        console.log(err);
      })

      setProfileId(props.data.profile_id)
  }, [])
  console.log("data",props.data)

  useEffect(() => {
    axiosInstanse.get("/get-user-name", { headers })
      .then(response => {
        setAllUser(response.data.body);
      })
  },[])

  const UpdateMyPromoCode = (id)=>{
    axiosInstanse.put("/update-promo-code?id="+id,{
      promo_code: promo_code,
      status: status,
      profile_id: profile_id,
      user_id: user_id
     
    },{headers}).then((data)=>{
      console.log(data.data.body);
      props.handleClose()
      props.getData(1)
      showSuccess('Successfully updated!!!');
    }).catch((err)=>{
      console.log(err);
    })

  }
  return <div>
    
      <Box sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Update promo code</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Promo code:</p>
              <input type="text" onChange={(e)=>setPromo_code(e.target.value)} defaultValue={props.data.promo_code}/>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Profile:</p>
              <select onChange={(e)=>setProfile_id(e.target.value)} value={profile_id} name="" id="" style={{ height: '30px' }} >
                <option value="0">Select...</option>
                {
                  allProfileList.map((element, i) => {
                    return (<option key={"dsfsdffdsf"+element.id} value={element.id}>{element.nameTM}</option>)
                  })
                }
              </select>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>User:</p>
              <select name="" style={{ height: '30px' }} id="" onChange={e => setUser_id(e.target.value)} value={user_id}>
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
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Status:</p>
              <select name="" onChange={e => handleSelectStatus(e)} value={status} style={{ height: '30px' }} id="">
                <option key={"status1"} value={1}>Active</option>:
                <option key={"status12"} value={0}>Passive</option>
              </select>
            </Stack>
          </Col>
        </Row>
        <div className="BannerAddButton" id='addPromoButton'>
          <button onClick={()=>UpdateMyPromoCode(props.data.id)}>Update</button>
        </div>
      </Box>
      <ToastContainer/>
  </div>;
};

export default UpdatePromoCode;
