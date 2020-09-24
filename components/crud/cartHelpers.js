export const addItem = (item = [], next = f => f) => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            /*
                JSON.parse() to convert JSON to object.
                JSON.stringify() to convert object to JSON.
            */
        }
        cart.push({
            ...item,
            count: 1
        })

        /*
            Method below removes the duplications
            Build an array from (new Set()) method and turn it back into array using Array.form().
            Later we can re-map it.
            New Set will only allow unique values in it.
            Pass the id's of each product.
            If the loop tries to add the same value again, It'll get ignored with the array of id's we got on when first map() was used.
            Run map() on it again and return the actual product from the cart.
        */
        cart = Array.from(new Set(cart.map(p => p._id))).map(id => {
            return cart.find(p => p._id === id);
        });

        localStorage.setItem('cart', JSON.stringify(cart));
        next();
    }
}

export const itemTotal = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart')).length
        }
    }
    return 0;
}

export const getCart = () => {
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            return JSON.parse(localStorage.getItem('cart'))
        }
    }
    return [];
}

export const removeItem = productId => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            /*
                JSON.parse() to convert JSON to object.
                JSON.stringify() to convert object to JSON.
            */
        }

        cart.map((product, i) => {
            if (product._id === productId) {
                cart.splice(i, 1);
            }
        });

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
}

export const removeAllItems = () => {
    let cart = [];
    if (typeof window !== 'undefined') {
        if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            /*
                JSON.parse() to convert JSON to object.
                JSON.stringify() to convert object to JSON.
            */
        }

        cart.map((product, i) => {
            cart.splice(i, cart.length);
        });
        //console.log(cart.length) 4

        localStorage.setItem('cart', JSON.stringify(cart));
    }
    return cart;
}

export const emptyCart = next => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('cart');
        next();
    }
};