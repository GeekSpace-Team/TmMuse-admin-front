import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Stack from '@mui/material/Stack';
import './AddBannerModal.css'
import { IoMdClose } from 'react-icons/io';
import { axiosInstanse } from '../../../../utils/axiosInstanse';
import { Col, Row } from 'react-bootstrap';



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

const AddBannerModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [siteLink, setSiteLink] = useState('');
  const [profile_id, setPofile_id] = useState(0);
  const [order, setOrder] = useState(0);
  const [comment_of_admin, setComment_of_admin] = useState('');
  const [selectedFile, setSelectedFile] = useState('');



  const [toAdd, setToAdd] = useState(false);

  const handleAdd = () => {
    setToAdd(!toAdd);
  }

  const [INSERTED_ID, setINSERTED_ID] = useState(0);

  const [allProfileList, setAllProfile] = useState([]);

  useEffect(() => {
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    axiosInstanse.get("/get-name-profile", { headers })
      .then(response => {
        setAllProfile(response.data.body);
      })
  },[])

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
    let url = "/update-banner-image?id=" + INSERTED_ID;
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar',
      'Content-Type': 'multipart/form-data'
    };
    await axiosInstanse.put(url, data, {
      headers
    })
      .then(res => { // then print response status
        console.warn(res);
        alert("Success");
        setINSERTED_ID(0);
      }).catch(ex => {
        alert("Image upload error:" + ex);
        setINSERTED_ID(0);
      })

  }

  async function addBanner() {
    if (!toAdd)
      return;
    if (profile_id != 0 && siteLink != "") {
      alert("Please clear site link fill!")
      return;
    }
    if (selectedFile == '') {
      alert("Please enter required informations!")
      return;
    }

    const banner = {
      comment_of_admin: comment_of_admin,
      link: siteLink,
      profile_id: profile_id,
      order: order

    };


    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    await axiosInstanse.post('/add-banner', banner, { headers })
      .then(response => {
        if (response.data.error) {
          alert("Something is went wrong!")
        } else {
          setINSERTED_ID(response.data.body.INSERTED_ID);
        }
        setToAdd(false);
      }).catch(ex => {
        setToAdd(false);
        alert("Adding error:" + ex);
      });
  }

  useEffect(() => {

    addBanner();
  }, [toAdd]);

  useEffect(() => {
    if (INSERTED_ID == 0)
      return;
    uploadImage();
  }, [INSERTED_ID]);

  return (
    <div>
      <button onClick={handleOpen}>+ Add banner</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >

        <Box sx={style}>
          <Stack direction='row' justifyContent='space-between'>
            <p className='bannerModalTitle'>Add banner</p>
            <IoMdClose className='Xicon' onClick={handleClose} />
          </Stack>
          <Row>
            <Col lg={6} md={6} xs={12} sm={12}>
              <Stack direction='column' spacing={0}>
                <p className='inputTitle'>Site link:</p>
                <input type="text" value={siteLink} onInput={e => setSiteLink(e.target.value)} />
              </Stack>
            </Col>
            <Col lg={6} md={6} xs={12} sm={12}>
              <Stack direction='column' spacing={0}>
                <p className='inputTitle'>Profile:</p>
                <select style={{height: '30px'}} name="" id="" onChange={e => setPofile_id(e.target.value)}>
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
                <p className='inputTitle'>Order:</p>
                <input type="text" value={order} onInput={e => setOrder(e.target.value)} />
              </Stack>
            </Col>
            <Col lg={6} md={6} xs={12} sm={12}>
              <Stack direction='column' spacing={0} marginTop={2}>
                <p className='inputTitle'>Banner image:</p>
                <input type="file" className='custom-file-input' onChange={handleInputChange} />
              </Stack>
            </Col>
            <Col lg={6} md={6} xs={12} sm={12}>
              <Stack direction='column' spacing={0} marginTop={2}>
                <p className='inputTitle'>Comment of admin:</p>
                <input type="text" value={comment_of_admin} onInput={e => setComment_of_admin(e.target.value)} />
              </Stack>
            </Col>

          </Row>
          <p className='cantAdd'> Can't add site link and Prfile together! Only the profile will  be accepted if you enter both!</p>
          <div className="BannerAddButton">
            <button onClick={handleAdd}>+ Add</button>
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default AddBannerModal
