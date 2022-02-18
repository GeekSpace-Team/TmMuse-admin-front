import React, { useState,useEffect } from 'react';
import './Pop.css'
import PopTable from './popTable/PopTable'
import Stack from '@mui/material/Stack';
import AddPop from './addPopModal/AddPop';
import { axiosInstanse } from '../../utils/axiosInstanse';


const Pop = () => {
    const [allProfileList, setAllProfile] = useState([]);
    const [allPosts, setAllPosts] = useState([]);
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

      useEffect(() => {
        const headers = {
          'Authorization': 'Bearer my-token',
          'My-Custom-Header': 'foobar'
        };
        axiosInstanse.get("/get-all-posts", { headers })
          .then(response => {
             setAllPosts(response.data.body);
          })
      },[])

    return (
        <div className='content'>
            <Stack direction='row' className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Pop-up</p>
                <AddPop allProfileList={allProfileList} allPosts={allPosts}/>
                </Stack>
            <PopTable/>
        </div>
    )
}

export default Pop
