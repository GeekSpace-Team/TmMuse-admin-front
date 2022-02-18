import React from 'react'
import './PromoCode.css'
import PromoCodeTable from './promoCodeTable/PromoCodeTable'
import Stack from '@mui/material/Stack';
import AddPromoCode from './addPromoCode/AddPromoCode';


const PromoCode = () => {
    return (
        <div className='content'>
            <Stack direction='row' id='forButton' className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Promo code</p>
                <AddPromoCode/>
            </Stack>
            <PromoCodeTable/>
        </div>
    )
}

export default PromoCode
