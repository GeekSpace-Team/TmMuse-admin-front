import React, { useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';
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

const UpdatePost = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () =>{props.handleClose()}
  const [profileId, setProfileId] = useState(props.data.profile_id);
  const [allProfileList, setAllProfile] = useState([]);
  const [titleTm,setTitleTm ] = useState(props.data.titleTM);
  const [titleRU,setTitleRU ] = useState(props.data.titleRU);
  const [promotion,setPromotion ] = useState(props.data.promotion);
  const [profile_id,setProfile_id ] = useState(props.data.profile_id);
  const [status,setStatus ] = useState(props.data.status);
  const [descriptionTM,setDescriptionTM] = useState(props.data.descriptionTM);
  const [descriptionRU,setDescriptionRU ] = useState(props.data.descriptionRU);
  const [comment_of_admin,setComment_of_admin ] = useState(props.data.comment_of_admin);
  const [INSERTED_ID, setINSERTED_ID] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleSelectStatus = (e) => {
    setStatus(e.target.value);
  }


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
    let url = "/update-post-image?id=" + id;
     axiosInstanse.put(url, data, {headers})
      .then(res => { // then print response status
        console.warn(res);
        props.handleClose()
        props.getData(1);
      }).catch(ex => {
        // alert("Image upload error:" + ex);
        showError("Image upload error:" + ex);
      })

  }

  const UpdateMyPost = (id)=>{
    axiosInstanse.put("/update-posts?id="+id,{
      titleTM: titleTm,
      titleRU: titleRU,
      promotion: promotion,
      profile_id: profile_id,
      descriptionTM: descriptionTM,
      descriptionRU: descriptionRU,
      comment_of_admin: comment_of_admin,
      status: status
    
    },{headers}).then((data)=>{
      console.log("result",data.data.body);
      if(selectedFile==null){
        props.handleClose()
        props.getData(1);
        showSuccess("Successfully updated!!!")
      }else{
        uploadImage(props.data.id)
      }
     

    }).catch((err)=>{
      console.log(err);
    })

  }


  

  return <div>
    <img src="images/Edit.svg" onClick={handleOpen} alt="" />
   
      <Box sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Update post</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Name TM:</p>
              <input type="text" onChange={(e)=>setTitleTm(e.target.value)} defaultValue={props.data.titleTM} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
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
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Name RU:</p>
              <input type="text" onChange={(e)=>setTitleRU(e.target.value)} defaultValue={props.data.titleRU} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Post image:</p>
              <input className='custom-file-input' type="file" onChange={handleInputChange} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Description TM:</p>
              <textarea name="" id="" cols="20" rows="4" onChange={(e)=>setDescriptionTM(e.target.value)} defaultValue={props.data.descriptionTM}></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5} >
              <p className='inputTitle'>Description RU:</p>
              <textarea name="" id="" cols="20" rows="4" onChange={(e)=>setDescriptionRU(e.target.value)} defaultValue={props.data?.descriptionRU}></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Promotion:</p>
              <input type="text" onChange={(e)=>setPromotion(e.target.value)} defaultValue={props.data.promotion} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Comment of admin:</p>
              <input type="text" onChange={(e)=>setComment_of_admin(e.target.value)} defaultValue={props.data.comment_of_admin} />
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0} marginTop={1.5}>
              <p className='inputTitle'>Status:</p>
              <select name="" onChange={e => handleSelectStatus(e)} value={status} style={{ height: '30px' }} id="">
                <option key={"status1"} value={true}>Active</option>:
                <option key={"status12"} value={false}>Passive</option>
              </select>
            </Stack>
          </Col>
        </Row>
        <div id='addPostButton' className="BannerAddButton">
          <button onClick={()=>UpdateMyPost(props.data.id)}>Update</button>
        </div>
      </Box>
      <ToastContainer />
  </div>;
};

export default UpdatePost;
