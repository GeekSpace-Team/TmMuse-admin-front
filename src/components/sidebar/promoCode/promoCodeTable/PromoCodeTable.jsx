import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import DeletePromoCode from '../deletePromoCode/DeletePromoCode';
import UpdatePromoCode from '../updatePromoCode/UpdatePromoCode';
import Pagination from '@mui/material/Pagination';
import Loading from '../../../loading/Loading'



const PromoCodeTable = () => {
    const[promoList,setPromoList]=useState([]);
    const[page,setPage]=useState(1);
    const [pageCount,setPageCount]=useState([]);

    useEffect(()=>{
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
          };
        async function getPromo(){
            await axiosInstanse.get('/get-promo-codes?page='+page,{headers})
            .then(response=>{
                setPromoList(response.data.body.promo_codes);
                setPageCount(response.data.body.page_count);
            })
            .cath(error=>{

            });

        }
        getPromo();
    },[page]);

    const handleChange = (event, value) => {
        setPage(value);
      };
  return <div>
            {promoList.length==0?<Loading/>:
      <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Promo code</center></th>
                <th><center>Profile</center></th>
                <th><center>User</center></th>
                <th><center>Status</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>
             {  promoList.map((element,i)=>{
                    return(
            <tr>
                <td><center>{element.id}</center></td>
                <td><center>{element.promo_code}</center></td>
                <td><center>{element.nameTM}</center></td>
                <td><center>{element.fullname}</center></td>
                <td><center>{element.status}</center></td>
                <td><center><DeletePromoCode promo_codeId={element.id}/></center></td>
                <td><center><UpdatePromoCode/></center></td>
            </tr>
                 )
        })
}
    
            </Table>
}
{
    promoList.length == 0? null
    :

            <Pagination count={pageCount}
              page={page}
               onChange={handleChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeClassName={'active'} 
              style={{marginTop: '20px', marginLeft: '30%'}} />
}
  </div>;
};

export default PromoCodeTable;
