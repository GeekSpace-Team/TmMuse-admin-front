import React, { useState,useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import { IoMdClose } from 'react-icons/io';
import axios from 'axios'
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { showError, showSuccess, showWarning } from '../../../toast/toast';
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

const AddPop = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [siteLink, setSiteLink] = useState('');
  const [titleTm, setTitleTm] = useState('');
  const [titleRu, setTitleRu] = useState('');
  const [descTm, setDescTm] = useState('');
  const [descRu, setDescRu] = useState('');
  const [profileId, setProfileId] = useState(0);
  const [ posts_id, setPosts_id ] = useState(0);
  const [selectedFile, setSelectedFile] = useState('');
  const [ comment_of_admin, setComment_of_admin ] = useState('');
  const [toAdd, setToAdd] = useState(false);
  const handleAdd = () => {
    setToAdd(!toAdd);
  }
  const [INSERTED_ID, setINSERTED_ID] = useState(0);
  const [allProfileList, setAllProfile] = useState([]);
  const [ allPost, setAllPost ] = useState([]);
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

  useEffect(() => {
    axiosInstanse.get("/get-all-posts", { headers })
    .then(response => {
      setAllPost(response.data.body);
    }).catch(ex => {
      console.log("Postda bir problema bar:" + ex);
    })
  },[])


  const handleInputChange = (event) => {
    setSelectedFile(event.target.files[0])
  }



  const uploadImage = async (id) => {
    if (id == 0)
      return;
    let data = new FormData()
    data.append('file', selectedFile, "ok.jpg")
    let url = "/add-popup-image?id=" + id;
    console.log(" data:",data)
     axiosInstanse.put(url, data, {headers})
      .then(res => { // then print response status
        console.log("uploud Image",res);
        handleClose();
        setTitleTm("");
        setTitleRu("");
        setSiteLink("");
        setDescTm('');
        setDescRu('');
        props.getPopup(1);
        showSuccess('Successfully added!!!');
      }).catch(ex => {
        // alert("Image upload error:" + ex);
        showError("Image upload error:" + ex);
      })
  }


  async function addPopup() {
    if (!toAdd)
      return;
    if (profileId != 0 && siteLink != "") {
      // alert("Please clear site link fill!")
      showWarning("Please clear site link fill!");
      return;
    }
    if (titleTm == '' || titleRu == '' ) {
      // alert("Please enter required informations!")
      showWarning("Please enter required informations!");
      return;
    }
    const popup = {
      site_url: siteLink,
      titleTM: titleTm,
      titleRU: titleRu,
      descriptionTM: descTm,
      descriptionRU: descRu,
      profile_id: profileId,
      posts_id: posts_id,
      comment_of_admin:comment_of_admin
    };
  
     axiosInstanse.post('/add-popup', popup, { headers })
      .then(response => {
        if (response.data.error) {
          alert("Something is went wrong!")
        } else {
          console.log(response.data.body.INSERTED_ID)

          uploadImage(response.data.body.INSERTED_ID)
        }
        setToAdd(false);
        console.log("respons",response.data)
      }).catch(ex => {
        setToAdd(false);
        // alert("Adding error:" + ex);
        showError("Adding error:" + ex);
      });
  }

  useEffect(() => {

    addPopup();
  }, [toAdd]);

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
              <select name="" id="" style={{ height: '30px' }} onChange={e => setProfileId(e.target.value)}>
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
              <select name="" id="" style={{ height: '30px' }} onChange={e => setPosts_id(e.target.value)}>
                <option value="0">Select...</option>
                {
                  allPost.map((element, i) => {
                    return (<option value={element.id}>{element.titleTM}</option>)
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
              <p className='inputTitle'>Comment of Admin:</p>
              <input type="text" value={comment_of_admin} onInput={e => setComment_of_admin(e.target.value)} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='cantAdd'> Can't add site link and Prfile together! Only the profile will  be accepted if you enter both!</p>
            </Stack>
          </Col>
        </Row>
        <div className="BannerAddButton">
          <button onClick={handleAdd}>+ Add</button>
        </div>
      </Box>
    </Modal>
    <ToastContainer/>
  </div>;
};

export default AddPop;
