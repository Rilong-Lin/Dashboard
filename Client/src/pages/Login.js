import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PageLogin() {

    const [firstName, setFirstName] = useState();
    const [password, setPassword] = useState();


    const navigate = useNavigate();

    function handleFisrtName(text) {
        setFirstName(text);
    }

    const handlePassword = (text) => {
        setPassword(text);
    }

    const loginAccount = () => {
        axios.post("http://localhost:8080/user/login", {email: firstName, password: password})
            .then(response => {
                if (response.data.message === 'authentificated') {
                    navigate("/Home")
                }
                if (response.data.message === 'Password is incorrect') {
                    console.log("MAUVAIS MDP")
                }
                if (response.data.message === 'No user with that email address') {
                    console.log("MAUVAIS PWD")
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    return (
        <div style={{ textAlign: 'center', justifyContent: 'center' }}>
                        <text style={{fontSize: '3em', marginTop: '40px'}}>
                        Welcome to Dashboard! To get the access to our services, please log in.
                        </text>
                        <div style={{ textAlign: 'center', justifyContent: 'center' }}>
                        <div style={{ marginTop: '20px' }}>
                        <input  style={{fontSize: '3em'}} type='text'name='name' placeholder='Email' className='input0' value={firstName} onChange={e => handleFisrtName(e.target.value)}></input>
                        </div>
                        <div>
                            <input style={{fontSize: '3em', marginTop: '10px'}}  type='password' name='password' placeholder='mot de passe' className='input3'  value={password} onChange={e => handlePassword(e.target.value)}></input>
                        </div>
                        <div>
                            <button style={{fontSize: '3em', marginTop: '10px'}} type="button" className='button' onClick={loginAccount}> Log in </button>
                        </div>
                        <text style={{fontSize: '2em', marginTop: '10px'}}>
                            Not registered?
                        <a style={{fontSize: '1em', marginTop: '10px'}} href='/pageRegister'> Sign in </a>
                        </text>
                    </div>
         </div>
    );
}

export default PageLogin;
