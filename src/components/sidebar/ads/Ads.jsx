import React, { useState } from 'react'
import './Ads.css'
import AdsTable from './adsTable/AdsTable'
import Stack from '@mui/material/Stack';
import AddAds from './addAds/AddAds';
import { axiosInstanse } from '../../utils/axiosInstanse';

const Ads = () => {
    const [adsList, setAdsList] = useState([]);
    const [pageCount, setPageCount] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

  
    const headers = {
      'Authorization': 'Bearer my-token',
      'My-Custom-Header': 'foobar'
    };
    async function getAds(page) {
       axiosInstanse.get('/get-ads?page=' + page, { headers })
        .then(response => {
          setAdsList(response.data.body.ads);
          setPageCount(response.data.body.page_count);
          if(response.data.body==null || response.data.body.promo_codes.length==0){
            setIsEmpty(true);
          }
        })
        .catch(error => {
  
        });
  
    }
    return (
        <div className='content'>
            <Stack direction='row' paddingTop={3} marginBottom={3} className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Ads</p>
                <AddAds getAds={getAds}/>
            </Stack>
            <AdsTable getAds={getAds} adsList={[adsList, setAdsList]} isEmpty={[isEmpty,setIsEmpty]} pageCount={[pageCount, setPageCount]}/>
        </div>
    )
}

export default Ads
