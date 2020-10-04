import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/product';

const Search = () => {
    const [values, setValues] = useState({
        search: undefined,
        results: [],
        searched: false,
        message: ''
    });

    const { search, results, searched, message } = values;

    /*
        When the user clicks the "Ara" button...
    */
    const searchSubmit = (e) => {
        e.preventDefault();
        listSearch({ search }).then((data) => {
            setValues({
                ...values,
                results: data,
                searched: true,
                message: `Aramanıza benzer ${data.length} ilan bulundu`
            });
            //setValues({ ...values, results: data, searched: true});
        });
    };

    const handleChange = (e) => {
        // console.log(e.target.value);
        setValues({
            ...values,
            search: e.target.value,
            searched: false,
            results: []
        });
    };

    /*
        When the regular user writes something onto the console, it shows the list of the notices that matches with the given regex.

        @author: Ömer Faruk Yavuz
        @date: 27.08.20
    */
    const searchedProducts = (results = []) => {
        return (
            <div className="jumbotron bg-white" id="list-searched-results">
                {message && <p className="pt-4 text-muted font-italic">{message}</p>}

                {results.map((product, i) => {
                    return (
                        <div key={i}>
                            <Link href={`/products/${product.slug}`}>
                                <a className="text-primary">{product.title}</a>
                            </Link>
                        </div>
                    );
                })}
            </div>
        );
    };

    const searchForm = () => (
        <form onSubmit={searchSubmit}>
            <div className="row" id="search-bar">
                <div className="col-md-6">
                    <input type="search" className="form-control" placeholder="İlanlarda ara" onChange={handleChange} />
                </div>
                <div className="col-md-2">
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
            {searched && <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>{searchedProducts(results)}</div>}
        </div>
    );
};

export default Search;
