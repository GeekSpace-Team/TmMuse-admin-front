import React from 'react'
import './Ads.css'
import AdsTable from './adsTable/AdsTable'
import Stack from '@mui/material/Stack';
import AddAds from './addAds/AddAds';


const Ads = () => {
    return (
        <div className='content'>
            <Stack direction='row' paddingTop={3} marginBottom={3} className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Ads</p>
                <AddAds/>
            </Stack>
            <AdsTable/>
        </div>
    )
}

export default Ads
