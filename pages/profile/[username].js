import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/Layout';
import {userPublicProfile} from '../../actions/user';
import {API, DOMAIN, APP_NAME, FB_APP_ID} from '../../config';
import moment from 'moment';

import ContactForm from '../../components/form/ContactForm';

const UserProfile = ({user, products, query}) => {

    const head = () => {
        <Head>
            <title>
                {user.username} | {APP_NAME}
            </title>
            <meta 
                name="description" 
                content={`${user.username}'in İlanları`}
            />
            {/* canonical: It tells the search engine (e.g. Google) whatever content we have in this page, that refers to the same page. */}
            <link rel="canonical" href={`${DOMAIN}/profile/${query.username}`}/>
            <meta property="og:title" content={`${user.name} | ${APP_NAME}`}/> {/* Open Graph will be used for Facebook. */}
            <meta 
                property="og:description" 
                content={`${user.username}'in İlanları`}
            />
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}/profile/${query.username}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta property="og:image" content={`${DOMAIN}/static/images/hong-kong.jpg`}/>
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/hong-kong.jpg`} />
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    };

    const showUserProducts = () => {
        return products.map((product, i) => {
            //console.log(product);
            return (
                <div className="mt-4 mb-4" key={i}>
                    <Link href={`/products/${product.slug}`}>
                        <a className="lead" style={{color: 'green'}}>{product.title}</a>
                    </Link>
                    <h6><br />İlanın yayımlanma tarihi: {moment(product.createdAt, "YYYY-MM-DDThh-mm-ssZ").format('DD/MM/YYYY')}</h6>
                    <h6>Hayvanın Türü: {product.animalType}-{product.poultry}-{product.animalSubCategories}-{product.animalVariety}</h6>
                    <h6>Fiyat: {product.price}₺</h6>
                    <h6>Adet: {product.quantity}</h6>
                    <h6>Hayvanın yaşı: {product.age}</h6>
                    <h6>Hayvanın tahmini kilosu: {product.estimatedWeight} kg</h6>
                </div>
            )
        })
    }

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8">
                                            <h5>Adı: {user.name}</h5>
                                            <h5>İletişim Bilgileri</h5>
                                            <h6>Cep Telefon Numarası: {user.cellphone ? user.cellphone : 'Kullanıcı cep telefon numarasını belirtmemiş'}</h6> 
                                            <h6>E-posta adresi: {user.email}</h6>
                                            <h6>Adres bilgisi: {user.address}</h6>
                                        </div>
                                        <div className="col-md-4">
                                            <img 
                                                src={`${API}/user/photo/${user.username}`}
                                                className="img img-fluid img-thumbnail mb-3"
                                                style={{maxHeight: '150px', maxWidth: '100%'}}
                                                alt="user profile"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <br/>

                <div className="container pb-5">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-success pt-4 pb-4 pl-4 pr-4 text-light">
                                        {`${user.name}'in Aktif İlanları`} 
                                    </h5>
                                    <div>
                                        {showUserProducts()}
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title bg-success pt-4 pb-4 pl-4 pr-4 text-light">
                                        {`${user.name}'e Mesaj Gönder!`}
                                    </h5>
                                    <br/>
                                    <ContactForm authorEmail={user.email}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Layout>
        </React.Fragment>
    )
}

UserProfile.getInitialProps = ({query}) => {
    return userPublicProfile(query.username)
        .then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                //console.log(data);
                return {user: data.user, products: data.products, query}
            }
        })
}

export default UserProfile;