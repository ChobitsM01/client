import React, { useEffect, useState } from 'react';
import { getUserAccount } from '../service/userService';
const UserContext = React.createContext({ name: '', auth: false })
const UserProvider = ({ children }) =>
{
    const userDataDefault = {
        isLoading: true,
        isAuthenticated: false,
        token: '',
        account: {}
    }
    const [ user, setUser ] = useState(userDataDefault);

    // Login updates the user data with a name parameter
    const loginContext = (userData) =>
    {
        setUser({ ...userData, isLoading: false });
    };

    // Logout updates the user data to default
    const logoutContext = () =>
    {
        setUser({ ...userDataDefault, isLoading: false });
    };

    const fetchUser = async () =>
    {
        let response = await getUserAccount();
        if (response && response.EC === 0)
        {
            let { rolesOfGroup, email, userName, access_token } = response.DT;

            let data = {
                isAuthenticated: true,
                access_token,
                account: { rolesOfGroup, email, userName },
                isLoading: false
            }
            setUser(data);
        }
        else
        {
            setUser({ ...userDataDefault, isLoading: false });
        }
    }

    useEffect(() =>
    {
        if (window.location.pathname !== '/' && window.location.pathname !== '/login')
        {
            fetchUser();
        }
        else
        {
            setUser({ ...user, isLoading: false });
        }
    }, [])

    return (
        <UserContext.Provider value={ { user, loginContext, logoutContext } }>
            { children }
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };