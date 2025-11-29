import React from 'react';
import { useNavigate, } from 'react-router';

const PaymentCancelled = () => {
  const navigate = useNavigate()
  return (
    <div className='text-center lg:text-3xl md:text-2xl text-xl lg:mt-8 md:mt-6 mt-4'>
      <h1>Payment Cancelled</h1>
      <button onClick={()=>navigate(-1)} className='btn'>Go Back</button>
    </div>
  );
};

export default PaymentCancelled;