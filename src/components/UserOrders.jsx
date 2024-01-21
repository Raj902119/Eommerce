import React, { useEffect } from 'react'

import { SelectedUserOrders } from '../app/UserSlice'
import { selectLoggedInUser } from '../app/authSlice'

import { fetchLoggedInUserOrdersAsync } from '../app/UserSlice'
import { useDispatch, useSelector } from 'react-redux'



const UserOrders = () => {
  const user = useSelector(selectLoggedInUser);
  const orders = useSelector(SelectedUserOrders);
  const dispatch=useDispatch();
  useEffect(()=>{
    if(user){
    dispatch(fetchLoggedInUserOrdersAsync(user.id))
    }
  },[]);

  return (
    
    <div>
      {orders.map((order)=>
        <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <h1 className="text-4xl text-center my-5 font-bold tracking-tight text-gray-900">
              Order # {order.id}
            </h1>
            <h3 className="text-xl my-5 font-bold text-center tracking-tight text-red-700">
              Order Status: {order.Status}
            </h3>
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {order.items.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.images[0]}
                        alt={product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                    <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              {product.title}
                            </h3>
                            <h3 className="ml-4">Price</h3>
                          </div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                          <p className="mt-1 text-sm text-gray-500">
                            {product.brand}
                          </p>
                          <p className="ml-4">${product.price}</p>
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
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>${order.TotalSum}</p>
              </div>
              <div className="flex justify-between text-base font-medium text-gray-900">
                <p>Total Items added to cart</p>
                <p>Qty : {order.TotalQua}</p>
              </div>
              <p className="mt-0.5 text-base text-gray-500">
                Shipping Address:
              </p>
              <li
                className="flex justify-between gap-x-6 px-2 py-2 my-1 border-solid border-2 border-gray-200"
              >
                <div className="flex gap-x-4">
                <div className="min-w-0 flex-auto">
                    <p className="text-sm font-semibold leading-6 text-gray-900">
                        {order.SelectAdd.fullName}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.SelectAdd.Address}
                    </p>
                    <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {order.SelectAdd.PostalCode}
                    </p>
                </div>
                </div>
                    <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                        Phone: {order.SelectAdd.PhoneNo}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                        {order.SelectAdd.City}
                        </p>
                      </div>
                    </li>
            </div>  
          </div>
        </div>
      )}
    </div>
    
  )
}

export default UserOrders
