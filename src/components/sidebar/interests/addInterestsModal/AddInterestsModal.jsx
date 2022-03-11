import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import './AddInterestsModal.css'
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { Col, Row } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import { showError, showSuccess, showWarning } from '../../../toast/toast';


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

const AddInterestsModal = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [titleTM, setTitleTM] = useState('');
  const [titleRU, setTitleRU] = useState('');
  const [itemTM, setItemTM] = useState('');
  const [itemRU, setItemRU] = useState('');
  const [type, setType] = useState('');
  const [ interesItems, setInteresItems ] = useState('');

  const [toAdd, setToAdd] = useState(false);

  const handleAdd = () => {
    addInterests();
  }
  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };

  const addInterestItems=(id)=>{
    let tms=itemTM.split(',');
    let rus=itemRU.split(',');
    const body = {
      titleTM: tms,
      titleRU: rus,
      interest_id: id
    }
    axiosInstanse.post("/add-interest-items", body,{ headers })
    .then(response => {
      setTitleRU('');
        setTitleTM('');
        setItemTM('');
        handleClose();
        setItemRU('');
        setType('');
        showSuccess("Successfully added!!!");
        props.getInterests(1);
      }).catch(err=>{
        // alert(err);
        showError(err);
      })
  }
   

  async function addInterests() {
    let tms=itemTM.split(',');
    let rus=itemRU.split(',');
    if (titleTM == '' || titleRU == '' || tms.length==0 || rus.length==0 || tms.length!=rus.length) {
     showWarning('Please enter required informations!');
      return;
    }
    const interests = {
      titleTM: titleTM,
      titleRU: titleRU
    };
     axiosInstanse.post('/add-interests', interests, interesItems, { headers })
      .then(response => {
        if (response.data.error) {
          showWarning('Something is went wrong!');
        }
        addInterestItems(response.data.body.INSERTED_ID);
      }).catch(ex => {
        // alert("Adding error:" + ex);
        showError("Adding error:" + ex);
      });
  }

 

  return <div>
    <button onClick={handleOpen} className='Addbuttons' style={{ marginTop: '10px' }}>+ Add interest</button>
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
      <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Add interest</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Stack direction='column' spacing={0} marginTop={3}>
              <p className='inputTitle'>Title tm:</p>
              <input type="text" value={titleTM} onInput={e => setTitleTM(e.target.value)} />
            </Stack>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Stack direction='column' spacing={0} marginTop={3}>
              <p className='inputTitle'>Title ru:</p>
              <input type="text" value={titleRU} onInput={e => setTitleRU(e.target.value)} />
            </Stack>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Stack direction='column' spacing={0} marginTop={3}>
              <p className='inputTitle'>Items tm(football, music, tennis):</p>
              <textarea name="" id="" value={itemTM} onInput={e => setItemTM(e.target.value)} cols="45" rows="10"></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} sm={12} xs={12}>
            <Stack direction='column' spacing={0} marginTop={3}>
              <p className='inputTitle'>Items ru(football, music, tennis):</p>
              <textarea name="" value={itemRU} onInput={e => setItemRU(e.target.value)} id="" cols="45" rows="10"></textarea>
            </Stack>
          </Col>
        </Row>
        
        <div id='interestsAdd' className="BannerAddButton">
          <button onClick={handleAdd}>+ Add</button>
        </div>
      </Box>
    </Modal>
    <ToastContainer />
  </div>;
};

export default AddInterestsModal;
