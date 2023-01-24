import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const UpdateProduct =()=>{
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [company, setCompany] = useState('');
    //const [error, setError] = useState(false); 
   const navigate = useNavigate();
    const params = useParams();

    useEffect(()=>{
        getProductDetails();
    },[]);

    const getProductDetails = async()=>{
        console.log(params);
        let result = await fetch(`http://localhost:5000/single-product/${params.id}`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company);
    }
    
    const updateProduct = async()=>{
        console.log(name, price, category, company); 

        let result = await fetch(`http://localhost:5000/update-product/${params.id}`,{
                      method:'put',
                      body:JSON.stringify({name, price, category, company}),
                      headers:{
                        'Content-Type':'application/json',
                        authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                    }
        });

          result = await result.json();

          if(result){
            console.log('Data successfully updated',result);
            navigate('/');
          }
          else{
            console.log('Data note updated');
            navigate('/');
          }
       
    }
  
    return(
        <div className="add-product">
            <h3>Add Product</h3>
            
            <input value={name}   onChange = {(e)=>{setName(e.target.value)}} placeholder="Enter product name" className="inputbox"/>
            <input value={price} onChange = {(e)=>{setPrice(e.target.value)}} placeholder="Enter product price" className="inputbox"/> 
            <input value={category} onChange = {(e)=>{setCategory(e.target.value)}}  placeholder="Enter product category" className="inputbox"/>
            <input value={company}  onChange={(e)=>{setCompany(e.target.value)}}   placeholder="Enter product company" className="inputbox"/>
             

            <button onClick={updateProduct} className="button" >Update Product</button>
        </div>
    )
};

export default UpdateProduct;