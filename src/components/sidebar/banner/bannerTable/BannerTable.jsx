import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import UpdateBannerModal from '../bannerModal/updateBannerModal/UpdateBannerModal'
import DeleteBanner from '../deleteBanner/DeleteBanner'
import './BannerTable.css'
import Loading from '../../../loading/Loading'
import ReactPaginate from 'react-paginate';
import { axiosInstanse } from '../../../utils/axiosInstanse'
import Pagination from '@mui/material/Pagination';
import ip from '../../server_adress/serveradress';


const BannerTable = () => {

    const[bannerList,setBannerList]=useState([]);
    const[page,setPage]=useState(1);
    const [pageCount,setPageCount]=useState([]);

    useEffect(()=>{
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
          };
        async function getBanner(){
            await axiosInstanse.get('/get-banners?page='+page,{headers})
            .then(response=>{
                setBannerList(response.data.body.banners);
                setPageCount(response.data.body.page_count);
            })
            .cath(error=>{
                    
            });

        }
        getBanner();
    },[page]);

    const handleChange = (event, value) => {
        setPage(value);
      };


   

    return (
        <div className='bannerHeight'>
        {bannerList.length==0?<Loading/>:
              <Table responsive borderless className='profileTable'>
              <tr>
                  <th><center>ID</center></th>
                  <th><center>Image</center></th>
                  <th><center>Link</center></th>
                  <th><center>Profile Name</center></th>
                  <th><center>Order</center></th>
                  <th><center>Delete</center></th>
                  <th><center>Edit</center></th>
              </tr>
              {  bannerList.map((element,i)=>{
                    return(
                            <tr>
                            <td><center>{element.id}</center></td>
                            <td><center><img src={ip+element.image} style={{width: '150px', height: '100px', objectFit: 'cover'}} /></center></td>
                            <td><center>{element.link}</center></td>
                            <td><center>{element.profile_id}</center></td>
                            <td><center>{element.order}</center></td>
                            <td><center><DeleteBanner bannerId={element.id}/></center></td>
                            <td><center><UpdateBannerModal/></center></td>
                        </tr>
                         )
                     })
                 }
                  
                           
                
                </Table>
                }
                {bannerList.length==0?null:
                <Pagination count={pageCount}
              page={page}
               onChange={handleChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeClassName={'active'} 
              style={{marginTop: '20px', marginLeft: '30%'}} />}
            
            
           
           
            </div>

    )
}

export default BannerTable
