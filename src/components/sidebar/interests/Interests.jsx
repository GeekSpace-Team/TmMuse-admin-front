import React from 'react'
import './Interests.css'
import InterestsTable from './interestsTable/InterestsTable'
import Stack from '@mui/material/Stack';
import AddInterestsModal from './addInterestsModal/AddInterestsModal';


const Interests = () => {
    return (
        <div className='content'>
            <Stack direction='row' className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Interests</p>
                <AddInterestsModal/>
            </Stack>
            <InterestsTable/>
        </div>
    )
}

export default Interests
