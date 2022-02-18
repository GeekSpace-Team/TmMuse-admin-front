import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import './AddInterestsModal.css'
import { axiosInstanse } from '../../../utils/axiosInstanse';


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

const AddInterestsModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [titleTM, setTitleTM] = useState('');
  const [titleRU, setTitleRU] = useState('');
  const [itemTM, setItemTM] = useState('');
  const [itemRU, setItemRU] = useState('');
  const [type, setType] = useState('');

  const [toAdd, setToAdd] = useState(false);

  const handleAdd = () => {
    setToAdd(!toAdd);
  }




async function addPost() {
  if (!toAdd)
    return;
    if (titleTM == '' || titleRU == '' || itemTM == '' || itemRU == '' ) {
      alert("Please enter required informations!")
      return;
    }



    const constant = {
      titleTM: titleTM,
      titleRU: titleRU,
      contentTM: itemTM,
      contentRU: itemRU,
      type: type
    };


    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    await axiosInstanse.post('/add-constant', constant, { headers })
      .then(response => {
        if (response.data.error) {
          alert("Something is went wrong!")
        }
        setToAdd(false);
      }).catch(ex => {
        setToAdd(false);
        alert("Adding error:" + ex);
      });
  }



  useEffect(() => {

    addPost();
  }, [toAdd]);


  return <div>
    <button onClick={handleOpen} className='Addbuttons' style={{marginTop: '10px'}}>+ Add interest</button>
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
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid id='interestsInput' item xs={6}>
            <p className='inputTitle'>Title tm:</p>
            <input type="text" value={titleTM} onInput={e => setTitleTM(e.target.value)} style={{ width: '85%' }} />
          </Grid>
          <Grid id='interestsInput' item xs={6}>
            <p className='inputTitle'>Title ru:</p>
            <input type="text" value={titleRU} onInput={e => setTitleRU(e.target.value)} style={{ width: '85%' }} />
          </Grid>
          <Grid item xs={6}>
            <p className='inputTitle'>Items tm(football, music, tennis):</p>
            <textarea name="" id="" value={itemTM} onInput={e => setItemTM(e.target.value)} cols="45" rows="10"></textarea>
          </Grid>
          <Grid item xs={6}>
            <p className='inputTitle'>Items ru(football, music, tennis):</p>
            <textarea name="" value={itemRU} onInput={e => setItemRU(e.target.value)} id="" cols="45" rows="10"></textarea>
          </Grid>
        </Grid>
        <div id='interestsAdd' className="BannerAddButton">
          <button>+ Add</button>
        </div>
      </Box>
    </Modal>
  </div>;
};

export default AddInterestsModal;
