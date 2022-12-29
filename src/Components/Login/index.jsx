import React, { useState } from 'react'
import axios from "axios";
// import { ApiCall } from './api';

 const  ApiCall= ({method, url, payload, params, setData, setError, callback})=> {
    axios({
      method: method,
      url: url,
      data: payload,
      params: params,
    })
      .then((res) => {
        setData(res);
          callback && callback(res.data);
          setError('')
      })
      .catch((error) => {
        setData('');
        // callback && callback(res.data);
        setError(error);
      });
}

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [responseData, setResponseData] = useState('')
    const [error, setError] = useState("");

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handleLogin = () => {
        ApiCall({
          method: "POST",
          url: "https://reqres.in/api/login",
          payload: {
            email: "eve.holt@reqres.in",
            password: "cityslicka",
          },
          params: undefined,
          setData: setResponseData,
          callback: (res) => {
            console.log(res);
            if (res?.data) {
              localStorage.setItem("auth_token", res?.data?.token);
            }
          },
          setError: setError,
        });
    }


  return (
    <>
      <div>
        <input

          onChange={(e) => handleEmail(e)}
          value={email}
          type="text"
          placeholder="Email"
        />
      </div>
      <div>
        <input
          onChange={(e) => handlePassword(e)}
          value={password}
          type="password"
          placeholder="Password"
        />
      </div>
      <button onClick={() => handleLogin()}>Login</button>
    </>
  );
}
