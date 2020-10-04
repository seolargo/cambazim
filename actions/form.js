import fetch from 'isomorphic-fetch';
import { API } from '../config';
import { isAuth } from './auth';

export const emailContactForm = (data) => {
    let emailEndpoint;

    if (data.authorEmail) {
        //If we have admin role...
        emailEndpoint = `${API}/contact-product-author`;
    } else {
        emailEndpoint = `${API}/contact`;
    }

    return fetch(`${emailEndpoint}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then((response) => {
            console.log(JSON.stringify(data)); //{"name": "ömer yavuz", "email": "mail.omerfaruk@gmail.com", "message": "ömerr"}
            return response.json();
        })
        .catch((err) => console.log(err)); //SyntaxError: Unexpected token < in JSON at position 0
};
