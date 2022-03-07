import React, { useState } from 'react'
import './Constants.css'
import ConstantsTable from './constrantsTable/ConstantsTable'
import Stack from '@mui/material/Stack';
import AddConstant from './addConstant/AddConstant';
import { axiosInstanse } from '../../utils/axiosInstanse';


const Constants = () => {
    const [constantList, setConstantList] = useState([]);
    const [pageCount, setPageCount] = useState([]); 
  
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    async function getConstant(page) {
       axiosInstanse.get('/get-constants?page=' + page, { headers })
        .then(response => {
            setConstantList(response.data.body.constants);
          setPageCount(response.data.body.page_count);
        })
        .catch(error => {
  
        });
  
    }
    return (
        <div className='content'>
            <Stack direction='row' className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Constants</p>
                <AddConstant getConstant={getConstant}/>
                </Stack>
            <ConstantsTable getConstant={getConstant} constantList={[constantList, setConstantList]} pageCount={[pageCount, setPageCount]}/>
        </div>
    )
}

export default Constants
