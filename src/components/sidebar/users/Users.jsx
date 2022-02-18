import React from 'react'
import './Users.css'
import Stack from '@mui/material/Stack';
import { Table } from 'react-bootstrap';
import { axiosInstanse } from '../../utils/axiosInstanse'
import { useState,useEffect,useMemo } from 'react'
import Pagination from '@mui/material/Pagination';
import Loading from '../../loading/Loading'




const Users = () => {
    const[userList,setUserList]=useState([]);
    const[page,setPage]=useState(1);
    const [pageCount,setPageCount]=useState([]);

    useEffect(()=>{
        
        
        getUser();
    },[page]);

    async function getUser(){
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
          };
        await axiosInstanse.get('/get-users?page='+page,{headers})
        .then(response=>{
            setUserList(response.data.body.users)
            setPageCount(response.data.body.page_count)
        })
        .catch(error=>{
            alert(error)
        });

    }

    const handleChange = (event, value) => {
        setPage(value);
      };
    return (
        <div className='content'>
            <Stack direction='row' className='TagsTitleAndButton' justifyContent='space-between'>
                <p className='titleNames'>Users</p>
            </Stack>
            {userList.length==0?<Loading/>:
            <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Full name</center></th>
                <th><center>Phone number</center></th>
                <th><center>User's interests</center></th>
            </tr>
            {
              
              userList.map((element,i) => {
                   return (element.id==0?null:<tr>
                           <td><center>{element.id}</center></td>
                           <td><center>{element.fullname}</center></td>
                           <td><center>{element.phone_number}</center></td>
                           <td><center>{element.interest_items.length==0?
                           <label>No interests</label>:
                           element.interest_items.map((item,i)=>{
                               return(item.titleTM+",")
                           })
                           }
                           </center></td>
                           </tr>)
                   }
              ) }
            </Table>
}
{
    userList.length == 0? null
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
        </div>
    )
}

export default Users
