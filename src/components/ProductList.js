import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";



const ProductList = ()=>{
    const[products, setProducts] = useState([]);

    useEffect(()=>{
        getProducts();
    },[]);

     const getProducts = async()=>{
        let result = await fetch('http://localhost:5000/products',{
            method:'get',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }

        });
        result = await result.json();
        setProducts(result);
     }

     const deleteProduct = async(id)=>{
        let result = await fetch(`http://localhost:5000/delete-product/${id}`,{
            method:'delete',
            headers:{
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result){
           getProducts();
        }
     }

     const searchHandle = async (event)=>{
        let key = event.target.value;

        if(key){
            let result = await fetch(`http://localhost:5000/search-product/${key}`,
            {
                headers:{
                    authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
                }
            });
            result = await result.json();
            setProducts(result);
            console.log(result);
        }
        else{
            getProducts();
        }
       

     }
   

    return(
        <div className="product-list">
            <h3>Product lists</h3>
            <input onChange={ searchHandle } className="searchbox" text="text" placeholder="Search Products"/>
            <ul>
                <li className="color">S No.</li>
                <li className="color">Name</li>
                <li className="color">Price</li>
                <li className="color">Category</li>
                <li className="color">Company</li>
                <li className="color">Action</li>
            </ul>
            { 
             products.length > 0 ? products.map((item, index)=>
                <ul key={item._id}>
                <li>{index+1}</li>
                <li>{item.name}</li>
                <li>${item.price}</li>
                <li>{item.category}</li>
                <li>{item.company}</li>
                <li>
                    <Link className="update-button" to={`/update/${item._id}`}>Update</Link>
                    <button className="delete-button" onClick={ ()=>deleteProduct(item._id)}>Delete</button>
                </li>
               </ul>
            ):
            <h1>Result Not Found...</h1>
            }
        </div>
    )
}

export default ProductList;