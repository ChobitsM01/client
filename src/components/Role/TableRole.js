
import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { MdOutlineDeleteForever } from 'react-icons/md';
import { toast } from 'react-toastify';
import { fetchAllRoles, deleteRoles } from '../../service/roleService';

const TableRole = (props, ref) =>
{
  const [ listRoles, setListRoles ] = useState([]);

  useEffect(() =>
  {
    getAllRoles();
  }, []);

  useImperativeHandle(ref, () => ({

    fetchListRolesAgain ()
    {
      getAllRoles();
    }

  }));

  const getAllRoles = async () =>
  {
    let data = await fetchAllRoles();
    if (data && + data.EC === 0)
    {
      setListRoles(data.DT);
    }
  }
  const handleDeleteRoles = async (role) =>
  {
    let data = await deleteRoles(role);
    if (data && +data.EC === 0)
    {
      toast.success(data.EM);
      await getAllRoles();
    }
  }
  return (
    <div className='user-table'>
      <table className='table table-hover table-border table-success'>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Url</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          { listRoles && listRoles.length > 0 ?
            <>
              { listRoles.map((item, index) =>
              {
                return (
                  <tr key={ `row-${ index + 1 }` }>
                    <td>{ item.id }</td>
                    <td>{ item.url }</td>
                    <td>{ item.description }</td>

                    <td>
                      {/* <button
                        onClick={ () => handleEditUser(item) }
                        title='Delete'
                        className='btn btn-warning me-3 btn-edit'
                      >
                        <FaEdit />
                      </button> */}
                      <button className='btn btn-danger btn-delete'
                        title='Delete'
                        onClick={ () => handleDeleteRoles(item) }
                      >
                        <MdOutlineDeleteForever />
                      </button>
                    </td>
                  </tr>
                )
              }) }
            </>
            :
            <>
              <tr><td colSpan={ 4 }>Not found role</td></tr>
            </>
          }
        </tbody>
      </table>
    </div>
  );
};

export default forwardRef(TableRole);