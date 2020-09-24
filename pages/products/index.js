import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from 'next/router';
import Layout from '../../components/Layout';
import {useState} from 'react';
import {listProductsWithCategoriesAndTags} from '../../actions/product';
import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/product/Card';
import {API, DOMAIN, APP_NAME, FB_APP_ID} from '../../config';

const Products = ({products, categories, tags, totalProducts, productsLimit, productSkip, router}) => {
    const head = () => {
        <Head>
            <title>
                Hayvan alıp-satmanın en kolay yolu | {APP_NAME}
            </title>
            <meta 
                name="description" 
                content="Hayvancılık, hayvan alım-satımı, büyükbaş hayvan, küçükbaş hayvan, inek, at, boğa, öküz, koyun, keçi"
            />
            {/* canonical: It tells the search engine (e.g. Google) whatever content we have in this page, that refers to the same page. */}
            <link rel="canonical" href={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:title" content={`Latest web development tutorials on | ${APP_NAME}`}/> {/* Open Graph will be used for Facebook. */}
            <meta 
                property="og:description" 
                content="Hayvancılık, hayvan alım-satımı, büyükbaş hayvan, küçükbaş hayvan, inek, at, boğa, öküz, koyun, keçi"
            />
            <meta property="og:type" content="website"/>
            <meta property="og:url" content={`${DOMAIN}${router.pathname}`}/>
            <meta property="og:site_name" content={`${APP_NAME}`}/>

            <meta property="og:image" content={`${DOMAIN}/static/images/hong-kong.jpg`}/>
            <meta property="og:image:secure_url" content={`${DOMAIN}/static/images/hong-kong.jpg`}/>
            <meta property="og:image:type" content="image/jpg"/>
            <meta property="fb:app_id" content={`${FB_APP_ID}`}/>
        </Head>
    };
    
    const [limit, setLimit] = useState(productsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalProducts);
    const [loadedProducts, setLoadedProducts] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;
        listProductsAll(toSkip, limit).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setLoadedProducts([...loadedProducts, ...data.products]);
                setSize(data.size);
                setSkip(toSkip);
            }
        });
    };

    const loadMoreButton = () => {
        return (
            size > 0 && size >= limit && (
            <button onClick={loadMore} className="btn btn-outline-success btn-lg">
                Daha fazlası
            </button>
        )
        );
    }

    const showAllProducts = () => {
        return products.map((product, i) => {
            return (
                <article key={i}>
                    <Card product={product}/>
                    <hr/>
                </article>
            );
        });
    };

    const showAllCategories = () => {
        //Get the blog, get the index.
        return categories.map((c, i) => (
            <Link href={`/categories/${c.slug}`} key={i}>
                <a className="btn btn-success mr-1 ml-1 mt-3">{c.name}</a>
            </Link>
        ));   
    }
    
    const showLoadedProducts = () => {
        return loadedProducts.map((product, i) => (
            <article key={i}>
                <Card product={product}/>
            </article>
        ));
    }

    return (
        <React.Fragment>
            {head()}
            <Layout>
                <main>
                    <div className="container-fluid">
                        <header>
                            <div className="col-md-12 pt-3">
                                <h1 className="display-4 font-weight-bold text-center">
                                    Cambazım Blog
                                </h1>

                                <h1 className="display-5 font-weight-bold text-center">
                                    Sektörden Haberler ve En Güncel Bilgiler
                                </h1>
                            </div>
                            <section>
                                <div className="pb-5 text-center">
                                    {showAllCategories()}
                                </div>
                            </section>
                        </header>
                    </div>

                    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"></link>
                    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
                    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>

                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th id="header-animal-image-id">Hayvanın Resmi</th>
                                <th id="header-animal-type-id">Hayvan Tipi</th>
                                <th id="header-notice-header-id">İlan Başlığı</th>
                                <th>Kimden</th>
                                <th>Fiyat</th>
                                <th>İlan Tarihi</th>
                                <th>Ülke</th>
                                <th>İl</th>
                                <th>İlçe</th>
                                <th>Köy</th>
                                <th>Pazarlık</th>
                                <th>Kimden</th>
                            </tr>
                        </thead>
                        <tbody>

                        </tbody>
                    </table>

                    <div className="container-fluid">
                        {showAllProducts()}
                    </div>
                    <div className="container-fluid">
                        {showLoadedProducts()}
                    </div>
                    <div className="text-center pt-5 pb-5">
                        {loadMoreButton()}
                    </div>
                </main>
            </Layout>
        </React.Fragment>
    );
};

//getInitialProps can be used only on pages, not in components.
Products.getInitialProps = () => {
    let skip = 0;
    let limit = 8;
    return listProductsAll(skip, limit).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {
                products: data.products, 
                totalProducts: data.size,
                productsLimit: limit,
                productSkip: skip
            };
        }
    });
};

export default withRouter(Products);