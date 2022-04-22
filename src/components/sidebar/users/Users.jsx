import React from 'react'
import './Users.css'
import Stack from '@mui/material/Stack';
import { Table } from 'react-bootstrap';
import { axiosInstanse } from '../../utils/axiosInstanse'
import { useState, useEffect, useMemo } from 'react'
import Pagination from '@mui/material/Pagination';
import Loading from '../../loading/Loading'
import Empty from '../../empty/Empty';
import { showError } from '../../toast/toast';
import { ToastContainer } from 'react-toastify';




const Users = () => {
    const [userList, setUserList] = useState([]);
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = useState([]);




    const headers = {
        'Authorization': 'Bearer my-token',
        'My-Custom-Header': 'foobar'
    };

    useEffect(() => {


        getUser();
    }, [page]);


    async function getUser() {
        
         axiosInstanse.get('/get-users?page=' + page, { headers })
            .then(response => {
                setUserList(response.data.body.users)
                setPageCount(response.data.body.page_count)

            })
            .catch(error => {
                showError(error);
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
            {userList.length == 0 ? <Empty /> :
                <Table responsive borderless className='profileTable'>
                    <tr>
                        <th>ID</th>
                        <th>Full name</th>
                        <th>Phone number</th>
                        <th>User's interests</th>
                    </tr>
                    {

                        userList.map((element, i) => {
                            return (element.id == 0 ? null : <tr>
                                <td>{element.id}</td>
                                <td>{element.fullname}</td>
                                <td>{element.phone_number}</td>
                                <td>{element.interest_items.length == 0 ?
                                    <label>No interests</label> :
                                    element.interest_items.map((item, i) => {
                                        if(item!=null) return (item.titleTM + ",")
                                    })
                                }
                                </td>
                            </tr>)
                        }
                        )}
                </Table>
            }
            {
                userList.length == 0 ? null
                    :
                    <Pagination count={pageCount}
                        page={page}
                        onChange={handleChange}
                        containerClassName={'pagination'}
                        pageClassName={'page-item'}
                        pageLinkClassName={'page-link'}
                        activeClassName={'active'}
                        style={{ marginTop: '20px', justifyContent: 'center', display: "flex" }} />
            }
            <ToastContainer />
        </div>
    )
}

export default Users
