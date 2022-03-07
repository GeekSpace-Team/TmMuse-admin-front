import React, { useState, useEffect } from 'react';
import './Pop.css'
import PopTable from './popTable/PopTable'
import Stack from '@mui/material/Stack';
import AddPop from './addPopModal/AddPop';
import { axiosInstanse } from '../../utils/axiosInstanse';

const Pop = () => {
    const [popupList, setPopupList] = useState([]);
    const [pageCount, setPageCount] = useState([]);
  
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    async function getPopup(page) {
       axiosInstanse.get('/get-popup?page=' + page, { headers })
        .then(response => {
          setPopupList(response.data.body.popup);
          setPageCount(response.data.body.page_count);
        })
        .catch(error => {
  
        });
  
    }
    return (
      <div className='content'>
        <Stack direction='row' className='TagsTitleAndButton' justifyContent='space-between'>
          <p className='titleNames'>Pop-up</p>
          <AddPop getPopup={getPopup} />
        </Stack>
        <PopTable getPopup={getPopup} popupList={[popupList, setPopupList]} pageCount={[pageCount, setPageCount]} />
      </div>
    )
  }

  export default Pop;
