import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import { toast } from 'react-toastify';
import './Register.scss';
import { registerNewUser } from '../../service/userService';
import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Register = () => {
    const { user } = useContext( UserContext );
    const [ email, setEmail ] = useState( '' );
    const [ phone, setPhone ] = useState( '' );
    const [ userName, setName ] = useState( '' );
    const [ password, setPassword ] = useState( '' );
    const [ repassword, setRepassword ] = useState( '' );
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isValidrepassword: true
    }
    const [ objCheckInput, setObjCheckInput ] = useState( defaultValidInput );

    let history = useHistory();
    const handleLogin = () => {
        history.push( "/login" );
    }
    const isValidInput = () => {
        setObjCheckInput( { ...defaultValidInput } );
        if ( !email ) {
            setObjCheckInput( { ...defaultValidInput, isValidEmail: false } );
            toast.error( 'Email is required!' );
            return false;
        }

        let regex = /\S+@\S+\.\S+/;
        if ( !regex.test( email ) ) {
            setObjCheckInput( { ...defaultValidInput, isValidEmail: false } );
            toast.error( 'Your email not true' );
            return false;
        }

        if ( !phone ) {
            setObjCheckInput( { ...defaultValidInput, isValidPhone: false } );
            toast.error( 'Phone is required!' );
            return false;
        }

        if ( !password ) {
            setObjCheckInput( { ...defaultValidInput, isValidPassword: false } );
            toast.error( 'Password is required!' );
            return false;
        }

        if ( password !== repassword ) {
            setObjCheckInput( { ...defaultValidInput, isValidrepassword: false } );
            toast.error( 'Password is not same' );
            return false;
        }

        return true;

    }

    const handleRegister = async () => {
        let check = isValidInput();
        if ( check === true ) {
            let response = await registerNewUser( email, userName, phone, password )
            let serverData = response;
            if ( +serverData.EC === 0 ) {
                toast.success( serverData.EM );
                handleLogin();
            }
            else {
                toast.error( serverData.EM );
            }
        }
    }

    useEffect( () => {
        let session = sessionStorage.getItem( 'account' );
        if ( session ) {
            history.push( '/' );
        }
    }, [] )

    useEffect( () => {
        if ( user && user.isAuthenticated === true ) {
            history.push( '/' );
        }
    }, [] )

    return (
        <div className='register-container container d-flex mt-2'>
            <div className='left d-none col-sm-7 d-sm-block'>
                <div className='brand'>
                    <h1>Chobits</h1>
                </div>
            </div>
            <div className='right col-12 col-sm-5'>
                <div className='form-register'>
                    <label htmlFor='email'>Email</label>
                    <input
                        className={ objCheckInput.isValidEmail ? 'form-control' : 'form-control is-invalid' }
                        value={ email }
                        onChange={ ( e ) => setEmail( e.target.value ) }
                        type="text" id="email"
                        placeholder="Enter your email address" />

                    <label htmlFor='phone'>Phone number</label>
                    <input
                        className={ objCheckInput.isValidPhone ? 'form-control' : 'form-control is-invalid' }
                        value={ phone }
                        onChange={ ( e ) => setPhone( e.target.value ) }
                        type="text" id="phone"
                        placeholder="Enter your phone number" />

                    <label htmlFor='username'>Username</label>
                    <input className='form-control'
                        value={ userName }
                        onChange={ ( e ) => setName( e.target.value ) }
                        type="text" id="username"
                        placeholder="Enter your name" />

                    <label htmlFor='password'>Password</label>
                    <input className={ objCheckInput.isValidPassword ? 'form-control' : 'form-control is-invalid' }
                        value={ password }
                        onChange={ ( e ) => setPassword( e.target.value ) }
                        type="password" id="password"
                        placeholder="Enter your password" />

                    <label htmlFor='repassword'>Re-Password</label>
                    <input className={ objCheckInput.isValidrepassword ? 'form-control' : 'form-control is-invalid' }
                        value={ repassword }
                        onChange={ ( e ) => setRepassword( e.target.value ) }
                        type="password" id="repassword"
                        placeholder="Re-enter your password" />


                    <button
                        className='btn btn-primary btn-register mt-3'
                        onClick={ handleRegister }
                    >Register</button>

                    <hr />
                    <div >
                        <button className='btn-sign-up my-4 mx-auto d-block' onClick={ handleLogin }>Already have account? Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;