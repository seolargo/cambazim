import fetch from 'isomorphic-fetch';
import { API } from '../config';
import {isAuth} from './auth';

export const emailContactForm = (data) => {
    let emailEndpoint;

    if (data.authorEmail) {
        //If we have admin role...
        emailEndpoint = `${API}/contact-product-author`;
    } else if (isAuth() && isAuth().role === 0) {
        emailEndpoint = `${API}/contact`;
    }

    return fetch(`${emailEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': `application/json`
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};