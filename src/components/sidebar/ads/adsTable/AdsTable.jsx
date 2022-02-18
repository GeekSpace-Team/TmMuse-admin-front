import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import DeleteAds from '../deleteAds/DeleteAds'
import UpdateAds from '../updateAds/UpdateAds'
import './Ads.css'
import {axiosInstanse}  from "../../../utils/axiosInstanse"; 
import Pagination from '@mui/material/Pagination';
import ip from '../../server_adress/serveradress';
import Loading from '../../../loading/Loading'

const AdsTable = () => {
    const[adsList,setAdsList]=useState([]);
    const[page,setPage]=useState(1);
    const [pageCount,setPageCount]=useState([]);
    const [allProfileList, setAllProfile] = useState([]);

    useEffect(() => {
        const headers = {
          'Authorization': 'Bearer my-token',
          'My-Custom-Header': 'foobar'
        };
        axiosInstanse.get("/get-name-profile", { headers })
          .then(response => {
            setAllProfile(response.data.body);
          })
      },[])
    
    useEffect(()=>{
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
          };
        async function getAds(){
            await axiosInstanse.get('/get-ads?page='+page,{headers})
            .then(response=>{
                setAdsList(response.data.body.ads);
                setPageCount(2);
            })
            .cath(error=>{

            });

        }
        getAds();
    },[page]);


   

    const handleChange = (event, value) => {
        setPage(value);
      };

    return (
        <div>
            { adsList.length==0?<Loading/>:
            <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Image</center></th>
                <th><center>Name</center></th>
                <th><center>Comment of admin</center></th>
                <th><center>Profile || Site URL</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th> 
            </tr>
            {
                
                adsList.map((element,i)=>{
                    return(
                        <tr>
                            <td><center>{element.id}</center></td>
                            <td><center><img src={ip+element.image} alt="" className='adsImage'/></center></td>
                            <td><center>{element.nameTM}</center></td>
                            <td><center>{element.comment_of_admin}</center></td>
                            <td><center>{element.profile_id==0?element.site_url:element.profile_id}</center></td>
                            <td><center><DeleteAds adsId={element.id}/></center></td>
                            <td><center><UpdateAds 
                            adsID={element.id} 
                            nameTM={element.nameTM}
                            nameRU={element.nameRU}
                            profileID={element.profile_id}
                            image={element.image}
                            siteURL={element.site_url}
                            isMain={element.is_main}
                            comment_of_admin={element.comment_of_admin}
                            allProfileList={allProfileList}
                            /></center></td>
                        </tr>
                    )
                })
            }
            
                
            </Table>
        }
        {adsList.length==0?null:
        
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

export default AdsTable
