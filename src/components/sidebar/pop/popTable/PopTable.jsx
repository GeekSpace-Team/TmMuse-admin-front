import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import DeletePop from '../deletePop/DeletePop';
import UpdatePop from '../updatePop/UpdatePop';
import Loading from '../../../loading/Loading'
import {axiosInstanse}  from "../../../utils/axiosInstanse"; 
import Pagination from '@mui/material/Pagination';
import ip from '../../server_adress/serveradress';



const PopTable = () => {
    const [page, setPage] = React.useState(1);
    

    const [pageCount,setPageCount]=useState([]);

    const[popList,setPopup]=useState([]);
    
        useEffect(()=>{
            async function getPopups(){
                const headers = {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer 12213'
                };
            await axiosInstanse.get('/get-popup?page='+page,{
                headers
            })
                .then(response => {
                    if(response.data.error){
                        alert("Error")
                    } else{ 
                        setPopup(response.data.body.popup)
                        setPageCount(response.data.body.page_count)
                    }
                })
                .catch(error => {
                    // alert(error);
                    console.error('There was an error!', error);
                });
                
            
        }
        getPopups();
        
    },[page]);
    const handleChange = (event, value) => {
        setPage(value);
      };
  return <div>
      {popList.length==0?<Loading/>:
      <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Image</center></th>
                <th><center>Comment of admin</center></th>
                <th><center>Profile || Site URL</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>
            {popList.map((element,i) => {
                
            return(<tr>
                <td><center>{element.id}</center></td>
                <td><center><img src={ip + element.image} alt="" className='adsImage'/></center></td>
                <td><center>{element.descriptionTM}</center></td>
                <td><center>{element.profile_id==0?element.site_url:element.profile_id}</center></td>
                <td><center><DeletePop popupId={element.id}/></center></td>
                <td><center><UpdatePop/></center></td>
                </tr>)
            }
            )
        }
        
            </Table>
      }
      { popList.length == 0? null 
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

export default PopTable;
