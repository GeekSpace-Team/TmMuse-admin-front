import React from 'react'
import './Banner.css'
import BannerTable from './bannerTable/BannerTable'
import Stack from '@mui/material/Stack';
import AddBannerModal from './bannerModal/addBannerModal/AddBannerModal';

const Banner = () => {
    return (
        <div className='content'>
            <Stack direction='row' className='titleAndButton' justifyContent='space-between'>
                <p>Banner</p>
                <AddBannerModal/>
            </Stack>
            <BannerTable/>
        </div>
    )
}

export default Banner
