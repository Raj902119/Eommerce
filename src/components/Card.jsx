import React, { useState, Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { TotalItems } from '../app/cartSlice';
import { updateCartAsync,deleteCartItemAsync } from '../app/cartSlice';
import { Link } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import Modal from '../common/Modal';
import { discountedPrice } from '../app/constants';

export default function Cart() {
  const dispatch = useDispatch();
  // const user=useSelector(selectLoggedInUser);

  // useEffect(()=>{
  //   const userinfo = useSelector(selectLoggedInUser);
  //   dispatch(fetchAllUserItemsAsync(userinfo));
  // },[dispatch,userinfo])
  const items = useSelector(TotalItems);
  const TotalSum = items.reduce((result,item)=>{
    return discountedPrice(item.product) * item.quantity + result;
  },0);

  const TotalQua = items.reduce((result,e)=>{
    return result+=e.quantity;
  },0)
  
  const handleRemove = ((e,ID)=>{
    dispatch(deleteCartItemAsync(ID));
  })

  const handleChange = ((e,product) => {
    dispatch(updateCartAsync({id:product.id,quantity: +e.target.value,}))
  })

  const [openModal, setOpenModal] = useState(null);
  return (
    <>
      {!items.length && <Navigate to='/' replace={true}/>}
      
      <div>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
              Cart
            </h1>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.product.thumbnail}
                        alt={product.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                    <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              {product.product.title}
                            </h3>
                            <h3 className="ml-4">Price</h3>
                          </div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                          <p className="mt-1 text-sm text-gray-500">
                            {product.product.brand}
                          </p>
                          <p className="ml-4">${discountedPrice(product.product)}</p>
                          </div>
                          
                        </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-5 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <select onChange={(e)=>{handleChange(e,product)}} value={product.quantity}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                        </div>

                        <div className="flex">
                        {openModal && <Modal title={`Remove ${product.product.title}`}
                          message="Do you confirm that you want to remove the item?"
                          action="Remove" 
                          cancle="cancle" 
                          dangerAction={(e) => handleRemove(e, product.id)}
                          cancelAction={()=>setOpenModal(null)}
                          showModal={openModal === product.id}  
                          />}
                        <button
                              onClick={e=>{setOpenModal(product.id)}}
                              type="button"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>${TotalSum}</p>
            </div>
            <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Items added to cart</p>
                <p>Qty : {TotalQua}</p>
              </div>
            <p className="mt-0.5 text-sm text-gray-500">
              Shipping and taxes calculated at checkout.
            </p>
            <div className="mt-6">
            <Link
                to="/checkout"
                className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
              >
                Checkout
              </Link>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
              <p>
                or
                <Link to="/">
                <button
                  type="button"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                >
                  Continue Shopping
                  <span aria-hidden="true"> &rarr;</span>
                </button>
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
