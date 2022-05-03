import React, { useEffect, useState } from 'react'
import './Profile.css'
import ProfileTable from './profileTable/ProfileTable'
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import ProfileModal from './profileModal/ProfileModal';
import { axiosInstanse } from '../../utils/axiosInstanse';
import { ToastContainer } from 'react-toastify';


const Profile = () => {
    const [category, setcategory] = useState(0);
    const [categoryList, setCategoryList] = useState([]);
    const [profileList,setProfileList] = useState([]);
    const [pageCount, setPageCount] = useState([]);

    const headers = { 
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
      };

    const getCategories =async()=>{
         axiosInstanse.get("/get-categories", { headers })
        .then(response => {
            setCategoryList(response.data.body);
            setPageCount(response.data.body.page_count);
            console.log(response.data.body);
        })
        .catch(ex => {
            console.log(ex);
        });
    }

    useEffect(()=>{
        getCategories();
    },[])

    useEffect(()=>{
        getProfile(1);
    },[category]);

    async function getProfile(page){
        let url = '/get-profile?page='+page;
        if(category !=0){
            url = '/get-profile?page='+ page + '&category='+category;
        }
         axiosInstanse.get(url,{headers})
        .then(response=>{
            setProfileList(response.data.body.profiles)
            setPageCount(response.data.body.page_count);
            console.log("profile",response.data.body)
        })
        .catch(err=>{
            console.log(err)
        });

    }
    
    return (
        <div className='content' >
              <ToastContainer />
            <Stack className='profileName' marginTop='10' direction='row' justifyContent='space-between' >
                <p>Profiles</p>
                <span className='ProfileModalAddButton'><ProfileModal category={[categoryList, setCategoryList]}  getCategory={getProfile}/></span>
            </Stack>
            <Stack direction={{ lg: 'row', md: 'row', sm: 'row', xs:'column'}} className='profileSelect'
             spacing={5}>
                <select onChange={e => setcategory(e.target.value)} style={{ height: '30px' }} name="" id="category" className="normalSize" >
                                            <option value="0">Select category</option>
                                            {
                                                categoryList?.map((element, i) => {
                                                    return (
                                                        <option key={"categoryProfile"+element.id} value={element.id}>{element.name}</option>
                                                    )
                                                })
                                            }
                                        </select>
            </Stack>
            <ProfileTable category={categoryList} pageCount={[pageCount, setPageCount]} data={[profileList,setProfileList]}  getProfile={getProfile} />
        </div>
    )
}

export default Profile
