import Link from 'next/link';
import renderHTML from 'react-render-html';
import { useState, useEffect } from 'react';
import { listSearch } from '../../actions/product';

import React, { Component } from 'react';
import {Accordion, Card, Button, FormCheck, Form} from 'react-bootstrap';

const AdvancedSearch = () => {
    /*
        import React, { useState } from 'react';

        function Example() {
        //    "count" adında yeni bir state değişkeni tanımlayın.
        const [count, setCount] = useState(0);
        count adında bir state değişkeni tanımladık ve 0‘a eşitledik. 
        
        React, tekrar eden render işlemleri arasında değişkenin mevcut değerini hatırlayacak ve fonksiyonumuza en yeni değeri verecektir. 
        Eğer şu anki count değerini değiştirmek isterseniz setCount çağırabilirsiniz.
    */
    const [values, setValues] = useState({
        checked: false,
        results: [],
        searched: false
    });

    //Now we will use these values
    const { checked, results, searched } = values;

    //When the computer understands that there is a value that is changed, then it re-set's.
    const handleChange = e => {
        // console.log(e.target.value);
        setValues({ 
            ...values, 
            checked: true, 
            searched: false, 
            results: [] 
        });
    };

    /*
        When the user clicks the "Ara" button...
    */
    const searchSubmit = e => {
        e.preventDefault();
        listSearch({ search }).then(data => {
            setValues({ 
                ...values, 
                results: data, 
                searched: true
            });
            //setValues({ ...values, results: data, searched: true});
        });
    };

    const searchForm = () => (
        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="0">
                    Click me!
                </Accordion.Toggle>

                </Card.Header>

                <Accordion.Collapse eventKey="0">
                <Card.Body>
                    <Form.Check type="checkbox" label="Kümes Hayvanları" onChange={handleChange}/>
                </Card.Body>
                </Accordion.Collapse>

            </Card>
            <Card>
                <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey="1">
                    Click me!
                </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                <Card.Body>Hello! I'm another body</Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>
    );

    return (
        <div className="container-fluid" >
            <div className="pt-3 pb-5">{searchForm()}</div>
            {searched && <div style={{ marginTop: '-120px', marginBottom: '-80px' }}>{searchedProducts(results)}</div>}
        </div>
    );
};

export default AdvancedSearch;
