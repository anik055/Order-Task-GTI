import React from 'react'
import './index.css'
import Failed from './Failed'

export default function Successful() {
  return (
    <>
      <div className="wrapper-1 ">
        <div className="wrapper-2 success">
          <h1>Payment Successfull !</h1>
          <p>Thanks for your Order. </p>
        </div>
      </div>
      <Failed />
    </>
  );
}
