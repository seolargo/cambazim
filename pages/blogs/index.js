import Head from 'next/head';
import Link from 'next/link';
import {withRouter} from 'next/router';
import Layout from '../../components/Layout';
import {useState} from 'react';

import {listBlogsWithCategoriesAndTags} from '../../actions/blog';

import renderHTML from 'react-render-html';
import moment from 'moment';
import Card from '../../components/blog/Card';
import {API, DOMAIN, APP_NAME, FB_APP_ID} from '../../config';
import Search from '../../components/blog/Search';

const Blogs = ({blogs, categories, tags, totalBlogs, blogsLimit, blogSkip, router}) => {
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
    
    const [limit, setLimit] = useState(blogsLimit);
    const [skip, setSkip] = useState(0);
    const [size, setSize] = useState(totalBlogs);
    const [loadedBlogs, setLoadedBlogs] = useState([]);

    const loadMore = () => {
        let toSkip = skip + limit;
        listBlogsWithCategoriesAndTags(toSkip, limit).then(data => {
            if(data.error) {
                console.log(data.error);
            } else {
                setLoadedBlogs([...loadedBlogs, ...data.blogs]);
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

    const showAllBlogs = () => {
        return blogs.map((blog, i) => {
            return (
                <article key={i}>
                    <Card blog={blog}/>
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

    const showAllTags = () => {
        //Get the blog, get the index.
        return tags.map((t, i) => (
            <Link href={`/tags/${t.slug}`} key={i}>
                <a className="btn btn-outline-success mr-1 ml-1 mt-3">{t.name}</a>
            </Link>
        ))
    };
    
    const showLoadedBlogs = () => {
        return loadedBlogs.map((blog, i) => (
            <article key={i}>
                <Card blog={blog}/>
            </article>
        ));
    }

    return (
            <React.Fragment>
                {head()}
                <Layout>
                    <Search />
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

                        <div className="container-fluid">
                            {showAllBlogs()}
                        </div>
                        <div className="container-fluid">
                            {showLoadedBlogs()}
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
Blogs.getInitialProps = () => {
    let skip = 0;
    let limit = 8;
    return listBlogsWithCategoriesAndTags(skip, limit).then(data => {
        if(data.error) {
            console.log(data.error);
        } else {
            return {
                blogs: data.blogs, 
                categories: data.categories, 
                tags: data.tags,
                totalBlogs: data.size,
                blogsLimit: limit,
                blogSkip: skip
            };
        }
    });
};

export default withRouter(Blogs);