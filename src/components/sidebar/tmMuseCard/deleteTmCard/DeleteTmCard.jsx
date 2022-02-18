import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IoMdClose } from "react-icons/io";
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { Stack } from '@mui/material';


const style = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    borderRadius: '8px',
    bgcolor: 'background.paper',
    border: 'transparent',
    boxShadow: 24,
    p: 4,
  };

const DeleteTmCard = ({cardId}) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


    const headers = { 
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };

    const deleteTmCard=()=>{
      axiosInstanse.delete('/delete-card?id='+cardId,{headers})
      .then(response=>{
        if(response.data.error){
          alert("Error");
        } else{
          if(response.data.body=='DELETED'){
            handleClose();
            window.location.href = "/tmMuseCard"
            
            
          }
        }
      })
      .catch(ex=>{
        alert(ex);
      });
    }
  return <div>
         <img onClick={handleOpen} src="images/Delete.svg" alt="" />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
          <Stack direction='row' justifyContent='space-between'>
            <p className='deletetitLe'>Do you want delete?</p>
            <IoMdClose onClick={handleClose} className='close' />
          </Stack>
          <Stack direction='row' spacing={3} marginLeft={30} marginTop={3}>
            <button onClick={handleClose} id='noButton'>No</button>
            <button id='yesButton' onClick={deleteTmCard}>YES</button>
          </Stack>
          </Box>
        </Fade>
      </Modal>
  </div>;
};

export default DeleteTmCard;
