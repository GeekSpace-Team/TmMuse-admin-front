import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import PostDelete from '../postDelete/PostDelete'
import UpdatePost from '../updatePost/UpdatePost'
import { axiosInstanse } from '../../../utils/axiosInstanse'
import ip from '../../server_adress/serveradress';
import Pagination from '@mui/material/Pagination';
import Loading from '../../../loading/Loading'



const PostTable = () => {
    const[postList,setPostList]=useState([]);
    const[page,setPage]=useState(1);
    const [pageCount,setPageCount]=useState([]);

    useEffect(()=>{
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
          };
        async function getPost(){
            await axiosInstanse.get('/get-posts?page='+page,{headers})
            .then(response=>{
                setPostList(response.data.body.posts);
                setPageCount(response.data.body.page_count);
            })
            .cath(error=>{

            });

        }
        getPost();
    },[page]);

    const handleChange = (event, value) => {
        setPage(value);
      };
    return (
        <div>
            {postList.length==0?<Loading/>:
            <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Image</center></th>
                <th><center>Title</center></th>
                <th><center>Promotion</center></th>
                <th><center>Profile</center></th>
                
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>
          {  postList.map((element,i)=>{
                    return(
            <tr>
                <td><center>{element.id}</center></td>
                <td><center><img src={ip+element.image} alt="" style={{width: '150px', height: '100px', objectFit: 'cover'}} /></center></td>
                <td><center>{element.titleTM}</center></td>
                <td><center>{element.promotion}</center></td>
                <td><center>{element.profile_id==0?element.site_url:element.profile_id}</center></td>
                <td><center><PostDelete postId={element.id}/></center></td>
                <td><center><UpdatePost/></center></td>
            </tr>
              )
            })
        }
            </Table>
}
{
    postList.length == 0? null:
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

export default PostTable

