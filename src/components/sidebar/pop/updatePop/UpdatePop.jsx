import React,{useState, useEffect} from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { IoMdClose } from 'react-icons/io';
import { Col, Row } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import { showError, showSuccess } from '../../../toast/toast';
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



const UpdatePop = (props) => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => {props.handleClose()}
    const [allProfileList, setAllProfile] = useState([]);
    const [profileId, setProfileId] = useState(props.data.profile_id);
    const [titleTM,setTitleTm ] = useState(props.data.titleTM);
    const [titleRU,setTitleRU ] = useState(props.data.titleRU);
    // const [promotion,setPromotion ] = useState(props.data.promotion);
    const [profile_id,setProfile_id ] = useState(props.data.profile_id);
    const [descriptionTM,setDescriptionTM] = useState(props.data.descriptionTM);
    const [descriptionRU,setDescriptionRU ] = useState(props.data.descriptionRU);
    const [comment_of_admin,setComment_of_admin ] = useState(props.data.comment_of_admin);
    const [site_url,setSite_url ] = useState(props.data.site_url);
    const [ allPost, setAllPost ] = useState([]);
    const [INSERTED_ID, setINSERTED_ID] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [ posts_id, setPosts_id ] = useState(props.data.posts_id);

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
    console.log(props)

    useEffect(() => {
      axiosInstanse.get("/get-all-posts", { headers })
      .then(response => {
        setAllPost(response.data.body);
      }).catch(ex => {
        console.log("Postda bir problema bar:" + ex);
      })
    },[])


      
  const handleInputChange = (event) => {
    console.log(event.target.files[0])
    setSelectedFile(event.target.files[0])
  }
  const uploadImage = async (id) => {
   
    let data = new FormData()
    data.append('file', selectedFile, "ok.jpg")
    let url = "/add-popup-image?id=" + id;
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


    const updateMyPop = (id) => {

      axiosInstanse.put("/update-popup?id="+id,
      {

        titleTM: titleTM,
        titleRU: titleRU,
        profile_id: profile_id,
        descriptionTM: descriptionTM,
        descriptionRU: descriptionRU,
        comment_of_admin: comment_of_admin,
        site_url: site_url,
        posts_id:posts_id

      },{headers}).then((data)=>{
      console.log(data.data.body);
      if(selectedFile==null){
        props.handleClose()
        props.getData(1);
        showSuccess("Successfully updated!!!");
      }else{
        uploadImage(props.data.id)
      }
    }).catch((err)=>{
      console.log(err);
    })
    }
  return <div>
  
      <Box sx={style}>
        <Stack direction='row' justifyContent='space-between'>
          <p className='bannerModalTitle'>Update pop-up</p>
          <IoMdClose className='Xicon' onClick={handleClose} />
        </Stack>
        <Row>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Title tm:</p>
              <input type="text" onChange={(e)=>setTitleTm(e.target.value)} defaultValue={props.data.titleTM}/>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Title ru:</p>
              <input type="text" onChange={(e)=>setTitleRU(e.target.value)} defaultValue={props.data.titleRU}/>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Pop-up image:</p>
              <input className='custom-file-input' type="file" onChange={handleInputChange}/>
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
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Site link:</p>
              <input type="text" onChange={(e)=>setSite_url(e.target.value)} defaultValue={props.data.site_url}/>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Post:</p>
              <select name="" id="" style={{ height: '30px' }} onChange={(e)=>setPosts_id(e.target.value)} value={posts_id}>
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
              <textarea name="" id="" cols="20" rows="4" onChange={(e)=>setDescriptionTM(e.target.value)} defaultValue={props.data.descriptionTM}></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Description ru:</p>
              <textarea name="" id="" cols="20" rows="4" onChange={(e)=>setDescriptionRU(e.target.value)} defaultValue={props.data.descriptionRU}></textarea>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='inputTitle'>Comment of Admin:</p>
              <input type="text" onChange={(e)=>setComment_of_admin(e.target.value)} defaultValue={props.data.comment_of_admin}/>
            </Stack>
          </Col>
          <Col lg={6} md={6} xs={12} sm={12}>
            <Stack direction='column' spacing={0}>
              <p className='cantAdd'> Can't add site link and Prfile together! Only the profile will  be accepted if you enter both!</p>
            </Stack>
          </Col>
        </Row>
        <div className="BannerAddButton">
          <button onClick={()=>updateMyPop(props.data.id)}>Update</button>
        </div>
      </Box>
      <ToastContainer/>
  </div>;
};

export default UpdatePop;
