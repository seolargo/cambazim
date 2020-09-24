/*import React, {useState, useEffect} from 'react';

const Checkbox = ({prices, handleFilters}) => {

    const [checked, setChecked] = useState([]);
    
    const handleToggle = p => () => {
        const currentCategoryId = checked.indexOf(p); // return the first index of -1
        const newCheckedCategoryId = [...checked];	
        // if currently checked was not already in checked state --> then push
        // else pull/take off
        if (currentCategoryId === -1) {
            newCheckedCategoryId.push(p)
        } else {
            newCheckedCategoryId.splice(currentCategoryId, 1);
        }
        //console.log(newCheckedCategoryId);
        setChecked(newCheckedCategoryId);
        handleFilters(newCheckedCategoryId);
    }

    /*
        Printing...
    */
    /*return (
        prices && prices.map((p, i) => (
            <li key={i} className='list-unstyled'>
                <input 
                    onChange={handleToggle(p._id)} 
                    value={checked.indexOf(p._id === -1)}
                    type='checkbox'  
                    className='form-check-input'
                />
                <label className='form-check-label'>{p.name}</label>
            </li>
        ))
    )
}

export default Checkbox;*/