import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import DeleteInterestsModal from '../deleteInterestsModal/DeleteInterestsModal';
import UpdateInterestsModal from '../updateInterestsModal/UpdateInterestsModal';
import { axiosInstanse } from "../../../utils/axiosInstanse";
import Pagination from '@mui/material/Pagination';



const InterestsTable = () => {
    const [page, setPage] = React.useState(1);


    const [pageCount, setPageCount] = useState([]);

    const [interestList, setIntertestList] = useState([]);

    const getInterests = async () => {
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 12213'
        };
        await axiosInstanse.get('/get-interests?page=' + page, {
            headers
        })
            .then(response => {
                if (response.data.error) {
                    alert("Error")
                } else {
                    setIntertestList(response.data.body.interests)
                    setPageCount(response.data.body.page_count)
                }
            })
            .catch(error => {
                // alert(error);
                console.error('There was an error!', error);
            });


    }
    useEffect(() => {

        getInterests();

    }, [page]);
    const handleChange = (event, value) => {
        setPage(value);
    };
    return <div>
        <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Title</center></th>
                <th><center>Items Count</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>
            {interestList.map((element, i) => {

                return (
                    <tr>
                        <td><center>{element.id}</center></td>
                        <td><center>{element.titleTM}</center></td>
                        <td><center>{element.items_count}</center></td>
                        <td><center><DeleteInterestsModal interestid={element.id} /></center></td>
                        <td><center><UpdateInterestsModal /></center></td>
                    </tr>)
            }
            )
            }

        </Table>
        { interestList.length == 0? null 
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

export default InterestsTable;
