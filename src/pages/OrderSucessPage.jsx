import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, Navigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import { resetCartAsync } from '../app/cartSlice';
import { resetOrder } from '../app/orderSlice';

const OrderSucessPage = () => {
    const params = useParams();
    const dispatch = useDispatch();
    useEffect(()=>{
        //reset cart
        dispatch(resetCartAsync());
        //reset orderstatus
        dispatch(resetOrder());
    },[dispatch]);
    
  return (
    <div>
    {!params.id && <Navigate to="/" replace={true}/>} 
      <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-green-700 sm:text-5xl">Order Sucessfull</h1>
          <h4 className="mt-4 text-2xl tracking-tight text-gray-500 sm:text-4xl">Your Id is #{params.id}</h4>
          <p className="mt-6 text-base leading-7 text-gray-600">Congratulation, your order is been Sucessfull Placed.</p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              to="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

export default OrderSucessPage
