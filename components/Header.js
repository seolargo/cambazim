import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';

import { APP_NAME } from '../config';

import {signout, isAuth} from '../actions/auth';
import CartComponent from '../components/auth/CartComponent';

import {BrowserRouter as Route} from 'react-router-dom'

import {FaListUl} from 'react-icons/fa'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavbarText,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';

import '.././node_modules/nprogress/nprogress.css';
import { itemTotal } from './crud/cartHelpers';

import {NavLink as RRNavLink} from 'react-router-dom';

Router.onRouteChangeStart = url => NProgress.start()
Router.onRouteChangeComplete = url => NProgress.done()
Router.onRouteChangeError = url => NProgress.done()

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => {
        setIsOpen(!isOpen);
    }

    Navbar.propTypes = {
        light: PropTypes.bool,
        dark: PropTypes.bool,
        fixed: PropTypes.string,
        color: PropTypes.string,
        role: PropTypes.string,
        expand: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
        tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        // pass in custom element to use
      }

      NavbarBrand.propTypes = {
        tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        // pass in custom element to use
    }

    NavbarText.propTypes = {
        tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        // pass in custom element to use
    }
    
    NavbarToggler.propTypes = {
        type: PropTypes.string,
        tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
        // pass in custom element to use
      }

    return(
        <React.Fragment>
            <Navbar color="red" light expand="md">
            
            <Link href="/">
                <NavLink 
                    className="font-weight-bold" 
                    style={{color: "green"}}
                    id="appname"
                    >
                    {APP_NAME}
                </NavLink>
            </Link>

            <NavbarToggler onClick={toggle} />

            <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    {isAuth() && 
                        <Link href="/cart">       
                            <NavLink id="bakilacaklarlistem"><FaListUl className="mb-1 mr-1"/>Bakılacaklar Listem</NavLink>
                        </Link>
                    }
                    <React.Fragment>     
                        <NavItem>
                            {/* Anchor tag "a" will force the page to be reloaded. */}
                            <a href="/user/crud/product" className="btn btn-success text-light">
                                Ücretsiz* İlan Ver
                            </a>
                        </NavItem>
     
                        {!isAuth() && 
                            <React.Fragment>
                                
                                <NavItem>
                                    <NavLink href="/signin" id="signinSignup">
                                        Giriş Yap
                                    </NavLink>
                                </NavItem>

                                <NavItem>
                                    <NavLink href="/signup" id="signinSignup"> 
                                        Kayıt ol
                                    </NavLink>
                                </NavItem>

                            </React.Fragment>
                        }

                        {/*JSON.stringify(isAuth()) --> It prints some string. Uncomment for checking out.*/}
                        {isAuth() && isAuth().role === 0 && (
                            <NavItem>
                                <Link href="/user">
                                    {/*`${isAuth().name}'s Dashboard`*/}
                                    <NavLink>{'Senin Sayfan'}</NavLink>
                                </Link>
                                
                            </NavItem>
                        )}

                        {isAuth() && isAuth().role === 1 && (
                            <NavItem>
                                <Link href="/admin">
                                    {/*<NavLink>{`${isAuth().name}'s Dashboard`}</NavLink>*/}
                                    <NavLink id="adminPanel" className="ml-2">{'Admin Panel'}</NavLink>
                                </Link>   
                            </NavItem>
                        )}

                        {isAuth() && (
                            <NavItem>
                                <NavLink style={{cursor: 'pointer'}} onClick={() => signout(() => Router.replace(`/signin`))}>
                                    Çıkış Yap
                                </NavLink>
                            </NavItem>
                        )}
                </React.Fragment>
                </Nav>
            </Collapse>
        </Navbar>
        </React.Fragment>
    );
}

export default Header;