import React, { useState } from 'react'
import './PromoCode.css'
import PromoCodeTable from './promoCodeTable/PromoCodeTable'
import Stack from '@mui/material/Stack';
import AddPromoCode from './addPromoCode/AddPromoCode';
import { axiosInstanse } from '../../utils/axiosInstanse';


const PromoCode = () => {
  const [promoList, setPromoList] = useState([]);
  const [pageCount, setPageCount] = useState([]);
  const [isEmpty, setIsEmpty] = useState(false);

  const headers = {
    'Authorization': 'Bearer my-token',
    'My-Custom-Header': 'foobar'
  };
  async function getPromo(page) {
     axiosInstanse.get('/get-promo-codes?page=' + page, { headers })
      .then(response => {
        setPromoList(response.data.body.promo_codes);
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
            <Stack direction='row' id='forButton' className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Promo code</p>
                <AddPromoCode getPromo={getPromo} />
            </Stack>
            <PromoCodeTable getPromo={getPromo} promoList={[promoList, setPromoList]} pageCount={[pageCount, setPageCount]} isEmpty={[isEmpty,setIsEmpty]}/>
        </div>
    )
}

export default PromoCode
