import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function PageRegister() {

    const [account, setaccount] = useState();
    const [password, setPassword] = useState();
    const [confirmpassword, setConfirmpassword] = useState();

    const navigate = useNavigate();

    function handleAccount(text) {
        setaccount(text);
    }

    const handlePassword = (text) => {
        setPassword(text);
    }

    const handleConfirm = (text) => {
        setConfirmpassword(text);
    }

    const registerAccount = () => {
        axios.post("http://localhost:8080/user/register", {email : account, password : password})
            .then((response) => {
                if (response.data.message === 'registered') {
                    navigate('/')
                }
                if (response.data.message === 'utilisateur déjà existant') {
                    console.log("error")
                }
            })
            .catch(e => {
                console.log(e)
            })
        // const axios = require('axios');
        // const qs = require('qs')

        // const data = qs.stringify({
        // "account": account,
        // "password": confirmpassword
        // });

        // const config = {
        // method: 'post',
        // url: 'http://localhost:8080/services/register',
        // headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded'
        // },
        // data : data
        // };

        // axios(config)
        // .then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //     if (password !== confirmpassword)
        //         console.log('error same password')
        //     navigate('/')
        // })
        // .catch(function (error) {
        // console.log(error);
        // });
    }
    return (
        <div style={{ textAlign: 'center', justifyContent: 'center' }}>
                        <text style={{fontSize: '3em', marginTop: '40px'}}>
                            Bienvenue sur Dashboard! Pour accéder a nos services veuillez créer un compte.
                        </text>
                        <div style={{ textAlign: 'center', justifyContent: 'center' }}>
                        <div style={{ marginTop: '20px' }}>
                            <input  style={{fontSize: '3em', marginTop: '10px'}} type='text'name='name' placeholder='Email' className='input0' value={account} onChange={e => handleAccount(e.target.value)}></input>
                        </div>
                        <div>
                            <input  style={{fontSize: '3em', marginTop: '10px'}} type='password' name='password' placeholder='mot de passe' className='input3'  value={password} onChange={e => handlePassword(e.target.value)}></input>
                        </div>
                        <div>
                            <input  style={{fontSize: '3em', marginTop: '10px'}} type='password' name='password' placeholder='confirmation mot de passe' className='input4'  value={confirmpassword} onChange={e => handleConfirm(e.target.value)}></input>
                        </div>
                        <div>
                            <button style={{fontSize: '3em', marginTop: '10px'}} type="button" className='button' onClick={registerAccount}>S'inscrire</button>
                        </div>
                        </div>
         </div>
    );
}

export default PageRegister;
