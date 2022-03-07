import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { IoMdClose } from 'react-icons/io';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../../utils/axiosInstanse';



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

  const UpdateBannerModal = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () =>{props.handleClose()}
    const [profileId, setProfileId] = React.useState(props.data.profile_id);
    const [allProfileList, setAllProfile] = useState([]);
    const [profile_id,setProfile_id ] = useState(props.data.profile_id);
    const [link,setLink ] = useState(props.data.link);
    const [order,setOrder ] = useState(props.data.order);
    const [comment_of_admin,setComment_of_admin ] = useState(props.data.comment_of_admin);
    const [INSERTED_ID, setINSERTED_ID] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);

    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    useEffect(() => {
      axiosInstanse.get("/get-name-profile", { headers })
        .then(response => {
          setAllProfile(response.data.body);
        }).catch((err)=>{
          console.log(err);
        })
  
        setProfileId(props.data.profile_id)
    }, [])
    console.log("data",props.data)
  
    const handleInputChange = (event) => {
      console.log(event.target.files[0])
      setSelectedFile(event.target.files[0])
    }
    const uploadImage = async (id) => {
     
      let data = new FormData()
      data.append('file', selectedFile, "ok.jpg")
      let url = "/update-banner-image?id=" + id;
       axiosInstanse.put(url, data, {headers})
        .then(res => { // then print response status
          console.warn(res);
          props.handleClose()
          props.getData(1);
        }).catch(ex => {
          alert("Image upload error:" + ex);
        })
  
    }
  
  
    const UpdateMyBanner = (id)=>{
      axiosInstanse.put("/update-banner?id="+id,{
        profile_id: profile_id,
        link: link,
        order: order,
        comment_of_admin: comment_of_admin

      },{headers}).then((data)=>{
        console.log(data.data.body);
        if(selectedFile===null){
          props.handleClose()
          props.getData(1);
        }else{
          uploadImage(props.data.id)
        }
      }).catch((err)=>{
        console.log(err);
      })
  
    }
    return (
        <div>
              
        <Box sx={style}>
      <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Update banner</p>
          <IoMdClose className='Xicon' onClick={handleClose}/>
      </Stack>
      <Row>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} >
            <p className='inputTitle'>Site link:</p>
            <input type="text" onChange={(e)=>setLink(e.target.value)} defaultValue={props.data.link}/>
          </Stack>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} >
          <p className='inputTitle'>Profile:</p>
          <select onChange={(e)=>setProfile_id(e.target.value)} value={profile_id} name="" id="" style={{ height: '30px' }} >
                <option value="0">Select...</option>
                {
                  allProfileList.map((element, i) => {
                    return (<option key={"dsfsdffdsf"+element.id} value={element.id}>{element.nameTM}</option>)
                  })
                }
              </select>
          </Stack>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} marginTop={2}>
            <p className='inputTitle'>Order:</p>
            <input type="text" onChange={(e)=>setOrder(e.target.value)} defaultValue={props.data.order} />
          </Stack>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} marginTop={2}>
            <p className='inputTitle'>Banner image:</p>
            <input type='file' className='custom-file-input' onChange={handleInputChange} />
          </Stack>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} marginTop={2}>
            <p className='inputTitle'>Comment of admin:</p>
            <input type="text" onChange={(e)=>setComment_of_admin(e.target.value)} defaultValue={props.data.comment_of_admin}/>
          </Stack>
        </Col>
        <Col lg={6} md={6} xs={12} sm={12}>
          <Stack direction='column' spacing={0} marginTop={2}>
            <p className='cantAdd'> Can't add site link and Prfile together! Only the profile will  be accepted if you enter both!</p>
          </Stack>
        </Col>
      </Row>
            <div className="BannerAddButton">
                <button onClick={()=>UpdateMyBanner(props.data.id)}>Update</button>
            </div>
        </Box>
        </div>
    )
}

export default UpdateBannerModal
