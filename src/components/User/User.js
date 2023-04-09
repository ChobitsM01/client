import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-toastify';
import { deleteUser, fetchAllUsers } from '../../service/userService';
import ModalDelete from './ModalDelete';
import ModalUser from './ModalUser';
import { BiRefresh } from 'react-icons/bi';
import { BsFillPersonPlusFill } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteForever } from 'react-icons/md';

import './User.scss';

const User = ( props ) => {
  const [ listUsers, setListUsers ] = useState( [] );
  const [ currentPage, setCurrentPage ] = useState( 1 );
  const [ currentLimit, setCurrentLimit ] = useState( 2 );
  const [ totalPage, setTotalPage ] = useState( 0 );
  const [ isShow, setIsShow ] = useState( false );
  const [ isShowModalUser, setIsShowModalUser ] = useState( false );
  const [ dataModal, setDataModal ] = useState( {} );   //data modal delete
  const [ dataModalUser, setDataModalUser ] = useState( {} );   //data modal create/update
  const [ actionModalUser, setActionModalUser ] = useState( '' );

  useEffect( () => {
    fetchListUser();
  }, [ currentPage ] );

  const fetchListUser = async () => {
    const response = await fetchAllUsers( currentPage, currentLimit );
    if ( response && +response.EC === 0 ) {
      setTotalPage( response.DT.totalPage );
      if ( response.DT.totalPage > 0 && response.DT.users.length === 0 ) {
        setCurrentPage( +response.DT.totalPage );
        await fetchAllUsers( +response.DT.totalPage, currentLimit );
      }
      if ( response.DT.totalPage > 0 && response.DT.users.length > 0 ) {
        setListUsers( response.DT.users );
      }

    }
  }

  const handlePageClick = ( event ) => {
    setCurrentPage( event.selected + 1 );
  };

  const handleDelete = ( user ) => {
    setDataModal( user );
    setIsShow( true );
  }

  const confirmDeleteUser = async () => {
    let response = await deleteUser( dataModal );
    setIsShow( false );
    if ( response && response.EC === 0 ) {
      toast.success( response.EM );
      await fetchListUser();
    }
    else {
      toast.error( response.EM );
    }
  }

  const handleClose = () => {
    setIsShow( false );
    setDataModal( {} );
  }

  const onHide = async () => {
    setIsShowModalUser( false );
    setDataModalUser( {} );
    await fetchListUser();
  }

  const handleEditUser = ( user ) => {
    setActionModalUser( 'UPDATE' )
    setDataModalUser( user );
    setIsShowModalUser( true );
  }

  return (
    <div className='container'>
      <div className='user-title'>
        <h3>Table users</h3>
      </div>
      <div className='user-btn mb-3'>
        <button className='btn btn-info me-3'
          onClick={ () => fetchListUser() }
        ><BiRefresh className='icon-refresh' />Refresh</button>
        <button className='btn btn-primary'
          onClick={ () => { setIsShowModalUser( true ); setActionModalUser( 'CREATE' ) } }
        >
          <BsFillPersonPlusFill className='icon-add-user' />
          Add new user</button>
      </div>
      <div className='user-table'>
        <table className='table table-hover table-border table-success'>
          <thead>
            <tr>
              <th scope="col">No</th>
              <th scope="col">ID</th>
              <th scope="col">Email</th>
              <th scope="col">Name</th>
              <th scope="col">Group</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            { listUsers && listUsers.length > 0 ?
              <>
                { listUsers.map( ( item, index ) => {
                  return (
                    <tr key={ `row-${ index + 1 }` }>
                      <td>{ ( currentPage - 1 ) * currentLimit + index + 1 }</td>
                      <td>{ item.id }</td>
                      <td>{ item.email }</td>
                      <td>{ item.userName }</td>
                      <td>{ item.Group ? item.Group.name : '' }</td>
                      <td>
                        <button
                          onClick={ () => handleEditUser( item ) }
                          title='Edit'
                          className='btn btn-warning me-3 btn-edit'
                        >
                          <FaEdit />
                        </button>
                        <button className='btn btn-danger btn-delete'
                          title='Delete'
                          onClick={ () => handleDelete( item ) }
                        >
                          <MdOutlineDeleteForever />
                        </button>
                      </td>
                    </tr>
                  )
                } ) }
              </>
              :
              <>
                <tr><td colSpan={ 6 }>Not found user</td></tr>
              </>
            }
          </tbody>
        </table>
      </div>

      <div className='user-pagination'>
        { totalPage > 0 &&
          <ReactPaginate
            nextLabel="next >"
            onPageChange={ handlePageClick }
            pageRangeDisplayed={ 3 }
            marginPagesDisplayed={ 2 }
            pageCount={ totalPage }
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={ null }
            forcePage={ +currentPage - 1 }
          />
        }
      </div>
      <ModalDelete
        show={ isShow }
        close={ handleClose }
        confirmDeleteUser={ confirmDeleteUser }
        dataModal={ dataModal }
      />
      <ModalUser
        show={ isShowModalUser }
        onHide={ onHide }
        actionModalUser={ actionModalUser }
        dataModalUser={ dataModalUser }
      />
    </div>
  );
};

export default User;