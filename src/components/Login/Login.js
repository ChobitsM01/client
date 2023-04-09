import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import { UserContext } from '../../context/UserContext';
import { loginUser } from '../../service/userService';
import './Login.scss'

const Login = () => {
    const { user, loginContext } = useContext( UserContext );
    const [ account, setAccount ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const defaultObjInput = {
        isValidAccount: true,
        isValidPassword: true
    }
    const [ objInput, setObjInput ] = useState( defaultObjInput );

    let history = useHistory();

    const handleKeyPress = ( e ) => {
        if ( e.key === "Enter" || e.keyCode === 13 ) {
            handleLogin();
        }
    }
    const handleCreateNewAccount = () => {
        history.push( "/register" );
    }

    const handleLogin = async () => {
        setObjInput( defaultObjInput );
        if ( !account ) {
            setObjInput( { ...defaultObjInput, isValidAccount: false } );
            toast.error( 'Please enter your email or phone number' );
            return
        }
        if ( !password ) {
            setObjInput( { ...defaultObjInput, isValidPassword: false } );
            toast.error( 'Please enter your password' );
            return
        }
        let response = await loginUser( account, password );
        if ( response && + response.EC === 0 ) {
            //success
            let { rolesOfGroup, email, userName, access_token } = response.DT;

            let data = {
                isAuthenticated: true,
                access_token,
                account: { rolesOfGroup, email, userName }
            }
            localStorage.setItem( 'jwt', access_token )
            loginContext( data );
            history.push( '/' );
        }
        if ( response && + response.EC !== 0 ) {
            toast.error( response.EM );
        }
    }

    useEffect( () => {
        if ( user && user.isAuthenticated === true ) {
            history.push( '/' );
        }
    }, [] )

    return (
        <div className='login-container container d-flex'>
            <div className='left d-none col-sm-7 d-sm-block'>
                <div className='brand'>
                    <h1>Chobits</h1>
                </div>
            </div>
            <div className='right col-12 col-sm-5'>
                <div className='form-login'>
                    <input
                        className={ objInput.isValidAccount ? 'form-control mt-3' : 'form-control is-invalid mt-3' }
                        value={ account }
                        onChange={ ( e ) => setAccount( e.target.value ) }
                        type="text" name="email"
                        placeholder="Email address or phone number" />

                    <input
                        className={ objInput.isValidPassword ? 'form-control mt-3' : 'form-control is-invalid mt-3' }
                        value={ password }
                        onChange={ ( e ) => setPassword( e.target.value ) }
                        type="password" name="password"
                        placeholder='Password'
                        onKeyDown={ ( e ) => handleKeyPress( e ) }
                    />

                    <button className='btn btn-primary btn-login mt-3' onClick={ () => handleLogin() }>Login</button>

                    <span className='d-block text-center mt-3'>
                        <a className='forgot-pass' href='#'>Forgotten password?</a>
                    </span>

                    <hr />

                    <div >
                        <button className='btn-sign-up text-center my-4 mx-auto d-block' onClick={ handleCreateNewAccount }>Create new account</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;