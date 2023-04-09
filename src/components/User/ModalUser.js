import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { fetchGroup, createNewUser, updateCurrentUser } from '../../service/userService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const ModalUser = (props) =>
{
    const { actionModalUser, dataModalUser } = props;
    const [ userGroups, setUserGroups ] = useState([]);
    const defaultUserData = {
        email: '',
        phone: '',
        userName: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    };
    const [ userData, setUserData ] = useState(defaultUserData);
    const validInputsDefault = {
        email: true,
        phone: true,
        userName: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }

    const [ validInputs, setValidInput ] = useState(validInputsDefault);

    useEffect(() =>
    {
        getGroup()
    }, []);

    useEffect(() =>
    {
        if (actionModalUser === 'UPDATE')
        {
            setUserData({
                ...dataModalUser,
                group: dataModalUser.Group ? dataModalUser.Group.id : '',
            })
        }
    }, [ props.dataModalUser ]);
    useEffect(() =>
    {
        if (actionModalUser === 'CREATE')
        {
            if (userGroups && userGroups.length > 0)
            {
                setUserData({
                    ...userData,
                    group: userGroups[ 0 ].id,
                })
            }
        }

    }, [ actionModalUser ]);

    const checkValidInputs = () =>
    {
        if (actionModalUser === 'UPDATE')
        {
            return true
        }
        setValidInput(validInputsDefault);
        let arr = [ 'email', 'phone', 'password', 'group' ];
        let check = true;
        for (let i = 0; i < arr.length; i++)
        {
            if (!userData[ arr[ i ] ])
            {
                let _validInputs = _.cloneDeep(validInputsDefault);
                _validInputs[ arr[ i ] ] = false;
                setValidInput(_validInputs);
                toast.error(`Empty input ${ arr[ i ] }`);
                check = false;
                break;
            }
        }
        return check;
    }

    const getGroup = async () =>
    {
        let res = await fetchGroup();
        if (res && res.EC === 0)
        {
            setUserGroups(res.DT);
            let dataGroup = res.DT;
            if (dataGroup && dataGroup.length > 0)
            {
                setUserData({ ...userData, group: dataGroup[ 0 ].id });
            }
        } else
        {
            toast.error(res.EM);
        }
    }

    const handleOnChangeInput = (value, name) =>
    {
        let _userData = _.cloneDeep(userData);
        _userData[ name ] = value;
        setUserData(_userData);
    }

    const handleSaveUser = async () =>
    {
        let check = checkValidInputs();
        if (check === true)
        {
            let res = actionModalUser === 'CREATE'
                ? await createNewUser({ ...userData, groupId: userData[ 'group' ], })
                : await updateCurrentUser({ ...userData, groupId: userData[ 'group' ], });
            if (res && res.EC === 0)
            {
                props.onHide();
                setUserData({
                    ...defaultUserData,
                    group: userGroups[ 0 ].id && userGroups.length > 0 ? userGroups[ 0 ].id : ''
                });
            }
            if (res && res.EC !== 0)
            {
                if (res.DT === 'email')
                {
                    setValidInput({ ...validInputsDefault, email: false });
                }
                if (res.DT === 'phone')
                {
                    setValidInput({ ...validInputsDefault, phone: false });
                }
                toast.error(res.EM);
            }
        }
    }

    const handleCloseModalUser = () =>
    {
        props.onHide();
        setUserData(defaultUserData);
        setValidInput(validInputsDefault);
    }

    return (
        <>
            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={ props.show }
                className='modal-user'
                onHide={ () => handleCloseModalUser() }
            >
                <Modal.Header closeButton >
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span>{ props.actionModalUser === 'CREATE' ?
                            'Create new user' : 'Edit a user' }</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <label>Email</label>
                            <input
                                disabled={ actionModalUser === 'CREATE' ? false : true }
                                className={ validInputs.email ? 'form-control' : 'form-control is-invalid' }
                                type='text'
                                placeholder='Email'
                                value={ userData.email }
                                onChange={ (event) => handleOnChangeInput(event.target.value, 'email') }
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <label>Phone</label>
                            <input
                                disabled={ actionModalUser === 'CREATE' ? false : true }
                                className={ validInputs.phone ? 'form-control' : 'form-control is-invalid' }
                                type='text'
                                placeholder='Phone'
                                value={ userData.phone }
                                onChange={ (event) => handleOnChangeInput(event.target.value, 'phone') }
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <label >Username</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Username'
                                value={ userData.userName }
                                onChange={ (event) => handleOnChangeInput(event.target.value, 'userName') }
                            />
                        </div>

                        <div className='col-12 col-sm-6 form-group mt-3'>
                            { actionModalUser === 'CREATE' &&
                                <>
                                    <label>Password</label>
                                    <input
                                        className={ validInputs.password ? 'form-control' : 'form-control is-invalid' }
                                        type='password'
                                        placeholder='Password'
                                        value={ userData.password }
                                        onChange={ (event) => handleOnChangeInput(event.target.value, 'password') }
                                    />
                                </>
                            }
                        </div>
                        <div className='col-12 col-sm-12 form-group mt-3'>
                            <label>Address</label>
                            <input
                                className='form-control'
                                type='text'
                                placeholder='Address'
                                value={ userData.address }
                                onChange={ (event) => handleOnChangeInput(event.target.value, 'address') }
                            />
                        </div>
                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <label>Gender</label>
                            <select
                                className="form-select" aria-label="Gender"
                                onChange={ (event) => handleOnChangeInput(event.target.value, 'sex') }
                                value={ userData.sex }
                            >
                                <option Value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>



                        <div className='col-12 col-sm-6 form-group mt-3'>
                            <label >Group</label>
                            <select
                                className={ validInputs.group ? 'form-select' : 'form-select is-invalid' }
                                aria-label="Group"
                                onChange={ (event) => handleOnChangeInput(event.target.value, 'group') }
                                value={ userData.group }
                            >
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


                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={ () => handleCloseModalUser() }>
                        Close
                    </Button>
                    <Button variant="primary" onClick={ () => handleSaveUser() }>
                        { actionModalUser === 'CREATE' ? 'Save' : 'Update' }
                    </Button>
                </Modal.Footer>

            </Modal>
        </>
    )
}
export default ModalUser
