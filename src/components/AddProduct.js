import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct =()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    const [error, setError] = useState(false); 
    const navigate = useNavigate();
     
    const collectData = async()=>{
        // console.log(name, price, category, company);
       
        if(!name || !price || !category || !company ){
            setError(true)
            return false
        }
        
        const userid = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userid);  
        
        let result = await fetch('http://localhost:5000/add-product',{
            method:'post',
            body:JSON.stringify({name, price, category, company, userid}),
            headers:{
                'Content-Type':'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });

        result = await result.json();
        console.log(result);
        navigate('/');
    }
    return(
        <div className="add-product">
            <h3>Add Product</h3>
            <input value={name} onChange ={((e)=>setName(e.target.value))} type="text" placeholder="Enter product name" className="inputbox"/>
              { error && !name && <span className="invalid-input">Enter valid name</span> }

            <input value={price} onChange = {(e)=>setPrice(e.target.value)} type="text" placeholder="Enter product price" className="inputbox"/>
              { error && !price && <span className="invalid-input">Enter valid price</span> }

            <input value={category} onChange = {(e)=>setCategory(e.target.value)} type="text" placeholder="Enter product category" className="inputbox"/>
              { error && !category && <span className="invalid-input">Enter valid category</span> }

            <input value={company}  onChange={(e)=>setCompany(e.target.value)} type="text"  placeholder="Enter product company" className="inputbox"/>
              { error && !company && <span className="invalid-input">Enter valid company</span> }

            <button onClick={collectData} className="button" type="button">Add Product</button>
        </div>
    )
};

export default AddProduct;