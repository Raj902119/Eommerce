import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { TotalItems } from '../app/cartSlice';
import { discountedPrice } from '../app/constants';
import { Link } from 'react-router-dom';
import axios from "axios";
import { resetOrder } from '../app/orderSlice';
import { resetCartAsync } from '../app/cartSlice';
import { SelectUserProfile } from '../app/UserSlice';

const OnlinePaymentPage = () => {
    const dispatch = useDispatch();

    const user = useSelector(SelectUserProfile);
    console.log(user);
    const items = useSelector(TotalItems);

    const TotalSum = items.reduce((result,item)=>{
        return discountedPrice(item.product) * item.quantity + result;
      },0);

    const TotalQua = items.reduce((result,e)=>{
        return result+=e.quantity;
      },0)  
    const checkoutHandler = async (TotalSum) => {

        const { data : {Key}} = await axios.get("http://localhost:3000/api/getkey");

        const { data:{order} } = await axios.post("http://localhost:3000/api/createOrder",{
            TotalSum
        });

        const options = {
          key:Key,
          amount: order.amount,
          currency: "INR",
          name: "6 Pack Programmer",
          description: "Tutorial of RazorPay",
          image: "https://avatars.githubusercontent.com/u/25058652?v=4",
          order_id: order.id,
          callback_url: "http://localhost:3000/api/paymentVerification",
          prefill: {
              name: "Raj Patil",
              email: user.address.Email,
              contact: user.address.PhoneNo,
          },
          notes: {
              "address": "Razorpay Corporate Office"
          },
          theme: {
              "color": "#121212"
          }
      };
      const razor = new window.Razorpay(options);
      razor.open();

    }
  return (
    <div className='mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8'>
      <div className="border-t border-gray-200 px-14 py-10 sm:px-6">
        <h1 className="text-4xl mt-5 mb-10 font-bold tracking-tight text-gray-900 text-center" >Order Summary</h1>
            <div className="flex justify-between text-xl my-3 font-medium text-gray-900 border-y-2">
              <p>Subtotal</p>
              <p>${TotalSum}</p>
            </div>
            <div className="flex justify-between text-xl my-3 font-medium text-gray-900 border-y-2">
                <p>Total Items added to cart</p>
                <p>Qty : {TotalQua}</p>
              </div>
            <div className="mt-6 text-center">

            <button
                onClick={()=>checkoutHandler(TotalSum)}
                className="px-auto rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Proceed to Payment
              </button>
            </div>
            
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                <button
                onClick={()=>{dispatch(resetCartAsync());dispatch(resetOrder())}}
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Checkout Page
                  <span aria-hidden="true"> &rarr;</span>
                </button>
                </Link>
              </p>
            </div>
          </div>
    </div>
  )
}

export default OnlinePaymentPage
