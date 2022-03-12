import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import DeletePop from '../deletePop/DeletePop';
import UpdatePop from '../updatePop/UpdatePop';
import Loading from '../../../loading/Loading'
import Pagination from '@mui/material/Pagination';
import ip from '../../server_adress/serveradress';
import { Backdrop, Modal } from '@mui/material';
import Empty from '../../../empty/Empty';

const PopTable = (props) => {
    const [popupList, setPopupList] = props.popupList;
    const [page, setPage] = useState(1);
    const [pageCount, setPageCount] = props.pageCount;
    const [open, setOpen] = React.useState(false);
    const [element,setElement] = useState();
    const handleOpen = (element) => {setOpen(true);setElement(element)}
    const handleClose = () => setOpen(false);

    const [open1, setOpen1] = React.useState(false);
    const [elementId,setElementId] = useState();
    const handleOpen1 = (id) => {setOpen1(true);setElementId(id)}
    const handleClose1 = () => setOpen1(false);

    useEffect(() => {
        props.getPopup(page);
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
                    <UpdatePop handleClose={handleClose} getData={props.getPopup} data={element} />
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
                    <DeletePop handleClose={handleClose1} getData={props.getPopup} popupId={elementId} />
                </Modal>
      {popupList.length==0?<Empty/>:
      <Table responsive borderless className='profileTable'>
            <tr>
                <th><center>ID</center></th>
                <th><center>Image</center></th>
                <th><center>Comment of admin</center></th>
                <th><center>Profile || Site URL</center></th>
                <th><center>Delete</center></th>
                <th><center>Edit</center></th>
            </tr>
            {popupList.map((element,i) => {
                
            return(<tr>
                <td><center>{element.id}</center></td>
                <td><center><img src={ip + element.image} alt="" style={{ width: '150px', height: '100px', objectFit: 'cover' }}/></center></td>
                <td><center>{element.comment_of_admin.substring(0,100)}{element.comment_of_admin.length>100 ? <span>...</span> : null}</center></td>
                <td><center>{element.profile_id==0?element.site_url:element.profile_id}</center></td>
                <td><center><img onClick={()=>handleOpen1(element.id)} src="images/Delete.svg" alt="" /></center></td>
                <td><center><img src="images/Edit.svg" onClick={()=>handleOpen(element)} alt="" /></center></td>
                </tr>)
            }
            )
        }
        
            </Table>
      }
      { popupList.length == 0? null 
      :
      <Pagination count={pageCount}
              page={page}
               onChange={handleChange}
                containerClassName={'pagination'}
                pageClassName={'page-item'}
                pageLinkClassName={'page-link'}
                activeClassName={'active'} 
              style={{marginTop: '20px',justifyContent:'center', display:"flex"}} />
      }
  </div>;
};

export default PopTable;
