import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from 'next/router';
import Layout from '../../components/Layout';
import {useState, useEffect} from 'react';

import {singleProduct} from '../../actions/product';

import {API, DOMAIN, APP_NAME, FB_APP_ID} from '../../config';
import moment from 'moment';
import renderHTML from 'react-render-html';
import React, { Component } from 'react';
import { render } from 'react-dom';

import ReactImageMagnify from 'react-image-magnify';
import Slider from '@farbenmeer/react-spring-slider';
import PropTypes from 'prop-types'

import ViewSlider from 'react-view-slider'
import SmallCard from '../../components/product/SmallCard'

import {GoogleMap, withScriptjs, withGoogleMap} from 'react-google-maps';

//import SwiftSlider from 'react-swift-slider'

/*
    This section is coded for the single Cambazim notice page.

    @author: Ömer Faruk Yavuz
    @version: 1.0
    @since: 24-08-2020
*/

const SingleProduct = ({ product, query }) => {

    const head = () => {
        <Head>
            <title>
                {product.title} | {APP_NAME}
            </title>
            <meta 
                name="description" 
                content={product.mdesc}
            />
            {/* canonical: It tells the search engine (e.g. Google) whatever content we have in this page, that refers to the same page. */}
            <link rel="canonical" href={`${DOMAIN}/products/${query.slug}`}/>
            <meta property="og:title" content={`${product.title} | ${APP_NAME}`}/> {/* Open Graph will be used for Facebook. */}
            <meta 
                property="og:description" 
                content={product.mdesc}
            />
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/products/${query.slug}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta property="og:image" content={`${API}/product/photo/${product.slug}`}/>
            <meta property="og:image:secure_url" content={`${API}/product/photo/${product.slug}`} />
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
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

    console.log('lat: ', product.latProduct);
    console.log('lng: ', product.lngProduct);

    const BulletComponent = ({onClick, isActive}) => (
        /* Below here is used for green dots. */
        <li
            style={{
                width: '15px',
                height: '15px',
                backgroundColor: 'green',
                margin: '0 7px',
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

    function Map() {
        return (
            <GoogleMap 
                defaultZoom={20}
                defaultCenter={{lat: product.latProduct, lng: product.lngProduct}}
            />
        );
    } 

    const WrappedMap = withScriptjs(withGoogleMap(Map));

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
                                    <div className="col-sm" >
                                        {/*<ImageGallery items={images} />*/}
                                        {/*<ReactImageMagnify {...{
                                            smallImage: {
                                                alt: 'Notice page picture.',
                                                //isFluidWidth: true,
                                                src: `${API}/blog/photo/${blog.slug}`,
                                                className: "img img-fluid featured-image",
                                                width: 500,
                                                height: 500
                                            },
                                            largeImage: {
                                                src: `${API}/blog/photo/${blog.slug}`,
                                                width: 1200,
                                                height: 1800
                                            }
                                        }
                                        }/>*/}
                                        {/*<img 
                                            src={`${API}/blog/photo/${blog.slug}`} 
                                            alt={blog.title} 
                                            className="img img-fluid featured-image"
                                        />*/}

                                        {/* NOTE: We tried to use it. It worked at first. But there is an issue for the pictures (attention to the pixels)
                                            See the ref. page: https://github.com/zulucoda/react-swift-slider/blob/master/README.md
                                            <SwiftSlider data={data} dotColor={"green"} activeDotColor={"brown"} height={460} />    */}
                                        
                                        {/* See Slider ref. page: https://reactjsexample.com/a-slider-which-uses-react-spring-under-the-hood/ */}
                                         
                                        <Slider 
                                            activeIndex={2} 
                                            hasBullets 
                                            BulletComponent={BulletComponent}
                                            ArrowComponent={ArrowComponent}
                                            onSlideChange={onSlideChange}
                                            >
                                                {`${API}/product/photo1/${product.slug}` && <img 
                                                    src={`${API}/product/photo1/${product.slug}`} 
                                                    alt={product.title} 
                                                    className="img img-fluid featured-image mt-5"
                                                    style={{width: '540px', height: 'auto'}}
                                                />}
                                                {`${API}/product/photo2/${product.slug}` && <img 
                                                    src={`${API}/product/photo2/${product.slug}`} 
                                                    alt={product.title} 
                                                    className="img img-fluid featured-image mt-5"
                                                    style={{width: '540px', height: 'auto'}}
                                                />}
                                                {`${API}/product/photo3/${product.slug}` && <img 
                                                    src={`${API}/product/photo3/${product.slug}`} 
                                                    alt={product.title} 
                                                    className="img img-fluid featured-image mt-5"
                                                    style={{width: '540px', height: 'auto'}}
                                                />}
                                                {`${API}/product/photo4/${product.slug}` && <img 
                                                    src={`${API}/product/photo4/${product.slug}`} 
                                                    alt={product.title} 
                                                    className="img img-fluid featured-image mt-5"
                                                    style={{width: '540px', height: 'auto'}}
                                                />}
                                                {`${API}/product/photo5/${product.slug}` && <img 
                                                    src={`${API}/product/photo5/${product.slug}`} 
                                                    alt={product.title} 
                                                    className="img img-fluid featured-image mt-5"
                                                    style={{width: '540px', height: 'auto'}}
                                                />}
                                                {`${API}/product/photo6/${product.slug}` && <img 
                                                    src={`${API}/product/photo6/${product.slug}`} 
                                                    alt={product.title} 
                                                    className="img img-fluid featured-image mt-5"
                                                    style={{width: '540px', height: 'auto'}}
                                                />}
                                        </Slider>
                                       
                                    </div>
                                    <div className="col-sm mt-5">
                                        <small>İlan ID: </small> <small style={{fontWeight: 'bold'}}>  {product._id}</small>
                                        <hr/>
                                        <small>Kategori: </small> <small style={{fontWeight: 'bold'}}>  {product.animalType}</small>
                                        <hr/>
                                        <small>Türü: </small> <small style={{fontWeight: 'bold'}}>  {product.animalVariety} {product.poultry} {product.animalSubCategories} </small>
                                        <hr/>
                                        <small>Yaşı: </small> <small style={{fontWeight: 'bold'}}>  {product.age}</small>
                                        <hr />
                                        <small>Satış Türü:</small> <small style={{fontWeight: 'bold'}}>  {product.sellerType}</small>
                                        <hr/>
                                        <small>Satış Adeti:</small> <small style={{fontWeight: 'bold'}}>  {product.quantity}</small>
                                        <hr/>
                                        <small>Konum: </small> <small style={{fontWeight: 'bold'}}>  {product.village}/{product.town}/{product.city}</small>
                                        <hr/>
                                        <small>Adet Fiyatı: </small> <small style={{fontWeight: 'bold'}}>  {product.price}₺</small>
                                        <hr />
                                        <small>Satıcı Açık Adres: </small> <small style={{fontWeight: 'bold'}}>  {product.sellerAddress}</small>
                                        <hr />
                                        <small>Satıcı Cep Telefon Numarası: </small> <small style={{fontWeight: 'bold'}}>  {product.sellerCellphone}</small>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <div className="container">
                                    <h1 className="display-6 pb-1 pt-5 text-center">
                                        {product.title}
                                    </h1>
                                    {/* Bootstrap properties */}
                                    <p className="shadow-sm text-center lead mt-3 mark">
                                        Şu anda 
                                        <Link href={`/profile/${product.postedBy.username}`}>
                                            <a style={{color: 'green'}}> {product.postedBy.username}</a>
                                        </Link>
                                        'in ilanına bakıyorsunuz | İlanın yayımlanma tarihi: {moment(product.createdAt, "YYYY-MM-DDThh-mm-ssZ").format('DD/MM/YYYY')}
                                    </p>
                                </div>

                                <p className="text-center lead mt-1 mark font-weight-bold display-4">
                                    İlanın Detayları
                                </p>

                                <div className="container">
                                    <section>
                                        <div className="col-md-12 lead">
                                            {renderHTML(product.body)}
                                        </div>
                                    </section>
                                </div>
                                <hr/>
                                <div className="container">
                                    <div class="row">
                                        <div class="col">
                                            <p className="text-center font-weight-bold display-5">
                                                Değerli üreticimiz ile iletişime geçerken lütfen dikkat edin!
                                            </p>
                                            <p className="text-center">
                                                Eğer hayvan sahibi ile yüz yüze görüşecekseniz lütfen toplu ya da açık alanlarda görüşmeye çalışın.
                                                Hayvan sahibinden hayvanını satın almadan önce herhangi bir kapora ödemeyin.
                                                Sistem uzmanlarımız uç noktalarda fiyat veren hayvan sahiplerini uyarmaktadır. Uygun görülmeyen ilanlar sitemizden ivedilikle kaldırılmaktadır.
                                                Alacağınız hayvan ile resimdeki uyuşmuyorsa ortamı terk edin.
                                                cambazim.com'da yer alan kullanıcıların oluşturduğu tüm içerik, görüş ve bilgilerin doğruluğu, eksiksiz ve değişmez olduğu, yayınlanması ile ilgili yasal yükümlülükler içeriği oluşturan kullanıcıya aittir. 
                                                Bu içeriğin, görüş ve bilgilerin yanlışlık, eksiklik veya yasalarla düzenlenmiş kurallara aykırılığından cambazim.com hiçbir şekilde sorumlu değildir. 
                                                Sorularınız için ilan sahibi ile irtibata geçebilirsiniz.
                                            </p>
                                        </div>
                                        <div class="col">
                                            <WrappedMap
                                                googleMapURL = {`https://maps.googleapis.com/maps/api/js?key=AIzaSyBOLlOXZVdk0T2wMOrKN5IMEnUGRpbMnC8&v=3.exp&libraries=geometry,drawing,places`}
                                                loadingElement = {<div style={{height: '100%'}}/>}
                                                containerElement = {<div style={{height: '100%'}} />}
                                                mapElement = {<div style={{height: '100%'}}/>}
                                            />
                                        </div>
                                    </div>                                    
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
                                <br />
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

SingleProduct.getInitialProps = ({query}) => {
    return singleProduct(query.slug).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            //console.log('Single blog success: ', data);
            return {product: data, query};
        }
    });
}

export default withRouter(SingleProduct);