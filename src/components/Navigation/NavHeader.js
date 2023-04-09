import React, { useContext } from 'react';
import { Link, NavLink, useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import './Nav.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logOutUser } from '../../service/userService';
import { toast } from 'react-toastify';

function NavHeader ( props ) {
  const { user, logoutContext } = useContext( UserContext );
  const location = useLocation();
  const history = useHistory();

  const handleLogout = async () => {
    let data = await logOutUser();
    localStorage.removeItem( 'jwt' );
    logoutContext();
    if ( data && +data.EC === 0 ) {
      history.push( '/login' );
    }
    else {
      toast.error( data.EM )
    }
  }
  if ( user && user.isAuthenticated === true || location.pathname === '/' ) {
    return (
      <>
        <div className='nav-header'>
          <Navbar bg="header" expand="lg">
            <Container>
              <Navbar.Brand href='/'><span className='brand-name'>Chobits</span></Navbar.Brand>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                  <NavLink to="/" exact className='nav-link'>Home</NavLink>
                  <NavLink to="/login" className='nav-link'>Login</NavLink>
                  <NavLink to="/register" className='nav-link'>Register</NavLink>
                  <NavLink to="/users" className='nav-link'>Users</NavLink>
                  <NavLink to="/role" className='nav-link'>Role</NavLink>
                  <NavLink to="/group-role" className='nav-link'>GroupRole</NavLink>

                </Nav>
              </Navbar.Collapse>
              <Nav>
                {
                  user && user.isAuthenticated === true ?
                    <>
                      <Nav.Item className='nav-link'>Wellcome { user.account.userName }</Nav.Item>
                      <NavDropdown title="Setting" id="basic-nav-dropdown">
                        <NavDropdown.Item >My profile</NavDropdown.Item>
                        <NavDropdown.Item >
                          Change password
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item >
                          <span onClick={ () => handleLogout() } style={ { display: 'block' } }>Log out</span>
                        </NavDropdown.Item>
                      </NavDropdown>
                    </>
                    :
                    <>
                      <Link to='/login' className='nav-link'>Login</Link>
                    </>
                }

              </Nav>
            </Container>
          </Navbar>
        </div>
      </>
    );
  } else {
    return <></>
  }
}

export default NavHeader;
