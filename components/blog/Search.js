import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/blog';

const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    const searchSubmit = (e) => {
        e.preventDefault();
        listSearch({ search }).then((data) => {
            setValues({
                ...values,
                results: data,
                searched: true,
                message: `Aramanıza benzer ${data.length} blog yazısı bulundu`
            });
            //setValues({ ...values, results: data, searched: true});
        });
    };

    const handleChange = (e) => {
        // console.log(e.target.value);
        setValues({ ...values, search: e.target.value, searched: false, results: [] });
    };

    /*
        When the regular user writes something onto the console, it shows the list of the notices that matches with the given regex.

        @author: Ömer Faruk Yavuz
        @date: 27.08.20
    */
    const searchedBlogs = (results = []) => {
        return (
            <div className="jumbotron bg-white" style={{ marginLeft: '500px' }}>
                {message && <p className="pt-4 text-muted font-italic">{message}</p>}

                {results.map((blog, i) => {
                    return (
                        <div key={i}>
                            <Link href={`/blogs/${blog.slug}`}>
                                <a className="text-primary">{blog.title}</a>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className="row">
                {/*<div className="col-md-4" style={{marginLeft: '500px'}} id="search-bar">
                    <input type="search" className="form-control" placeholder="Bloglarda ara" onChange={handleChange} />
                   </div>*/}
                <div id="blog-search-bar">
                    <input type="search" className="form-control" placeholder="Bloglarda Ara" onChange={handleChange} />
                </div>
                <div id="blog-search-bar-button">
                    <button className="btn btn-block btn-outline-success" type="submit">
                        Ara
                    </button>
                </div>
            </div>
        </form>
    );

    return (
        <div className="container-fluid">
            <div className="pt-3 pb-5">{searchForm()}</div>
            {searched && <div id="blog-search-results">{searchedBlogs(results)}</div>}
        </div>
    );
};

export default Search;
