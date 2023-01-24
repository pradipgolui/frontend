import React ,{useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";

const SignUp = ()=>{
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }
    })

    const collectData = async ()=>{
        console.warn(name, email ,password);
        let result = await fetch('http://localhost:5000/register',{
            method:'post',
            body:JSON.stringify({name, email, password }),
            headers:{
                'Content-type':'application/json'
            }
        });

        result = await result.json();
        console.log(result);
        if(result){
            localStorage.setItem('user',JSON.stringify(result.result));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/');
            let y =JSON.parse(localStorage.getItem('user'));
            console.log('///',y.name);
        }
    }

    return (
        <div className="register">
            <h1>Register</h1>
            <input value={name} onChange={(e)=>setName(e.target.value)} className="inputbox" type="text" placeholder="Enter your name"/>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} className="inputbox" type="email" placeholder="Enter your email"/>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} className="inputbox" type="password" placeholder="Enter your password"/>
            <button onClick={collectData} className="button" type="button">Sign Up</button>
        </div>
    )
}

export default SignUp;