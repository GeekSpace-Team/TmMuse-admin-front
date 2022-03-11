import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import DeleteInterestsModal from '../deleteInterestsModal/DeleteInterestsModal';
import UpdateInterestsModal from '../updateInterestsModal/UpdateInterestsModal';
import Pagination from '@mui/material/Pagination';
import { Backdrop, Modal } from '@mui/material';
import Empty from '../../../empty/Empty';



const InterestsTable = (props) => {
    const [page, setPage] = props.page;
    const [pageCount, setPageCount] = props.pageCount;
    const [interestList, setIntertestList] = props.interestList;
    const [isEmpty, setIsEmpty] = props.isEmpty;

    const [open, setOpen] = React.useState(false);
    const [element,setElement] = useState();
    const handleOpen = (element) => {setOpen(true);setElement(element)}
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const [elementId,setElementId] = useState();
    const handleOpen1 = (id) => {setOpen1(true);setElementId(id)}
    const handleClose1 = () => setOpen1(false);

    useEffect(() => {
        props.getInterests(page);
    }, [page]);

    const handleChange = (event, value) => {
        setPage(value);
    };
    return <div>
        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                >
                    <UpdateInterestsModal handleClose={handleClose} getData={props.getInterests}   data={element} />
                </Modal>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    open={open1}
                    onClose={handleClose1}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                    >
                    <DeleteInterestsModal handleClose={handleClose1} getData={props.getInterests} interestid={elementId} />
                </Modal>
                {(interestList.length==0 && !isEmpty)?<Empty/>
                :<Table responsive borderless className='profileTable'>
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
                        <td><center><img onClick={()=>handleOpen1(element.id)} src="images/Delete.svg" alt="" /></center></td>
                         <td><center><img src="images/Edit.svg" onClick={()=>handleOpen(element)} alt="" /></center></td>
                    </tr>)
            }
            )
            }

        </Table>
}
        { interestList.length == 0? null 
      :
      <Pagination count={pageCount}
              page={page}
               onChange={handleChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeClassName={'active'} 
              style={{marginTop: '20px', justifyContent:'center', display:"flex"}} />
      }
    </div>;
};

export default InterestsTable;
