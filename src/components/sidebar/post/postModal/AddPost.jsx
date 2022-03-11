import React, { useEffect, useState } from 'react';
import './AddPost.css'
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { Col, Row } from 'react-bootstrap';
// import { getPost } from '../postTable/PostTable';
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

const AddPost = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false); 
  const [nameTM, setNameTM] = useState('');
  const [nameRU, setNameRU] = useState('');
  const [descTM, setDescTM] = useState('');
  const [descRU, setDescRU] = useState('');
  const [promotion, setPromotion] = useState(0);
  const [commentOfAdmin, setCommentOfADmin] = useState('');
  const [status, setStatus] = useState(false);
  const [selectedFile, setSelectedFile] = useState('');
  const allProfileList = props.allProfile;
  const [profileId, setProfileId] = useState(0);
  const [toAdd, setToAdd] = useState(false);

  const handleAdd = () => {
    setToAdd(!toAdd);
  }

  const [INSERTED_ID, setINSERTED_ID] = useState(0);
  
  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };

  function handleInsertedId(id) {
    setINSERTED_ID(id);
  }
  const handleInputChange = (event) => {
    setSelectedFile(event.target.files[0])
  }
  const uploadImage = async () => {
    if (INSERTED_ID == 0)
      return;
    let data = new FormData()
    data.append('file', selectedFile, "ok.jpg")
    let url = "/update-post-image?id=" + INSERTED_ID;
     axiosInstanse.put(url, data, {headers})
      .then(res => { // then print response status
        console.warn(res);
        // alert("Success");
        setINSERTED_ID(0);
        // function chagyr
        handleClose();
        setNameTM("");
        setNameRU("");
        setDescTM("");
        setDescRU("");
        setPromotion(""); 
        setCommentOfADmin("");
        showSuccess('Successfully added!!!');
        props.getPost(1);
      }).catch(ex => {
        // alert("Image upload error:" + ex);
        showError("Image upload error:" + ex);
        setINSERTED_ID(0);
      })

  }
  async function addPost() {
    if (!toAdd)
      return;
    // if (profileId != 0 && siteLink != "") {
    //   alert("Please clear site link fill!")
    //   return;
    // }
    if (nameTM == '' || nameRU == '' || selectedFile == '') {
      // alert("Please enter required informations!")
      showWarning("Please enter required informations!");
      return;
    }
    const post = {
      titleTM: nameTM,
      titleRU: nameRU,
      comment_of_admin: commentOfAdmin,
      status: status,
      profile_id: profileId,
      descriptionTM: descTM,
      descriptionRU: descRU,
      promotion: promotion

    };
  
     axiosInstanse.post('/add-posts', post, { headers })
      .then(response => {
        if (response.data.error) {
          // alert("Something is went wrong!")
          showWarning("Something is went wrong!");
        } else {
          setINSERTED_ID(response.data.body.INSERTED_ID);
        }
        setToAdd(false);
      }).catch(ex => {
        setToAdd(false);
        // alert("Adding error:" + ex);
        showWarning("Adding error:" + ex);
      });
  }

  useEffect(() => {

    addPost();
  }, [toAdd]);

  useEffect(() => {
    if (INSERTED_ID == 0)
      return;
    uploadImage();
  }, [INSERTED_ID]);

  return <div>
    <button className='Addbuttons' style={{ marginTop: '10px', marginRight: '25px' }} onClick={handleOpen}>+ Add post</button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Add post</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Name TM:</p>
              <input type="text" value={nameTM} onInput={e => setNameTM(e.target.value)} />
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
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Name RU:</p>
              <input type="text" value={nameRU} onInput={e => setNameRU(e.target.value)} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Post image:</p>
              <input type="file" className='custom-file-input' onChange={handleInputChange} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Description TM:</p>
              <textarea name="" id="" cols="20" rows="4" value={descTM} onInput={e => setDescTM(e.target.value)}></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Description RU:</p>
              <textarea name="" id="" cols="20" rows="4" value={descRU} onInput={e => setDescRU(e.target.value)}></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Promotion:</p>
              <input type="text" value={promotion} onInput={e => setPromotion(e.target.value)} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Comment of admin:</p>
              <input type="text" value={commentOfAdmin} onInput={e => setCommentOfADmin(e.target.value)} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Status:</p>
              <select name="" style={{ height: '30px' }} id="" onChange={e => setStatus(e.target.value)}>
                <option value={true}>Status...</option>\
                <option value={true}>ACTIVE</option>
                <option value={false}>PASSIVE</option>
              </select>
            </Stack>
          </Col>
        </Row>
        <div id='addPostButton' className="BannerAddButton">
          <button onClick={handleAdd}>+ Add</button>
        </div>
      </Box>
    </Modal>
    <ToastContainer />
  </div>;
};

export default AddPost;
