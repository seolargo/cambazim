import React, {useState} from "react";
import Link from 'next/link';
import renderHTML from 'react-render-html';
import moment from 'moment';
import { API } from '../../config';

import {addItem, removeItem} from '../crud/cartHelpers'
import { Redirect, BrowserRouter } from "react-router-dom";

import {BsList} from 'react-icons/bs';
import {CgDanger} from 'react-icons/cg';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Card = ({
    product,
    showAddToLaterLookAtButton = true,
    showRemoveProductButton = false,
    setRun = f => f,
    run = undefined    
}) => {
    const [redirect, setRedirect] = useState(false);

    /*const showProductCategories = product => {
        return product.categories.map((c, i) => (
            <Link key={i} href={`/categories/${c.slug}`}>
                <a>{c.name}</a>
            </Link>
        ))
    };*/

    const addToCart = () => {
        addItem(product, setRedirect(true));
        toast.success(`${product.title} isimli ilanı listenize ekledik!`);
    }

    const shouldRedirect = redirect => {
        if (redirect) {
            return(
                <BrowserRouter>
                    <Redirect to="/"/>
                </BrowserRouter> 
            )
        }
    }

    const showAddToLaterLookAtBtn = showAddToLaterLookAtButton => {
        return (
            showAddToLaterLookAtButton &&
            <button onClick={addToCart} className="btn btn-outline-success">
                <BsList /> Daha sonra bak
            </button>
        );
    }

    const showRemoveButton = showRemoveProductButton => {
        return (
            showRemoveProductButton &&
            <button 
                onClick={() => {
                    removeItem(product._id);
                    setRun(!run); // run useEffect in parent Cart
                    window.location.reload(false)
                }} 
                className="btn btn-outline-danger"
            >
                <CgDanger /> Listemden kaldır
            </button>
        );
    }

    return (
        <div className="card mb-2" style={{maxWidth: "1000px", maxHeight: "400px"}}>
            <div className="row no-gutters">
                {shouldRedirect(redirect)}
                <ToastContainer />
                <div className="col-md-4">
                    <img src={`${API}/product/photo1/${product.slug}`} className="card-img center mt-3 mb-3" alt="..." style={{maxHeight: "400px"}}/>
                </div>
                <div className="col-md-8">
                    <Link href={`/products/${product.slug}`}>
                        <a>
                            <h5 className="ml-3 mt-2" style={{color: '#228B22'}}>{product.title}</h5>
                        </a>
                    </Link>
                    <h6 className="ml-3" style={{color: 'green', fontSize: '25px', textAlign: 'left', float: 'left'}}>{product.price}₺</h6>
                    <h6 className="mr-3" style={{color: 'green', fontSize: '25px', textAlign: 'right', float: 'right'}}>{showAddToLaterLookAtBtn(showAddToLaterLookAtButton)}</h6>
                    <h6 className="mr-3" style={{color: 'green', fontSize: '25px', textAlign: 'right', float: 'right'}}>{showRemoveButton(showRemoveProductButton)}</h6>
                    <hr style={{clear:"both"}}/>
                    <h5 className="ml-3"><small className="text-muted">{product.animalType}-{product.poultry} {product.animalSubCategories} {product.animalVariety}</small></h5>
                    <h5 className="ml-3"><small className="text-muted">{product.village}/{product.town}/{product.city} İlanın yayımlanma tarihi: {moment(product.createdAt, "YYYY-MM-DDThh-mm-ssZ").format('DD/MM/YYYY')}</small></h5>
                </div>
            </div>
        </div>
    )
}

export default Card;