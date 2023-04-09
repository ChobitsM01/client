import './Role.scss';
import React, { useEffect, useRef, useState } from 'react';
import { BiPlusCircle } from 'react-icons/bi';
import { RiDeleteBin5Line } from 'react-icons/ri';
import _ from 'lodash';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import { createRoles } from '../../service/roleService';
import TableRole from './TableRole';
const Role = () =>
{

  const childDefault = { url: '', description: '', isValidUrl: true };
  const [ listchilds, setListchilds ] = useState({ child1: childDefault });
  const childRef = useRef();

  const handleOnchangeInput = (name, value, key) =>
  {
    let _listchilds = _.cloneDeep(listchilds);
    _listchilds[ key ][ name ] = value;
    if (value && name === 'url')
    {
      _listchilds[ key ][ 'isValidUrl' ] = true;
    }
    setListchilds(_listchilds);
  }

  const handleAddRole = () =>
  {
    let _listchilds = _.cloneDeep(listchilds);
    _listchilds[ `child-${ uuidv4() }` ] = childDefault;
    setListchilds(_listchilds);
  }

  const handleRemoveRole = (key) =>
  {
    let _listchilds = _.cloneDeep(listchilds);
    delete _listchilds[ key ];
    setListchilds(_listchilds);
  }

  const builDataPersist = () =>
  {
    let _listchilds = _.cloneDeep(listchilds);
    let result = [];
    Object.entries(_listchilds).map(([ key, child ]) =>
    {
      result.push({
        url: child.url,
        description: child.description
      })
    })
    return result;
  }

  const handleSave = async () =>
  {
    let invalidObj = Object.entries(listchilds).find(([ key, child ]) =>
    {
      return child && !child.url;
    })
    if (!invalidObj)
    {
      //call api
      let data = builDataPersist();
      let res = await createRoles(data);
      if (res && res.EC === 0)
      {
        toast.success(res.EM);
        childRef.current.fetchListRolesAgain();
      }
    }
    else
    {
      //error
      toast.error(`This input is required`)
      let _listchilds = _.cloneDeep(listchilds);
      const key = invalidObj[ 0 ];
      _listchilds[ key ][ 'isValidUrl' ] = false;
      setListchilds(_listchilds);
    }
  }

  return (
    <div className='container'>
      <div className='title my-3'>
        <h4> Add new roles</h4>
      </div>
      <div className='content'>
        <div className='role-parent mt-3'>
          {
            Object.entries(listchilds).map(([ key, child ]) =>
            {
              return (

                <div className='role-child row' key={ `child-${ key }` }>
                  <div className='form-group col-5'>
                    <label>Url: </label>
                    <input type="text"
                      className={ child.isValidUrl ? 'form-control mt-2' : 'form-control mt-2 is-invalid' }
                      placeholder='Url'
                      value={ child.url }
                      onChange={ (e) => handleOnchangeInput('url', e.target.value, key) }
                    />
                  </div>
                  <div className='form-group col-5'>
                    <label>Description:</label>
                    <input type="text"
                      className='form-control mt-2'
                      value={ child.description }
                      placeholder='Description'
                      onChange={ (e) => handleOnchangeInput('description', e.target.value, key) } />
                  </div>
                  <div className='group-btn col-2'>
                    <BiPlusCircle
                      onClick={ () => handleAddRole() }
                      className='icon icon-add clickable ms-4 me-2' />
                    {
                      listchilds && Object.keys(listchilds).length > 1 &&
                      <RiDeleteBin5Line
                        onClick={ () => handleRemoveRole(key) }
                        className='icon icon-remove clickable' />
                    }

                  </div>
                </div>
              )
            })
          }
          <div>
            <button
              onClick={ () => handleSave() }
              className='btn btn-warning my-3'>Save</button>
          </div>
        </div>

      </div>
      <hr />
      <div className='table-role'>
        <div className='title'>
          <h4>Table roles:</h4>
        </div>
        <TableRole ref={ childRef } />
      </div>
    </div>
  );
};

export default Role;