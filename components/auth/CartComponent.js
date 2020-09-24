import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getCart, removeAllItems } from '../crud/cartHelpers';
import Card from '../product/Card';
import Layout from '../Layout';
 
import {CgDanger} from 'react-icons/cg';

const CartComponent = () => {
  const [items, setItems] = useState([]);
  const [run, setRun] = useState(false);
 
  useEffect(() => {
    setItems(getCart());
  }, [run]);
 
  const showItems = items => {
    return (
      <div>
        <h2 className={"mt-2 mb-2"} style={{color: 'green'}}>Seçtiğiniz {`${items.length}`} ilana göz atın!</h2>
        <hr />
        <button
          type="button" 
          className="btn btn-danger mt-2 mb-4" 
          onClick={() => {
                    removeAllItems();
                    setRun(!run); // run useEffect in parent Cart
                    window.location.reload(false)
                }}>
                <CgDanger />  Hepsini sil 
        </button>
        {items.map((product, i) => (
          <Card
            key={i} 
            product={product}
            showAddToLaterLookAtButton={false}
            showRemoveProductButton={true}
          />
        ))}
      </div>
    );
  };
 
  const noItemsMessage = () => (
    <h2 style={{color: 'green'}}>
      Listeniz boş 
      <br />
      {/*<Link to="/index"> Ana sayfaya geri dönün. </Link>*/}
    </h2>
  );
 
  return (  
    <div className="row">
      <div>
        {items.length > 0 ? showItems(items) : noItemsMessage()}
      </div>
    </div>
  );
};
 
export default CartComponent;