import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import { axiosInstanse } from '../../../utils/axiosInstanse';
import DeleteCertificate from '../deleteCertificate/DeleteCertificate';
import UpdateCertificate from '../updateCertificate/UpdateCertificate';
import './SertificateTable.css'
import Pagination from '@mui/material/Pagination';
import Loading from '../../../loading/Loading'



const SertificateTable = () => {
    const[certificateList,setCertificateList]=useState([]);
    const[page,setPage]=useState(1);
    const [pageCount,setPageCount]=useState([]);

    useEffect(()=>{
        const headers = { 
            'Authorization': 'Bearer my-token',
            'My-Custom-Header': 'foobar'
          };
        async function getCertificate(){
            await axiosInstanse.get('/get-certificates?page='+page,{headers})
            .then(response=>{
                setCertificateList(response.data.body.certificates);
                setPageCount(response.data.body.page_count);
            })
            .cath(error=>{

            });

        }
        getCertificate();
    },[page]);

    const handleChange = (event, value) => {
        setPage(value);
      };
  return <div>
            {certificateList.length==0?<Loading/>:
       <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Amount</center></th>
                <th><center>Profile</center></th>
                <th><center>User</center></th>
                <th><center>Status</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>

            {  certificateList.map((element,i)=>{
                    return(
            <tr>
                <td><center>{element.id}</center></td>
                <td><center>{element.amount}</center></td>
                <td><center>{element.nameTM}</center></td>
                <td><center>{element.profile_id}</center></td>
                <td><center>{element.fullname}</center></td>
                <td><center>{element.status}</center></td>
                <td><center><DeleteCertificate certificateId={element.id}/></center></td>
                <td><center><UpdateCertificate selectAmount={element.amount}
                selectProfile={element.profile_id}
                selectuser={element.fullname}
                selectStatus={element.status}/></center></td>
            </tr>
            )
        })
}
    
            </Table>
}
{
    certificateList.length == 0? null
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

export default SertificateTable;
