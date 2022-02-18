import React,{useEffect, useState} from 'react'
import { Table } from 'react-bootstrap'
import DeleteProfileModal from '../profileModal/deleteProfileTable/DeleteProfileModal'
import EditProfileModal from '../profileModal/editProfileModal/EditProfileModal'
import './ProfileTable.css'
import {axiosInstanse} from '../../../utils/axiosInstanse'
import Pagination from '@mui/material/Pagination';
import LazyLoad from 'react-lazyload';
import ip from '../../server_adress/serveradress';
import Loading from '../../../loading/Loading'



const ProfileTable = () => {
    const[profileList,setProfileList]=useState([]);
    const[page,setPage]=useState(1);
    const [pageCount,setPageCount]=useState([]);

    useEffect(()=>{
        
        getProfile();
    },[page]);

    async function getProfile(){
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
          };
        await axiosInstanse.get('/get-profile?page='+page,{headers})
        .then(response=>{
            setProfileList(response.data.body.profiles)
            setPageCount(response.data.body.page_count)
        })
        .cath(error=>{
            alert(error)
        });

    }

    const handleChange = (event, value) => {
        setPage(value);
      };
    return (
        <div>
            {profileList.length==0?<Loading/>:
            <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Name</center></th>
                <th><center>Image</center></th>
                <th><center>Category</center></th>
                <th><center>VIP status</center></th>
                <th><center>Status</center></th>
                <th><center>View count</center></th>
                <th><center>Like</center></th>
                <th><center>Dislike</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>
            {
                
                profileList.map((element,i)=>{
                    return(
                        <tr>
                        <td><center>{element.id}</center></td>
                        <td><center>{element.nameTM}</center></td>
                        <td><center>
                            {
                                (element.sliders!=null && element.sliders.length>0)?
                                <LazyLoad  height={200} placeholder={<img src="../../../images/place.jpg" width={150} height={100}/>}>
                                    <img src={ip+element.sliders[0].small_image}  width={150} height={100}/>
                                </LazyLoad>
                                :
                                <img src="../../../images/place.jpg" width={150} height={100}/>
                            }
                        </center></td>
                        <td><center>{element.category_id}</center></td>
                        <td><center>{element.is_VIP}</center></td>
                        <td><center>{element.status}</center></td>
                        <td><center>{element.view_count}</center></td>
                        <td><center>{element.like}</center></td>
                        <td><center>{element.dislike}</center></td>
                        <td><center><DeleteProfileModal profileId={element.id}/></center></td>
                        <td><center><EditProfileModal/></center></td>
                    </tr>
                    )
                })
            }
            </Table>
        }
{profileList.length==0?null:
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

export default ProfileTable
