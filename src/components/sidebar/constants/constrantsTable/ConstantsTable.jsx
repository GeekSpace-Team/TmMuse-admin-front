import React, { useState, useEffect} from 'react';
import { Table } from 'react-bootstrap';
import DeleteConstant from '../deleteCons/DeleteConstant';
import UpdCons from '../updateCons/UpdCons';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import Pagination from '@mui/material/Pagination';
import Loading from '../../../loading/Loading'



const ConstantsTable = () => {

    const[constantList,setConstantList]=useState([]);
    const[page,setPage]=useState(1);
    const [pageCount,setPageCount]=useState([]);

    useEffect(()=>{
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
          };
        async function getConstant(){
            await axiosInstanse.get('/get-constants?page='+page,{headers})
            .then(response=>{
                setConstantList(response.data.body.constants);
                setPageCount(response.data.body.page_count);
            })
            .cath(error=>{

            });

        }
        getConstant();
    },[page]);

    const handleChange = (event, value) => {
        setPage(value);
      };
  return <div>
            {constantList.length==0?<Loading/>:
      <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Title</center></th>
                <th><center>Type</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>
            {  constantList.map((element,i)=>{
                    return(
            <tr>
                <td><center>{element.id}</center></td>
                <td><center>{element.titleTM}</center></td>
                <td><center>{element.type}</center></td>
                <td><center><DeleteConstant constantId={element.id}/></center></td>
                <td><center><UpdCons/></center></td>
            </tr>
            )
        })
}
            
            </Table>
}
{constantList.length==0? null:
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

export default ConstantsTable;
