import axios from "axios";
import React, { useEffect, useRef } from "react";
import { Link, useSearchParams } from "react-router";
import { IoBagCheckOutline } from "react-icons/io5";

const PaymentSuccess = () => {
  let [searchParams] = useSearchParams();
  const calledRef = useRef(false);

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (!sessionId || calledRef.current) return;

    calledRef.current = true;

    axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
      sessionId,
    });
  }, [sessionId]);

  return (
    <div className="flex justify-center items-center w-11/12 mx-auto">
      <div className="card max-w-2xl bg-base-100 card-xl shadow-sm">
        <div className="card-body text-center">
          <div className="flex justify-center">
            <IoBagCheckOutline size={50} color="lime" />
          </div>
          <h1 className="text-3xl font-bold">Payment Successful</h1>
          <p className="my-4">
            Thank You for your Purchased. Your order is being processed.
          </p>
          <div className="justify-center card-actions">
            <Link to={"/dashboard/my-orders"}>
              <button className="btn bg-lime-300">Go To My Orders</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccess;
