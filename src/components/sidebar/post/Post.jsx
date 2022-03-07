import React, { useEffect, useState } from 'react';
import PostTable from './postTable/PostTable';
import Stack from '@mui/material/Stack';
import './Post.css'
import AddPost from './postModal/AddPost';
import { axiosInstanse } from '../../utils/axiosInstanse';


const Post = () => {
  const [postList, setPostList] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [allProfile, setAllProfile] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);
  const [profileId, setProfileId] = useState('');
  const allProfileList = allProfile;
  // const [allCinema, setAllCinema] = useState([]);
  // const [cinemaId, setCinemaId] = useState(0);


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
    getProfile()
  }, [])

  async function getProfile() {
    axiosInstanse.get("/get-name-profile", { headers })
      .then(response => {
        setAllProfile(response.data.body);
        console.log(response.data.body)
      }).catch((err) => {
        console.log(err);
      })
  }

  async function getPost(page) {
    let url = '/get-posts?page=' + page;
    if(profileId !==''){
     url = '/get-posts?page=' + page+'&profile_id='+profileId;
    }
    axiosInstanse.get(url, { headers })
      .then(response => {
        setPostList(response.data.body.posts);
        setPageCount(response.data.body.page_count);
      })
      .catch(error => {
        console.log(error)
      });

  }
  

  useEffect(()=>{
    getPost(1);
  },[profileId]);
 


  return <div className='content'>
    <Stack direction='row' className='TagsTitleAndButton' paddingTop={3} justifyContent='space-between'>
      <p className='titleNames'>Post</p>
      <AddPost getPost={getPost} getProfile={getProfile} allProfile={allProfile} />
    </Stack>
    <div className="postSelect">
      <select name="" id="" style={{ height: '30px' }} onChange={e => setProfileId(e.target.value)}>
        <option value="">Select...</option>
        {
          allProfileList.map((element, i) => {
            return (<option value={element.id}>{element.nameTM}</option>)
          })
        }
      </select>
    </div>
    {/* <select style={{height: '30px', width: '200px', marginBottom:'50px', marginLeft:'20px'}} name="" id="" onChange={e => setCinemaId(e.target.value)}>
                  <option value="0">Select...</option>
                  {
                    allCinema.map((element, i) => {
                      return (<option value={element.id}>{element.nameTM}</option>)
                    })
                  }
                </select> */}


    <PostTable getPost={getPost} postList={[postList, setPostList]} pageCount={[pageCount, setPageCount]} isEmpty={[isEmpty, setIsEmpty]} pageCount={[pageCount, setPageCount]} />
  </div>;
};

export default Post;
