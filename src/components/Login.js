import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = ()=>{

    const [email,setEmail] = React.useState('');
    const [password,setPassword] = React.useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        const auth = localStorage.getItem('user');

        if(auth){
            navigate('/');
        }
    },[])

    const handleLogin = async ()=>{
        console.log(email, password);
        let result = await fetch('http://localhost:5000/login',{
            method:'post',
            body:JSON.stringify({email, password}),
            headers:{
                'Content-Type':'application/json'
            }
        });
        result = await result.json();
        console.log('login data', result);

        if(result.auth){
            localStorage.setItem('user',JSON.stringify(result.user));
            localStorage.setItem('token',JSON.stringify(result.auth));
            navigate('/');
        }
        else {
            alert('Please enter valid credentials');
        }
    }
    return(
        <div className="login">
            <h1>Login Page</h1>
            <input onChange={(e)=>setEmail(e.target.value)} type="text" className="inputbox" value={email} placeholder="Enter email"/>
            <input onChange={(e)=>setPassword(e.target.value)} type="password" className="inputbox" value={password} placeholder="Enter password"/>
            <button onClick={handleLogin} className="button" type="button">Login</button>
        </div>
    );
};

export default Login;