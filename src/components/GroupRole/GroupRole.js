import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { fetchAllRoles, fetchRolesByGroup, assignRolesToGroup } from '../../service/roleService';
import { fetchGroup } from '../../service/userService';
import './GroupRole.scss';
import _ from 'lodash';

const GroupRole = () =>
{

  const [ userGroups, setUserGroups ] = useState([]);
  const [ selectGroup, setSelectGroup ] = useState('');
  const [ listRole, setListRoles ] = useState([]);
  const [ assignRolesByGroup, setAssignRolesByGroup ] = useState([]);

  useEffect(() =>
  {
    getGroup();
    getAllRoles();
  }, []);
  const getGroup = async () =>
  {
    let res = await fetchGroup();
    if (res && res.EC === 0)
    {
      setUserGroups(res.DT);
    } else
    {
      toast.error(res.EM);
    }
  }
  const getAllRoles = async () =>
  {
    let data = await fetchAllRoles();
    if (data && + data.EC === 0)
    {
      setListRoles(data.DT);
    }
  }

  const handleOnchangeGroup = async (value) =>
  {
    setSelectGroup(value);
    if (value)
    {
      let data = await fetchRolesByGroup(value);
      if (data && data.EC === 0)
      {
        let result = buildDataRolesByGroup(data.DT.Roles, listRole);
        setAssignRolesByGroup(result);
      }
    }
  }

  const buildDataRolesByGroup = (groupRoles, allRoles) =>
  {
    let results = [];
    if (allRoles && allRoles.length > 0)
    {
      allRoles.map(role =>
      {
        let obj = {};
        obj.url = role.url;
        obj.id = role.id;
        obj.description = role.description;
        obj.isAssigned = false;
        if (groupRoles && groupRoles.length > 0)
        {
          obj.isAssigned = groupRoles.some(item => item.url === obj.url)
        }
        results.push(obj);
      })
    }
    return results;
  }

  const handleSelectRole = (value) =>
  {
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    let foundIndex = _assignRolesByGroup.findIndex(item => +item.id === +value);
    if (foundIndex > -1)
    {
      _assignRolesByGroup[ foundIndex ].isAssigned = !_assignRolesByGroup[ foundIndex ].isAssigned;
    }
    setAssignRolesByGroup(_assignRolesByGroup);
  }

  const buildDataToSave = () =>
  {
    let result = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    result.groupId = +selectGroup;
    let groupRoles = _assignRolesByGroup.filter(item => item.isAssigned === true);
    let finalData = groupRoles.map(item =>
    {
      let data = { groupId: +selectGroup, roleId: item.id };
      return data;
    })
    result.groupRoles = finalData;
    return result;
  }

  const handleSave = async () =>
  {
    let data = buildDataToSave();
    let res = await assignRolesToGroup(data);
    if (res && res.EC === 0)
    {
      toast.success(res.EM);
    }
    else
    {
      toast.error(res.EM);
    }
  }

  return (
    <div className='container'>
      <h3 className='title'>Assign Role to Group</h3>
      <div className='content col-6'>
        <div className="assign-group">
          <div>Select Group:</div>
          <label>Group (*)</label>
          <select
            className='form-select col-6 clickable'
            onChange={ (e) => handleOnchangeGroup(e.target.value) }
          >
            <option value=''>Please select group</option>
            {
              userGroups.length > 0 && userGroups.map((item, index) =>
              {
                return (
                  <option key={ `group-${ index }` } value={ item.id }>{ item.name }</option>
                )
              })
            }
          </select>
        </div>
        <hr />
        {
          selectGroup &&
          <div className='role'>
            <h5>Assigned Roles</h5>
            {
              assignRolesByGroup && assignRolesByGroup.length > 0 &&
              assignRolesByGroup.map((item, index) =>
              {
                return (
                  <div className="form-check" key={ `role-${ index }` }>
                    <input className="form-check-input" type="checkbox"
                      value={ item.id }
                      id={ `role-${ index }` }
                      checked={ item.isAssigned }
                      onChange={ (e) => handleSelectRole(e.target.value) }
                    />
                    <label className="form-check-label" htmlFor={ `role-${ index }` }>
                      { item.url }
                    </label>
                  </div>
                )
              })
            }
            <div>
              <button className='btn btn-warning mt-3'
                onClick={ () => handleSave() }
              >Save</button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default GroupRole;