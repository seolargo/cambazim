import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom';
import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import { AiFillMail, AiFillPhone, AiOutlineHome } from 'react-icons/ai';

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
    DropdownItem
} from 'reactstrap';

//import SocialFollow from './SocialFollow';
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <React.Fragment>
            <MDBFooter color="blue-grey" className="page-footer font-small lighten-5 pt-0">
                <div style={{ backgroundColor: 'green' }} id="sosyal-medya-kanallarimiz-text">
                    <MDBContainer>
                        <MDBRow className="py-4 d-flex align-items-center">
                            <MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
                                <h6 className="mb-0 white-text" style={{ color: 'white' }}>
                                    <p id="gozat">Sosyal medya kanallarımıza göz atın!</p>
                                    {/*<SocialFollow />*/}
                                    <div className="social-container">
                                        <a
                                            href="https://www.facebook.com/Cambazim-113928107117730/"
                                            className="facebook social"
                                        >
                                            <FaFacebook size="2x" />
                                        </a>
                                        {'     '}
                                        <a href="https://twitter.com/cambazimtr" className="twitter social">
                                            <FaTwitter size="2x" />
                                        </a>
                                        {'     '}
                                        <a href="https://www.instagram.com/p/CE9WKPFHMgM/" className="instagram social">
                                            <FaInstagram size="2x" />
                                        </a>
                                    </div>
                                </h6>
                            </MDBCol>
                        </MDBRow>
                    </MDBContainer>
                </div>
                <MDBContainer className="mt-5 mb-4 text-center text-md-left">
                    <MDBRow className="mt-3" id="row">
                        {/*<MDBCol md="3" lg="4" xl="3" className="mb-4 dark-grey-text">
                        {/* BURSA logo here. See styles.css page. */}
                        {/*<div className="bursalogo"></div>
                    </MDBCol>*/}
                        <MDBCol md="3" lg="2" xl="2" className="dark-grey-text" id="bizden-footer">
                            <h6 className="text-uppercase font-weight-bold">
                                <strong>BİZDEN</strong>
                            </h6>
                            <hr
                                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                style={{ width: '60px' }}
                            />
                            <p>
                                <a href="/aboutus" className="dark-grey-text" style={{ color: 'green' }}>
                                    Hakkımızda
                                </a>
                            </p>
                            <p>
                                <a href="/sss" className="dark-grey-text" style={{ color: 'green' }}>
                                    Sıkça Sorulan Sorular
                                </a>
                            </p>
                            <p>
                                <a href="/blogs" className="dark-grey-text" style={{ color: 'green' }}>
                                    Blog
                                </a>
                            </p>
                            <p>
                                <a href="/contact" className="dark-grey-text" style={{ color: 'green' }}>
                                    İletişim
                                </a>
                            </p>
                            <br />
                        </MDBCol>
                        <MDBCol md="3" lg="2" xl="2" className="dark-grey-text" id="kullanim-footer">
                            <h6 className="text-uppercase font-weight-bold">
                                <strong>KULLANIM</strong>
                            </h6>
                            <hr
                                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                style={{ width: '60px' }}
                            />
                            <p>
                                <a href="/publishnotice" className="dark-grey-text" style={{ color: 'green' }}>
                                    Bize İlan Verin
                                </a>
                            </p>
                            <p>
                                <a href="/publishads" className="dark-grey-text" style={{ color: 'green' }}>
                                    Bize Reklam Verin
                                </a>
                            </p>
                            <p>
                                <a href="/invest" className="dark-grey-text" style={{ color: 'green' }}>
                                    Yatırımcımız Olun
                                </a>
                            </p>
                            <br />
                        </MDBCol>
                        <MDBCol md="4" lg="3" xl="3" className="dark-grey-text" id="iletisim-footer">
                            <h6 className="text-uppercase font-weight-bold">
                                <strong>İLETİŞİM</strong>
                            </h6>
                            <hr
                                className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto"
                                style={{ width: '60px' }}
                            />
                            <p>
                                <AiOutlineHome color="green" />
                                <i className="fa fa-home" /> Letafet Mah. Letafet Sok. No: 64 Orhaneli/Bursa
                            </p>
                            <p>
                                <AiFillMail color="green" />
                                <i className="fa fa-envelope" /> info@cambazim.com
                            </p>
                            <p>
                                <AiFillPhone color="green" />
                                <i className="fa fa-phone" /> + 90 536 983 55 31
                            </p>
                            <br />
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3" id="copyright">
                    <MDBContainer fluid>
                        &copy; {new Date().getFullYear()} Copyright:{' '}
                        <a href="http://www.cambazim.com"> cambazim.com </a>
                    </MDBContainer>
                </div>
            </MDBFooter>
        </React.Fragment>
    );
};

export default Footer;
