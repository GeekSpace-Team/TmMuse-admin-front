import React, { useState, useEffect,useRef  } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { showError, showSuccess, showWarning } from '../../../toast/toast';
import { ToastContainer } from 'react-toastify';
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

const AddConstant = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  


  const [titleTM, setTitleTM] = useState('');
  const [titleRU, setTitleRU] = useState('');
  const [contentTM, setContentTm] = useState("Start writing");
  const [contentRU, setContentRU] = useState("Start writing");
  const [ contentTM_dark, setContentTM_dark ] = useState("Start writing");
  const [ contentRU_dark, setContentRU_dark ] = useState("Start writing");
  const [type, setType] = useState('');


 
  const [toAdd, setToAdd] = useState(false);

  const handleAdd = () => {
    setToAdd(!toAdd);
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



async function addConstant() {
  if (!toAdd)
    return;
    if (titleTM == '' || titleRU == '' || contentTM == '' || contentRU == '' ) {
      // alert("Please enter required informations!")
      showWarning("Please enter required informations!");
      return;
    }



    const constant = {
      titleTM: titleTM,
      titleRU: titleRU,
      contentTM: contentTM,
      contentRU: contentRU,
      contentTM_dark: contentTM_dark,
      contentRU_dark: contentRU_dark,
      type: type
    };


    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
     axiosInstanse.post('/add-constant', constant, { headers })
      .then(response => {
        if (response.data.error) {
          alert("Something is went wrong!")
        }
        setTitleTM('');
        setTitleRU('');
        setContentTm('');
        setContentRU('');
        setContentTM_dark('');
        setContentRU_dark('');
        setType('');
        handleClose();
        props.getConstant(1);
        setToAdd(false);
        showSuccess("Successfully added!!!");
      }).catch(ex => {
        setToAdd(false);
        // alert("Adding error:" + ex);
        showError("Adding error:" + ex);
      });
  }



  useEffect(() => {

    addConstant();
  }, [toAdd]);


 


  return <div>
    <button onClick={handleOpen} className='Addbuttons' style={{marginTop: '10px', width: '150px'}}>+ Add constant</button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Row>
          <Col lg={3} md={4} xs={4} sm={4}>
            <p style={{color: '#7C057B', fontWeight: '600', fontSize: "20px" }}>Add constant</p>
          </Col>
          <Col lg={6} md={4} xs={4} sm={4}></Col>
          <Col lg={3} md={4} xs={4} sm={4}>
            <IoMdClose style={{marginLeft: '220px'}} onClick={handleClose}/>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Title tm:</p>
              <input type="text" value={titleTM} onInput={e => setTitleTM(e.target.value)}></input>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Title ru:</p>
              <input type="text" value={titleRU} onInput={e => setTitleRU(e.target.value)}></input>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Content tm:</p>
              <JoditEditor
              ref={editor}
              value={contentTM}
              config={config}
              onBlur={newContent => setContentTm(newContent)}
            />
              {/* <textarea name="" id="" cols="30" rows="5" value={contentTM} onInput={e => setContentTm(e.target.value)}></textarea> */}
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
              {/* <textarea name="" id="" cols="30" rows="5" value={contentRU} onInput={e => setContentRU(e.target.value)}></textarea> */}
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
              {/* <textarea name="" id="" cols="30" rows="5" value={contentTM_dark} onInput={e => setContentTM_dark(e.target.value)}></textarea> */}
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
              {/* <textarea name="" id="" cols="30" rows="5" value={contentRU_dark} onInput={e => setContentRU_dark(e.target.value)}></textarea> */}
            </Stack>
          </Col>
          <Col lg={3} md={6} xs={12} sm={12}>
            <Stack direction='column' marginTop={3} spacing={-2}>
              <p style={{ color: '#31456A', fontSize: '15px' }}>Type:(about privacy)</p>
              <input type="text" value={type} onInput={e => setType(e.target.value)}></input>
            </Stack>
          </Col>
          <Col lg={9} md={9} xs={9} sm={9}></Col>
          <Col lg={9} md={6} xs={6} sm={6}></Col>
          <Col lg={3} md={6} xs={6} sm={6} >
            <button onClick={handleAdd} style={{width: '130px',marginLeft:'115px', height: '33px', background: 'linear-gradient(134.99deg, #7C057B 0%, #CD2791 77.02%)', borderRadius: '6px', border: 'transparent', color: 'white'}} >Add</button>
          </Col>
        </Row>
      </Box>
    </Modal>
    <ToastContainer/>
  </div>;
};

export default AddConstant;
