import { useState } from 'react';
import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import PropTypes from 'prop-types';

import ReactDOM from 'react-dom'
import React, { useEffect } from 'react'
import Layout from '../components/Layout';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from "mdbreact";
import { AiFillMail, AiFillPhone, AiOutlineHome, AiFillFacebook, AiFillTwitterSquare, AiOutlineInstagram } from "react-icons/ai";

const Footer = () => {
    return (
        <React.Fragment>
            <MDBFooter color="blue-grey" className="page-footer font-small lighten-5 pt-0">
                <div style={{ backgroundColor: "green" }}>
                <MDBContainer>
                    <MDBRow className="py-4 d-flex align-items-center">
                    <MDBCol md="6" lg="5" className="text-center text-md-left mb-4 mb-md-0">
                        <h6 className="mb-0 white-text" style={{color: "white" }}>
                        <p style={{paddingRight: "10px"}}>
                            Sosyal medya kanallarımıza bir göz atın!
                        </p>
                        <AiFillFacebook size="2rem" marginleft= '10vh'/>
                        <AiFillTwitterSquare size="2rem" marginleft= '10vh' />
                        <AiOutlineInstagram size="2rem" marginleft= '10vh' />
                        </h6>                
                    </MDBCol>
                    <MDBCol md="6" lg="7" className="text-center text-md-right">
                        <a className="fb-ic ml-0">
                        <i className="fab fa-facebook-f white-text mr-lg-4"> </i>
                        </a>
                        <a className="tw-ic">
                        <i className="fab fa-twitter white-text mr-lg-4"> </i>
                        </a>
                        <a className="gplus-ic">
                        <i className="fab fa-google-plus-g white-text mr-lg-4"> </i>
                        </a>
                        <a className="li-ic">
                        <i className="fab fa-linkedin-in white-text mr-lg-4"> </i>
                        </a>
                        <a className="ins-ic">
                        <i className="fab fa-instagram white-text mr-lg-4"> </i>
                        </a>
                    </MDBCol>
                    </MDBRow>
                </MDBContainer>
                </div>
                <MDBContainer className="mt-5 mb-4 text-center text-md-left">
                <MDBRow className="mt-3">
                    <MDBCol md="3" lg="4" xl="3" className="mb-4 dark-grey-text">
                    
                    {/* BURSA logo here. See styles.css page. */}
                    <div className="bursalogo"></div>
                    
                    </MDBCol>
                    <MDBCol md="10" lg="2" xl="2" className="mb-4 dark-grey-text" style={{marginLeft: '120px'}}>
                    <h6 className="text-uppercase font-weight-bold">
                        <strong>BİZDEN</strong>
                    </h6>
                    <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                    <p>
                        <a href="/aboutus" className="dark-grey-text" style={{color: "green"}}>
                            Hakkımızda
                        </a>
                    </p>
                    <p>
                        <a href="/sss" className="dark-grey-text" style={{color: "green"}}>
                            Sıkça Sorulan Sorular
                        </a>
                    </p>
                    <p>
                        <a href="/blogs" className="dark-grey-text" style={{color: "green"}}>
                            Blog
                        </a>
                    </p>
                    <p>
                        <a href="/contact" className="dark-grey-text" style={{color: "green"}}>
                            İletişim
                        </a>
                    </p>
                    </MDBCol>
    
                    <MDBCol md="3" lg="2" xl="2" className="mb-4 dark-grey-text">
                    <h6 className="text-uppercase font-weight-bold">
                        <strong>KULLANIM</strong>
                    </h6>
                    <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                    <p>
                        <a href="/publishnotice" className="dark-grey-text" style={{color: "green"}}>
                            Bize İlan Verin
                        </a>
                    </p>
                    <p>
                        <a href="/publishads" className="dark-grey-text" style={{color: "green"}}>
                            Bize Reklam Verin
                        </a>
                    </p>
                    <p>
                        <a href="/invest" className="dark-grey-text" style={{color: "green"}}>
                            Yatırımcımız Olun
                        </a>
                    </p>
                    </MDBCol>
                    <MDBCol md="4" lg="3" xl="3" className="mb-4 dark-grey-text">
                    <h6 className="text-uppercase font-weight-bold">
                        <strong>İLETİŞİM</strong>
                    </h6>
                    <hr className="deep-purple accent-2 mb-4 mt-0 d-inline-block mx-auto" style={{ width: "60px" }} />
                    <p>
                        <AiOutlineHome color="green"/>
                        <i className="fa fa-home" /> Letafet Mah. Letafet Sok. No: 64 Orhaneli/Bursa
                    </p>
                    <p>
                        <AiFillMail color="green"/>
                        <i className="fa fa-envelope" /> info.cambazim@gmail.com
                    </p>
                    <p>
                        <AiFillPhone color="green"/>
                        <i className="fa fa-phone" /> + 90 536 983 55 31
                    </p>
                    </MDBCol>
                </MDBRow>
                </MDBContainer>
                <div className="footer-copyright text-center py-3">
                <MDBContainer fluid>
                    &copy; {new Date().getFullYear()} Copyright:{" "}
                    <a href="http://www.cambazim.com"> cambazim.com </a>
                </MDBContainer>
                </div>
            </MDBFooter>
        </React.Fragment>
    );
}


export default Footer;