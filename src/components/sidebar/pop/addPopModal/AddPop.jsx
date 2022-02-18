import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios'
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

const AddPop = ({allProfileList,allPosts}) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const [siteLink, setSiteLink] = useState('');
  const [titleTm, setTitleTm] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [descTm, setDescTm] = useState('');
  const [descRu, setDescRu] = useState('');
  const [INSERTED_ID, setINSERTED_ID] = useState(0);
  const [selectedFile, setSelectedFile] = useState('');
  const [profile_id, setProfileID] = useState(0);


  

 


  // File upload section

  const handleInputChange = (event) => {
    setSelectedFile(event.target.files[0])
  }

  const uploadImage = () => {
    let data = new FormData()
    data.append('file', selectedFile)
    let url = "http://10.192.168.16:5000/add-popup-image?id=" + INSERTED_ID;
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar',
      'Content-Type': 'multipart/form-data'
    };
    axios.put(url, data, {
      headers
    })
      .then(res => { // then print response status
        // console.warn(res);
        alert("Success");
      }).catch(ex => {
        alert(ex);
      })

  }
  // End of file upload section




  const addPopup = () => {
    if (profile_id != 0 && siteLink != "") {
      alert("Please clear site link fill!")
      return;
    }
    if (titleTm == '' || titleRu == '' || selectedFile == '') {
      alert("Please enter required informations!")
      return;
    }
    const popup = {
      site_url: siteLink,
      titleTM: titleTm,
      titleRU: titleRu,
      descriptionTM: descTm,
      descriptionRU: descRu,
      profile_id: profile_id,
      comment_of_admin: ""
    };
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    axios.post('http://10.192.168.16:5000/add-popup', popup, { headers })
      .then(response => {
        if (response.data.error) {
          alert("Something is went wrong!")
        } else {
          setINSERTED_ID(response.data.body.INSERTED_ID);
          uploadImage();
        }
      }).catch(ex => {
        alert(ex);
      });
  }
  return <div>
    <button onClick={handleOpen} className='Addbuttons' style={{ marginTop: '10px' }}>+ Add pop-up</button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle' >Add pop-up</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Title tm:</p>
              <input type="text" value={titleTm} onInput={e => setTitleTm(e.target.value)} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Title ru:</p>
              <input type="text" value={titleRu} onInput={e => setTitleRu(e.target.value)} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Pop-up image:</p>
              <input type="file" className='custom-file-input' onChange={handleInputChange} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Profile:</p>
              <select name="" id="" style={{ height: '30px' }} onChange={e => setProfileID(e.target.value)}>
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
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Site link:</p>
              <input type="text" value={siteLink} onInput={e => setSiteLink(e.target.value)} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Post:</p>
              <select name="" style={{ height: '30px' }} id="">
                <option value="">Select...</option>
                {
                  allPosts.map((element,i)=>{
                    return(<option value={element.id}>{element.titleTM}</option>)
                  })
                }
                </select>

            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Description tm:</p>
              <textarea name="" id="" cols="20" rows="4" value={descTm} onInput={e => setDescTm(e.target.value)} ></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Description ru:</p>
              <textarea name="" id="" cols="20" rows="4" value={descRu} onInput={e => setDescRu(e.target.value)}></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='cantAdd'> Can't add site link and Prfile together! Only the profile will  be accepted if you enter both!</p>
            </Stack>
          </Col>
        </Row>
        <div className="BannerAddButton">
          <button onClick={addPopup}>+ Add</button>
        </div>
      </Box>
    </Modal>
  </div>;
};

export default AddPop;
