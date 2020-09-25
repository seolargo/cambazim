import { isAuth, handleResponse } from './auth';
import queryString from 'query-string';
import { API } from '../config';
import fetch from 'isomorphic-fetch';

export const createProduct = (product, token) => {
    let createProductEndpoint;

    if (isAuth() && isAuth().role === 1) {
        //If we have admin role...
        createProductEndpoint = `${API}/product`;
    } else if (isAuth() && isAuth().role === 0) {
        createProductEndpoint = `${API}/user/product`;
    }

    return fetch(`${createProductEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const listProductsAll = (skip, limit) => {
    const data = {
        limit, skip
    }
    return fetch(`${API}/productsAll`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const singleProduct = slug => {
    return fetch(`${API}/product/${slug}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

export const list = (username) => {
    let listProductsEndpoint;

    if (username) {
        //If we have admin role...
        listProductsEndpoint = `${API}/${username}/products`;
    } else{
        listProductsEndpoint = `${API}/products`;
    }

    return fetch(`${listProductsEndpoint}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json()
    })
    .catch(err => console.log(err));
};

export const removeProduct = (slug, token) => {
    let deleteProductEndpoint;

    if (isAuth() && isAuth().role === 1) {
        deleteProductEndpoint = `${API}/product/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        deleteProductEndpoint = `${API}/user/product/${slug}`;
    }
    
    return fetch(`${deleteProductEndpoint}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'appliaction/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            handleResponse(response);
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (product, token, slug) => {
    let updateProductEndpoint;

    if (isAuth() && isAuth().role === 1) {
        updateProductEndpoint = `${API}/product/${slug}`;
    } else if (isAuth() && isAuth().role === 0) {
        updateProductEndpoint = `${API}/user/product/${slug}`;
    }

    return fetch(`${updateProductEndpoint}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
    .then(response => {
        handleResponse(response);
        return response.json();
    })
    .catch(err => console.log(err));
};

export const listSearch = (params) => {
    //console.log('search params', params); //search='node'
    let query = queryString.stringify(params); // ?limit=100&pagination=10 like that to the backend.
    //console.log('query params', query);
    return fetch(`${API}/product/search?${query}`, {
        method: 'GET'
    })
    .then(response => {
        return response.json();
    })
    .catch(err => console.log(err));
};

/**
 **  Added later. See: Shopping Udemy
 **  Where we filter the products. Main page renders the datas inside this code.
 **/
export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters
    };
    return fetch(`${API}/products/by/search`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        mode: 'no-cors',
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
};