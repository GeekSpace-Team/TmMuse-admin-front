import React, { useState } from 'react'
import './Banner.css'
import BannerTable from './bannerTable/BannerTable'
import Stack from '@mui/material/Stack';
import AddBannerModal from './bannerModal/addBannerModal/AddBannerModal';
import { axiosInstanse } from '../../utils/axiosInstanse';

const Banner = () => {
    const [bannerList, setBannerList] = useState([]);
    const [pageCount, setPageCount] = useState([]);
  
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    async function getBanner(page) {
      await axiosInstanse.get('/get-banners?page=' + page, { headers })
        .then(response => {
            setBannerList(response.data.body.banners);
          setPageCount(response.data.body.page_count);
        })
        .catch(error => {
  
        });
  
    }
    return (
        <div className='content'>
            <Stack direction='row' className='titleAndButton' justifyContent='space-between'>
                <p>Banner</p>
                <AddBannerModal getBanner={getBanner}/>
            </Stack>
            <BannerTable getBanner={getBanner} bannerList={[bannerList, setBannerList]} pageCount={[pageCount, setPageCount]}/>
        </div>
    )
}

export default Banner
