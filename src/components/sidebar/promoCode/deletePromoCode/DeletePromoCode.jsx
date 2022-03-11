import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { IoMdClose } from "react-icons/io";
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { Stack } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import { showError, showSuccess } from '../../../toast/toast';

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

const DeletePromoCode = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {props.handleClose()}


    const headers = { 
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };

    const deletePromoCode=()=>{
      axiosInstanse.delete('/delete-promo-code?id='+props.promo_codeId,{headers})
      .then(response=>{
        if(response.data.error){
          alert("Error");
        } else{
          if(response.data.body=='DELETED'){
            handleClose();
            props.getData(1);            
            showSuccess("Successfully deleted!!!");
          }
        }
      })
      .catch(ex=>{
        // alert(ex);
        showError(ex);
      });
    }
  return <div>
      
        <Fade in={true}>
          <Box sx={style}>
          <Stack direction='row' justifyContent='space-between'>
            <p className='deletetitLe'>Do you want delete?</p>
            <IoMdClose onClick={handleClose} className='close' />
          </Stack>
          <Stack direction='row' spacing={3} marginLeft={30} marginTop={3}>
            <button onClick={handleClose} id='noButton'>No</button>
            <button id='yesButton' onClick={deletePromoCode}>YES</button>
          </Stack>
          </Box>
        </Fade>
        <ToastContainer />
  </div>;
};

export default DeletePromoCode;
