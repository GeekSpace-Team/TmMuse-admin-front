import React from 'react'
import './Constants.css'
import ConstantsTable from './constrantsTable/ConstantsTable'
import Stack from '@mui/material/Stack';
import AddConstant from './addConstant/AddConstant';


const Constants = () => {
    return (
        <div className='content'>
            <Stack direction='row' className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Constants</p>
                <AddConstant/>
                </Stack>
            <ConstantsTable/>
        </div>
    )
}

export default Constants
