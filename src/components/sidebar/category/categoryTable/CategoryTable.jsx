import React from 'react'
import { useState, useEffect, useMemo } from 'react'
import { Table } from 'react-bootstrap'
import './CategoryTable.css'
import { useAsync } from 'react-async'
import Loading from '../../../loading/Loading'
import { axiosInstanse } from '../../../utils/axiosInstanse'


const CategoryTable = () => {
    const [categoryList, setCategory] = useState([]);
   
    const getCategory=async()=>{
        console.log("get category")
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer 12213',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': 'true'
        };
        await axiosInstanse.get('/get-categories', {
            headers
        })
            .then(response => {
                if (response.data.error) {
                    alert("Error")
                } else {
                    setCategory(response.data.body)
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    useEffect(()=>{
        getCategory()
    },[])






    return (

        <div>


            {categoryList.length == 0 ? <Loading /> :
                <Table responsive borderless className='categoryTable'>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                    </tr>
                    {categoryList.map((element, i) => {
                        return (<tr>
                            <td>{element.id}</td>
                            <td>{element.name}</td></tr>)
                    }
                    )
                    }
                </Table>

            }






        </div>
    )
}

export default CategoryTable
