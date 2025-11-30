import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

const PaymentSuccess = () => {
  let [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const calledRef = useRef(false)

  const sessionId = searchParams.get("session_id")
  // console.log(sessionId)

  useEffect(() => {
    if(!sessionId || calledRef.current)  return;

    calledRef.current = true;

    axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {sessionId})
    
    setTimeout(()=> {navigate('/dashboard/my-orders')},2000)
  },[sessionId,navigate])

  return (
    <div className='text-center lg:text-3xl md:text-2xl text-xl lg:mt-8 md:mt-6 mt-4'>
      <h1>Payment Successful</h1>
    </div>
  );
};

export default PaymentSuccess;