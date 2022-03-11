import React, { useEffect } from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { IoMdClose } from 'react-icons/io';
import { axiosInstanse } from "../../../utils/axiosInstanse";
import { Col, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { showError, showSuccess, showWarning } from '../../../toast/toast';




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

const AddAds = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [nameTM, setNameTM] = useState('');
  const [nameRU, setNameRU] = useState('');
  const [comment_of_admin, setComment_of_admin] = useState('');
  const [site_url, setSite_url] = useState('');
  const [is_main, setIs_main] = useState(false);
  const [profileId, setProfileId] = useState(0);
  const [selectedFile, setSelectedFile] = useState('');
  const [toAdd, setToAdd] = useState(false);

  const handleAdd = () => {
    setToAdd(!toAdd);
  }
  const [INSERTED_ID, setINSERTED_ID] = useState(0);
  const [allProfileList, setAllProfile] = useState([]);
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

  // function handleInsertedId(id) {
  //   setINSERTED_ID(id);
  // }
  const handleInputChange = (event) => {
    setSelectedFile(event.target.files[0])
  }



  const uploadImage = async (id) => {
    if (id == 0)
      return;
    let data = new FormData()
    data.append('file', selectedFile, "ok.jpg")
    let url = "/update-ads-image?id=" + id;
   
     axiosInstanse.put(url, data, {
      headers
    })
      .then(res => { // then print response status
        console.warn(res);
        handleClose();
        setNameTM("");
        setNameRU("");
        setComment_of_admin("");
        setSite_url("");
        props.getAds(1);
        showSuccess("Successfully added!!!");
      }).catch(ex => {
        // alert("Image upload error:" + ex);
        showError("Image upload error:" + ex);
        setINSERTED_ID(0);
      })

  }


  async function addAds() {
    if (!toAdd)
      return;
    if (profileId != 0 && site_url != "") {
      // alert("Please clear site link fill!")
      showWarning("Please clear site link fill!");
      return;
    }
    if (nameTM == '' || nameRU == '' || selectedFile == '') {
      // alert("Please enter required informations!")
      showWarning("Please enter required informations!");
      return;
    }
    const ads = {
      nameTM: nameTM,
      nameRU: nameRU,
      comment_of_admin: comment_of_admin,
      is_main: is_main,
      site_url: site_url,
      profile_id: profileId,

    };
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
     axiosInstanse.post('/add-ads', ads, { headers })
      .then(response => {
        if (response.data.error) {
          alert("Something is went wrong!")
        } else {
          uploadImage(response.data.body.INSERTED_ID)
        }
        setToAdd(false);
      }).catch(ex => {
        setToAdd(false);
        // alert("Adding error:" + ex);
        showError("Adding error:" + ex);
      });
  }


  useEffect(() => {

    addAds();
  }, [toAdd]);


  
  return <div>
    <button className='Addbuttons' style={{marginRight:"25px"}} onClick={handleOpen}>+ Add ads</button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Add advertisement</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
        <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
            <p className='inputTitle'>Name TM:</p>
            <input type="text" value={nameTM} onInput={e => setNameTM(e.target.value)} required />
              </Stack>
              </Col>
              <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
            <p className='inputTitle'>Profile:</p>
            <select name="" id="" style={{height: '30px'}} onChange={e => setProfileId(e.target.value)}>
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
            <Stack direction='column' spacing={0} marginTop={2}>
            <p className='inputTitle'>Name RU:</p>
            <input type="text" value={nameRU} onInput={e => setNameRU(e.target.value)} required />
              </Stack>
              </Col>
              <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={2}>
            <p className='inputTitle'>Ads image:</p>
            <input type="file" className='custom-file-input' onChange={handleInputChange} />
              </Stack>
              </Col>
              <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={2}>
            <p className='inputTitle'>Site link:</p>
            <input type="text" value={site_url} onInput={e => setSite_url(e.target.value)} />
              </Stack>
              </Col>
              <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={2}>
            <p className='inputTitle'>Is Main?:</p>
            <select name="" id="" style={{height: '30px'}} onChange={e => setIs_main(e.target.value)}>
              <option value="false">No</option>
              <option value="true">Yes</option>
            </select>
              </Stack>
              </Col>
              <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={2}>
            <p className='inputTitle'>Comment of admin:</p>
            <input type="text" value={comment_of_admin} onInput={e => setComment_of_admin(e.target.value)} />
              </Stack>
              </Col>
              <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={2}>
            <p className='cantAdd'> Can't add site link and Prfile together! Only the profile will  be accepted if you enter both!</p>
              </Stack>
              </Col>
        </Row>
        
        <div className="BannerAddButton">
          <button onClick={handleAdd}>+ Add</button>
        </div>
      </Box>
    </Modal>
    <ToastContainer />
  </div>;
};

export default AddAds;

