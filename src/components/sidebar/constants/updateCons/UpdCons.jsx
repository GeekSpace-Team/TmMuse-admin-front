import React, { useEffect, useState,useRef } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { ToastContainer } from 'react-toastify';
import { showSuccess } from '../../../toast/toast';
import JoditEditor from "jodit-react";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '99%',
    bgcolor: 'background.paper',
    boxShadow: 24,
    overflow: 'scroll',
    p: 4,
    display: 'block',
};

const UpCons = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{props.handleClose()}
  const [titleTm,setTitleTm ] = useState(props.data.titleTM);
  const [titleRU,setTitleRU ] = useState(props.data.titleRU);
  const [contentTM,setContentTM ] = useState(props.data.contentTM);
  const [contentRU,setContentRU ] = useState(props.data.contentRU);
  const [contentTM_dark,setContentTM_dark ] = useState(props.data.contentTM_dark);
  const [contentRU_dark,setContentRU_dark ] = useState(props.data.contentRU_dark);
  const [type,setType ] = useState(props.data.type);


  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };
  const UpdateMyConstant = (id)=>{
    axiosInstanse.put("/update-constant?id="+id,{
      titleTM: titleTm,
      titleRU: titleRU,
      contentTM: contentTM,
      contentRU: contentRU,
      contentTM_dark: contentTM_dark,
      contentRU_dark: contentRU_dark,
      type: type
    
    },{headers}).then((data)=>{
      console.log(data.data.body);
      props.handleClose()
      props.getData(1)
      showSuccess("Successfully updated!!!");
    }).catch((err)=>{
      console.log(err);
    })

  }

  const editor = useRef(null);
  const config = {
    readonly: false,
    height: 400
  };

  const configDark = {
    readonly: false,
    height: 400,
    theme : 'dark'
  };

  return <div>
    <img src="images/Edit.svg" onClick={handleOpen} alt="" />
   
      <Box sx={style}>
        <Row>
          <Col lg={3} md={4} xs={4} sm={4}>
            <p style={{color: '#7C057B', fontWeight: '600', fontSize: "20px" }}>Update constant</p>
          </Col>
          <Col lg={6} md={4} xs={4} sm={4}></Col>
          <Col lg={3} md={4} xs={4} sm={4}>
            <IoMdClose style={{marginLeft: '220px'}} onClick={handleClose}/>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Title tm:</p>
              <input type="text" onChange={(e)=>setTitleTm(e.target.value)} defaultValue={props.data.titleTM}></input>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Title ru:</p>
              <input type="text" onChange={(e)=>setTitleRU(e.target.value)} defaultValue={props.data.titleTM}></input>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Content tm:</p>
              <JoditEditor
              ref={editor}
              value={contentTM}
              config={config}
              onBlur={newContent => setContentTM(newContent)}
            />
              {/* <textarea name="" id="" cols="30" rows="5" onChange={(e)=>setContentTM(e.target.value)} defaultValue={props.data.contentTM}></textarea> */}
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Content ru:</p>
              <JoditEditor
              ref={editor}
              value={contentRU}
              config={config}
              onBlur={newContent => setContentRU(newContent)}
            />
              {/* <textarea name="" id="" cols="30" rows="5"  onChange={(e)=>setContentRU(e.target.value)} defaultValue={props.data.contentRU}></textarea> */}
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>ContentTM dark:</p>
              <JoditEditor
              ref={editor}
              value={contentTM_dark}
              config={configDark}
              onBlur={newContent => setContentTM_dark(newContent)}
            />
              {/* <textarea name="" id="" cols="30" rows="5" onChange={(e)=>setContentTM_dark(e.target.value)} defaultValue={props.data.contentTM_dark} ></textarea> */}
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>ContentRU dark:</p>
              <JoditEditor
              ref={editor}
              value={contentRU_dark}
              config={configDark}
              onBlur={newContent => setContentRU_dark(newContent)}
            />
              {/* <textarea name="" id="" cols="30" rows="5" onChange={(e)=>setContentRU_dark(e.target.value)} defaultValue={props.data.contentRU_dark} ></textarea> */}
            </Stack>
          </Col>
          <Col lg={3} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Type:(about privacy)</p>
              <input type="text" onChange={(e)=>setType(e.target.value)} defaultValue={props.data.type}></input>
            </Stack>
          </Col>
          <Col lg={9} md={9} xs={9} sm={9}></Col>
          <Col lg={9} md={6} xs={6} sm={6}></Col>
          <Col lg={3} md={6} xs={6} sm={6} >
            <button onClick={()=>UpdateMyConstant(props.data.id)} style={{width: '130px',marginLeft:'115px', height: '33px', background: 'linear-gradient(134.99deg, #7C057B 0%, #CD2791 77.02%)', borderRadius: '6px', border: 'transparent', color: 'white'}}>Update</button>
          </Col>
        </Row>
      </Box>
      <ToastContainer/>
  </div>;
};

export default UpCons;
