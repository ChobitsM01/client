// import axios from "axios";
import axios from '../setup/axios';

const registerNewUser = async (email, userName, phone, password) =>
{
    return await axios.post('api/v1/register', {
        email, userName, phone, password
    })
}
const loginUser = async (account, password) =>
{
    return await axios.post('api/v1/login', {
        account, password
    })
}
const fetchAllUsers = async (page, limit) =>
{
    return await axios.get(`api/v1/users/read?page=${ page }&limit=${ limit }`);
}
const deleteUser = async (user) =>
{
    return axios.delete('api/v1/users/delete', { data: { id: user.id } });
}
const fetchGroup = async () =>
{
    return axios.get('api/v1/group/read');
}

const createNewUser = (userData) =>
{
    return axios.post('api/v1/users/create', { ...userData });
}

const updateCurrentUser = (userData) =>
{
    return axios.put('api/v1/users/update', { ...userData });
}

const getUserAccount = () =>
{
    return axios.get('api/v1/account')
}

const logOutUser = () =>
{
    return axios.post('api/v1/logout');
}

export
{
    registerNewUser, loginUser, fetchAllUsers, deleteUser, fetchGroup, createNewUser,
    updateCurrentUser, getUserAccount, logOutUser
}