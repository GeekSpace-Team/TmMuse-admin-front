import React, { useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { showError, showSuccess } from '../../../toast/toast';


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1100,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};


const UpdateInterestsModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{props.handleClose()}
  const [profileId, setProfileId] = useState(props.data.profile_id);
  const [allProfileList, setAllProfile] = useState([]);
  const [titleTM,setTitleTM ] = useState(props.data.titleTM);
  const [titleRU,setTitleRU ] = useState(props.data.titleRU);
  const [items,setItems]=useState(props.data.items);
  const [itemTM, setItemTM] = useState('');
  const [itemRU, setItemRU] = useState('');


  useEffect(()=>{
    let a="",b="";
    for(let k=0;k<items.length;k++){
      a+=items[k].titleTM;
      b+=items[k].titleRU;
      if(k<items.length-1){
        a+=",";
        b+=",";
      }
    }
    setItemTM(a);
    setItemRU(b);
  },[]);

  

  

  
  const headers = {
    'Authorization': 'Bearer my-token', 
    'My-Custom-Header': 'foobar'
  };


  // const UpdateIterestItems = (id) => {
  //   axiosInstanse.put("/update-interest-items?id="+id, {

  //   })
  // }
  

  const UpdateMyInterests = (id)=>{
    axiosInstanse.put("/update-interest?id="+id,{
      titleTM: titleTM,
      titleRU: titleRU

    },{headers}).then((data)=>{
      console.log(data.data.body);
      updateInterestItems(id)
    }).catch((err)=>{
      console.log(err);
    })

  }


  const updateInterestItems=(id)=>{
    let tms=itemTM.split(',');
    let rus=itemRU.split(',');
    const body = {
      titleTM: tms,
      titleRU: rus,
      interest_id: id
    }
    axiosInstanse.put("/update-interest-items?id="+id, body,{ headers })
    .then(response => {
        setTitleRU('');
        setTitleTM('');
        setItemTM('');
        handleClose();
        setItemRU('');
        props.handleClose()
        props.getData(1)
        showSuccess('Successfully updated!!!');
      }).catch(err=>{
        // alert(err);
        showError(err);
      })
  }
   


  return <div>
    
      <Box sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Update interest</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Title tm:</p>
              <input type="text" onChange={(e)=>setTitleTM(e.target.value)} defaultValue={props.data.titleTM}/>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Title ru:</p>
              <input type="text" onChange={(e)=>setTitleRU(e.target.value)} defaultValue={props.data.titleRU} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Items tm(football, music, tennis):</p>
              <textarea name="" id="" cols="45" rows="10" onChange={(e)=>setItemTM(e.target.value)} defaultValue={itemTM}></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Items ru(football, music, tennis):</p>
              <textarea name="" id="" cols="45" rows="10" onChange={(e)=>setItemRU(e.target.value)} defaultValue={itemRU}></textarea>
            </Stack>
          </Col>
        </Row>
        <div id='interestsAdd' className="BannerAddButton">
          <button onClick={()=>UpdateMyInterests(props.data.id)}>Update</button>
        </div>
      </Box>
    <ToastContainer />
  </div>;
};

export default UpdateInterestsModal;
