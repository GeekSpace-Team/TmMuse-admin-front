import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap';
import DeleteTmCard from '../deleteTmCard/DeleteTmCard';
import UpdateTmCard from '../updateTmCard/UpdateTmCard';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import Pagination from '@mui/material/Pagination';
import Loading from '../../../loading/Loading'



const TmMuseTable = () => {
    const[cardList,setCardList]=useState([]);
    const[page,setPage]=useState(1);
    const [pageCount,setPageCount]=useState([]);

    useEffect(()=>{
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
          };
        async function getCard(){
            await axiosInstanse.get('/get-card?page='+page,{headers})
            .then(response=>{
              setCardList(response.data.body.cards);
                setPageCount(response.data.body.page_count);
            })
            .cath(error=>{

            });

        }
        getCard();
    },[page]);

    const handleChange = (event, value) => {
        setPage(value);
      };
  return (
    <div>
            {cardList.length==0?<Loading/>:
      <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Full name</center></th>
                <th><center>Email</center></th>
                <th><center>User</center></th>
                <th><center>Status</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>
            {  cardList.map((element,i)=>{
                    return(
            <tr>
                <td><center>{element.id}</center></td>
                <td><center>{element.fullname}</center></td>
                <td><center>{element.email}</center></td>
                <td><center>{element.user_id}</center></td>
                <td><center>{element.status}</center></td>
                <td><center><DeleteTmCard cardId={element.id}/></center></td>
                <td><center><UpdateTmCard/></center></td>
            </tr>
          )
        })
}
    
            
            </Table>
}
  {cardList.length==0? null:

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

export default TmMuseTable
