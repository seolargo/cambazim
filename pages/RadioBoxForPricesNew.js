import React, { useState, useEffect } from 'react';

const prices = [
    {
        _id: 0,
        name: 'Herhangi bir ücret',
        array: []
    },
    {
        _id: 1,
        name: '0₺ - 99₺',
        array: [0, 99]
    },
    {
        _id: 2,
        name: '100₺ - 199₺',
        array: [100, 199]
    },
    {
        _id: 3,
        name: '200₺ - 499₺',
        array: [200, 499]
    },
    {
        _id: 4,
        name: '500₺ - 999₺',
        array: [500, 999]
    },
    {
        _id: 5,
        name: '1000₺ - 1999₺',
        array: [1000, 1999]
    },
    {
        _id: 6,
        name: '2000₺ - 2999₺',
        array: [2000, 2999]
    },
    {
        _id: 7,
        name: '3000₺ - 3999₺',
        array: [3000, 3999]
    },
    {
        _id: 8,
        name: '4000₺ - 4999₺',
        array: [4000, 4999]
    },
    {
        _id: 9,
        name: '5000₺ - 5999₺',
        array: [5000, 5999]
    },
    {
        _id: 10,
        name: '6000₺ - 6999₺',
        array: [6000, 6999]
    },
    {
        _id: 11,
        name: '7000₺ - 7999₺',
        array: [7000, 7999]
    },
    {
        _id: 12,
        name: '8000₺ - 8999₺',
        array: [8000, 8999]
    },
    {
        _id: 13,
        name: '9000₺ - 9999₺',
        array: [9000, 9999]
    },
    {
        _id: 14,
        name: '10000₺ - 14999₺',
        array: [10000, 14999]
    },
    {
        _id: 15,
        name: '15000₺ - 19999₺',
        array: [15000, 19999]
    },
    {
        _id: 16,
        name: '20000₺ - 29999₺',
        array: [20000, 29999]
    },
    {
        _id: 17,
        name: '30000₺ - 39999₺',
        array: [30000, 39999]
    }
];

export const RadioBoxForPricesNew = ({ prices, handleFilters }) => {
    const [value, setValue] = useState(0);

    const handleChange = (event) => {
        handleFilters(event.target.value);
        setValue(event.target.value);
    };

    return prices
        ? prices.map((p, i) => (
              <li key={i} className="list-unstyled">
                  <input onChange={handleChange} value={`${p._id}`} name={p} type="radio" className="mr-2" />
                  <label className="form-check-label">{p.name}</label>
              </li>
          ))
        : null;
};

export default RadioBoxForPricesNew;
