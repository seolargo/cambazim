import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from 'next/router';
import Layout from '../../components/Layout';
import {useState, useEffect} from 'react';
import {singleBlog} from '../../actions/blog';
import {API, DOMAIN, APP_NAME, FB_APP_ID} from '../../config';
import moment from 'moment';
import renderHTML from 'react-render-html';
import React, { Component } from 'react';
import { render } from 'react-dom';

import ReactImageMagnify from 'react-image-magnify';
import Slider from '@farbenmeer/react-spring-slider';
import PropTypes from 'prop-types'

import ViewSlider from 'react-view-slider'
import SmallCard from '../../components/blog/SmallCard'

//import SwiftSlider from 'react-swift-slider'

/*
    This section is coded for the single Cambazim notice page.

    @author: Ömer Faruk Yavuz
    @version: 1.0
    @since: 24-08-2020
*/

const SingleBlog = ({ blog, query }) => {

    const head = () => {
        <Head>
            <title>
                {blog.title} | {APP_NAME}
            </title>
            <meta 
                name="description" 
                content={blog.mdesc}
            />
            {/* canonical: It tells the search engine (e.g. Google) whatever content we have in this page, that refers to the same page. */}
            <link rel="canonical" href={`${DOMAIN}/blogs/${query.slug}`}/>
            <meta property="og:title" content={`${blog.title} | ${APP_NAME}`}/> {/* Open Graph will be used for Facebook. */}
            <meta 
                property="og:description" 
                content={blog.mdesc}
            />
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/blogs/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta property="og:image" content={`${API}/blog/photo/${blog.slug}`}/>
            <meta property="og:image:secure_url" content={`${API}/blog/photo/${blog.slug}`} />
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    };

    const showBlogCategories = blog => {
        return blog.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a className="btn btn-success mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ))
    };

    const showBlogTags = blog => {
        //console.log(blog)
        return blog.tags.map((t, i) => (
            <Link key={i} href={`/categories/${t.slug}`}>
                <a className="btn btn-outline-success mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ))
    };

    /*
        const data =  [
            {'id':'1','src':`${API}/blog/photo/${blog.slug}`},
            {'id':'2','src':`${API}/blog/photo/${blog.slug}`},
            {'id':'3','src':`${API}/blog/photo/${blog.slug}`},
            {'id':'4','src':`${API}/blog/photo/${blog.slug}`},
            {'id':'5','src':'https://media.mfbproject.co.za/repos/ARWP_Infra_Desk_1920_1080_Quad.png'}
        ];
    */

    const onSlideChange = index => console.log(`changed to slide ${index}`);

    const BulletComponent = ({onClick, isActive}) => (
        /* Below here is used for green dots. */
        <li
            style={{
                width: '15px',
                height: '15px',
                backgroundColor: 'green',
                margin: '0 2px',
                opacity: isActive && '0.5'
            }}
            onClick={onClick}
        />
    );
  
    BulletComponent.propTypes = {
        onClick: PropTypes.func.isRequired,
        isActive: PropTypes.bool.isRequired
    };
  
    const ArrowComponent = ({onClick, direction}) => {
        return (
            <div
                style={{
                    border: '1px solid black',
                    padding: '1em',
                    backgroundColor: 'white'
                }}
                onClick={onClick}
            >
                {direction}
            </div>
        );
    };
  
    ArrowComponent.propTypes = {
        onClick: PropTypes.func.isRequired,
        direction: PropTypes.string.isRequired
    };

    const showComments = () => {
        //TODO
    }

    return ( 
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <article>
                        <div className="container-fluid">
                            <section> 
                                {/* This section can be used for rotating the page stayed at the notice page. 
                                    When you want to rotate, change below, not CSS file.*/}
                                {/* See CSS file --> featured-image
                                <div className="row" style={{marginTop: '20px', marginLeft: '300px'}}> */}
                                <div className="row">
                                    <img 
                                        src={`${API}/blog/photo/${blog.slug}`} 
                                        alt={blog.title} 
                                        className="img img-fluid featured-image"
                                        id="blogImageCenter"
                                        style={{maxWidth: '25%', maxHeight: '25%'}}
                                    />
                                </div>
                                
                                {/*<ImageGallery items={images} />*/}
                                
                                {/*<AwesomeSlider>
                                    <div data-src={`${API}/blog/photo/${blog.slug}`} />
                                    {/*<div>1</div>*/}
                                    {/*<div data-src="/path/to/hong-kong.jpg"/>**/}
                                    
                                    {/*<div data-src={`./hong-kong.jpg`} />
                                    <div>2</div>
                                </AwesomeSlider>*/}
                               
                            </section>

                            <section>
                                <div className="container">
                                    {/* Bootstrap properties */}
                                    <p className="shadow-sm text-center lead mt-3 mark">
                                        <Link href={`/profile/${blog.postedBy.username}`}>
                                            <a style={{color: 'green'}}> {blog.postedBy.username}</a>
                                        </Link>{' '}
                                        yazdı
                                    </p>

                                    <div className="text-center">
                                        {showBlogCategories(blog)}
                                        {showBlogTags(blog)}
                                        <br />
                                        <br />
                                    </div>
                                </div>

                                <p className="text-center lead mt-1 mark font-weight-bold display-4">
                                    {blog.title}
                                </p>

                                <div className="container">
                                    <section>
                                        <div className="col-md-12 lead">
                                            {renderHTML(blog.body)}
                                        </div>
                                    </section>
                                </div>
                                <hr/>
                                {/* Tried to set it, however we could not do it.
                                    <div className="container">
                                    <h4 className="text-center pt-5 pb-5 h2">
                                        İlginizi çekebilecek diğer ilanlar
                                    </h4>
                                    {/*<div className="row">{showRelatedBlog()}</div>*/}
                                    {/*<div className="row">{JSON.stringify(related)}</div>*/}
                                    {/*JSON.stringify(related)*/}
                                {/*</div>*/}

                                <div className="container pb-5">
                                    {showComments()}
                                </div>
                                <p className="text-center display-6">
                                        Copyright © 2020 cambazim.com
                                </p>
                            </section>
                        </div>
                    </article>
                </main>
            </Layout>
        </React.Fragment>
    )
}

SingleBlog.getInitialProps = ({query}) => {
    return singleBlog(query.slug).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            //console.log('Single blog success: ', data);
            return {blog: data, query};
        }
    });
}

export default withRouter(SingleBlog);