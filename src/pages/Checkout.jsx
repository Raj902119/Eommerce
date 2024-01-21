import { Link } from 'react-router-dom';

import { TotalItems } from '../app/cartSlice';
import { useSelector } from 'react-redux';
import { updateCartAsync,deleteCartItemAsync } from '../app/cartSlice';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {UpdateUserAsync, selectLoggedInUser} from '../app/authSlice'
import { useState } from 'react';
import { addOrderAsync } from '../app/orderSlice';
import { OrderStatus } from '../app/orderSlice';
import { TotalOrders } from '../app/orderSlice';
import Modal from '../common/Modal';

function Checkout() {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const items = useSelector(TotalItems);
  const dispatch = useDispatch();
  const UserDate = useSelector(selectLoggedInUser);
  const addresses = UserDate.address;
  const TotalSum = items.reduce((result,e)=>{
    return result += e.price*e.quantity;
  },0);

  const TotalQua = items.reduce((result,e)=>{
    return result+=e.quantity;
  },0)
  
  const handleRemove = ((e,ID)=>{
    dispatch(deleteCartItemAsync(ID));
  })

  const handleChange = ((e,product) => {
    dispatch(updateCartAsync({...product,quantity: +e.target.value}))
  })

  const [SelectAdd,SetSelectAdd] = useState(null);
  const [paymentMethod, setpaymentMethod] = useState(null);

  const handleAddChange = (e) =>{
    SetSelectAdd(UserDate.address[e.target.value]);
  }

  const handlepayment = (e) =>{
    setpaymentMethod(e.target.value);
  }

  const handleOrder = () => {
    if(paymentMethod && SelectAdd){
    dispatch(addOrderAsync({UserDate,paymentMethod,SelectAdd,TotalSum,TotalQua,items,Status:'pending'}));
    }else {
      alert('Plz, Enter Address and Payment paymentMethod.');
    }
  }

  const OrderStat = useSelector(OrderStatus);
  const [openModal, setOpenModal] = useState(null);

  return (
    <>
    {!items.length && <Navigate to='/' replace={true}/>}
    {OrderStat && <Navigate to={`/order-sucess/${OrderStat.id}`} replace={true}/>}
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <form className="bg-white px-5 py-12 mt-12" onSubmit={handleSubmit((userInfo) => {
            dispatch(UpdateUserAsync({...UserDate,address:[...UserDate.address,userInfo]}));
            reset();
          })}>
            <div className="space-y-12">
              <div className="border-b border-gray-900/10 pb-12 text-left">
                <h1 className="text-3xl leading-7 text-center font-bold text-gray-900">
                  Personal Information
                </h1>
                <p className="mt-1 text-sm leading-6 text-gray-600 text-center">
                  Use a permanent address where you can receive mail.
                </p>

                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Full name:
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('fullName', { required : 'Name is Required' })}
                        id="first-name"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>


                  <div className="sm:col-span-4">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Email address:
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        {...register('Email', { required : 'Email is Required' })}
                        type="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Phone No:
                    </label>
                    <div className="mt-2">
                      <input
                        id="PhoneNo"
                        {...register('PhoneNo', { required : 'PhoneNo a Country' })}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                       />
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="street-address"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Street address
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('Address', { required : 'Address is Required' })}
                        id="street-address"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2 sm:col-start-1">
                    <label
                      htmlFor="city"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      City
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('City', { required : 'City is Required' })}
                        id="city"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="region"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      State / Province
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('State', { required : 'State is Required' })}
                        id="region"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="postal-code"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      ZIP / Postal code
                    </label>
                    <div className="mt-2">
                      <input
                        type="text"
                        {...register('PostalCode', { required : 'PostalCode is Required' })}
                        id="postal-code"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-x-6">
              <button
                type="button"
                onClick={()=>handleSubmit(reset())}
                className="text-sm font-semibold leading-6 text-gray-900"
              >
                Reset
              </button>
              <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Add Address
              </button>
            </div>

              <div className="border-b border-gray-900/10 pb-12">
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                Addresses
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Choose from Existing addresses
                </p>
                <ul role="list">
                  {addresses.map((address,index) => (
                    <li
                      key={index}
                      className="flex justify-between gap-x-6 px-5 py-5 border-solid border-2 border-gray-200"
                    >
                      <div className="flex gap-x-4">
                        <input
                          onChange={handleAddChange}
                          value={index}
                          name='add'
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <div className="min-w-0 flex-auto">
                          <p className="text-sm font-semibold leading-6 text-gray-900">
                            {address.fullName}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.Address}
                          </p>
                          <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                            {address.PostalCode}
                          </p>
                        </div>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm leading-6 text-gray-900">
                          Phone: {address.PhoneNo}
                        </p>
                        <p className="text-sm leading-6 text-gray-500">
                          {address.City}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-10 space-y-10">
                  <fieldset>
                    <legend className="text-sm font-semibold leading-6 text-gray-900">
                      Payment Methods
                    </legend>
                    <p className="mt-1 text-sm leading-6 text-gray-600">
                      Choose One
                    </p>
                    <div className="mt-6 space-y-6">
                      <div className="flex items-center gap-x-3">
                        <input
                          id="cash"
                          name="payments"
                          onChange={handlepayment}
                          value="Cash"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="cash"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Cash
                        </label>
                      </div>
                      <div className="flex items-center gap-x-3">
                        <input
                          id="card"
                          name="payments"
                          onChange={handlepayment}
                          value="Card Payment"
                          type="radio"
                          className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                        />
                        <label
                          htmlFor="card"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Card Payment
                        </label>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>
            </div>

          
          </form>
        </div>
        <div className="lg:col-span-2">
          <div className="mx-auto mt-12 bg-white max-w-7xl px-0 sm:px-0 lg:px-0">
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <h1 className="text-3xl my-5 font-bold tracking-tight text-gray-900">
                Cart
              </h1>
              <div className="flow-root">
                <ul role="list" className="-my-6 divide-y divide-gray-200">
                  {items.map((product) => (
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
                            <select onChange={(e)=>{handleChange(e,product)}} value={product.quantity}>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                            </select>
                          </div>

                          <div className="flex">
                          {openModal && <Modal title={`Remove ${product.title}`}
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
                <div
                  onClick={handleOrder}
                  className="flex cursor-pointer items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Pay and Order
                </div>
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
      </div>
    </div>
    </>
  );
}

export default Checkout;