import React from "react";
import { useSelector } from "react-redux";
import { SelectUserProfile } from "../app/UserSlice";
import { UpdateUserProfile } from "../utils/UserAPI";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useState } from "react";


const UserProfile = () => {
  //will do payment and profile in backend
  const [selectedIndex, setselectedIndex] = useState(-1);
  const [Addform, setAddform] = useState(false);
  const userInfo = useSelector(SelectUserProfile);
  const dispatch = useDispatch();

  const handleRemove = (e, index) => {
    const newUser = { ...userInfo, address: [...userInfo.address] };
    newUser.address.splice(index, 1);
    dispatch(UpdateUserProfile(newUser));
  };
  const handleEdit = (addressUpdate, index) => {
    const newUser = { ...userInfo, address: [...userInfo.address] };
    newUser.address.splice(index, 1, addressUpdate);
    dispatch(UpdateUserProfile(newUser));
    setselectedIndex(-1);
  };
  const handleEditForm = (index) => {
    setselectedIndex(index);
    const addd = userInfo.address[index];
    setValue("fullName", addd.fullName);
    setValue("Email", addd.Email);
    setValue("PhoneNo", addd.PhoneNo);
    setValue("Address", addd.Address);
    setValue("City", addd.City);
    setValue("State", addd.State);
    setValue("PostalCode", addd.PostalCode);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleAdd = () => {
    setAddform(true);
    setselectedIndex(-1);
  };

  const handleAddInfo = (data) => {
    const newUser = { ...userInfo, address: [...userInfo.address, data] };
    dispatch(UpdateUserProfile(newUser));
    setAddform(false);
  };

  return (
    <div>
      <div className="mx-auto mt-12 bg-white max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
          <h1 className="text-4xl my-5 font-bold tracking-tight text-gray-900">
            Name: {userInfo.name ? userInfo.name : "Guest User"}
          </h1>
          <h3 className="text-xl my-5 font-bold tracking-tight text-gray-900">
            Email address : {userInfo ? userInfo.email : "xyz@gmail.com"}
          </h3>
          {userInfo.role === "admin" && (
            <h3 className="text-xl my-5 font-bold tracking-tight text-gray-900">
              Role : {userInfo && userInfo.role}
            </h3>
          )}
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <p className="mt-0.5 text-base text-gray-500">Shipping Address:</p>
            <button
              onClick={(e) => {
                handleAdd(e);
              }}
              type="button"
              className="rounded-md bg-green-600 px-3 py-2 mx-4 mt-5 mb-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
            >
              Add New Address
            </button>
            <div>
              {Addform ? (
                <form
                  className="bg-white px-5 py-8 mt-2 mb-2"
                  onSubmit={handleSubmit((data) => {
                    handleAddInfo(data);
                    reset();
                  })}
                >
                  <div className="space-y-12">
                    <div className="border-b border-gray-900/10 pb-12 text-left">
                      <h1 className="text-3xl leading-7 text-center font-bold text-gray-900">
                        Enter Address
                      </h1>
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
                              {...register("fullName", {
                                required: "Name is Required",
                              })}
                              id="first-name"
                              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                              {...register("Email", {
                                required: "Email is Required",
                              })}
                              type="email"
                              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                              {...register("PhoneNo", {
                                required: "PhoneNo a Country",
                              })}
                              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                              {...register("Address", {
                                required: "Address is Required",
                              })}
                              id="street-address"
                              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                              {...register("City", {
                                required: "City is Required",
                              })}
                              id="city"
                              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                              {...register("State", {
                                required: "State is Required",
                              })}
                              id="region"
                              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                              {...register("PostalCode", {
                                required: "PostalCode is Required",
                              })}
                              id="postal-code"
                              className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button
                        onClick={(e) => setAddform(false)}
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      >
                        Add Address
                      </button>
                    </div>
                  </div>
                </form>
              ) : null}
            </div>
            {userInfo.address.map((add, index) => (
              <div key={index}>
                {selectedIndex === index ? (
                  <form
                    className="bg-white px-5 py-8 mt-2 mb-2"
                    onSubmit={handleSubmit((data) => {
                      handleEdit(data, index);
                      reset();
                    })}
                  >
                    <div className="space-y-12">
                      <div className="border-b border-gray-900/10 pb-12 text-left">
                        <h1 className="text-3xl leading-7 text-center font-bold text-gray-900">
                          Enter Address
                        </h1>
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
                                {...register("fullName", {
                                  required: "Name is Required",
                                })}
                                id="first-name"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                {...register("Email", {
                                  required: "Email is Required",
                                })}
                                type="email"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                {...register("PhoneNo", {
                                  required: "PhoneNo a Country",
                                })}
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
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
                                {...register("Address", {
                                  required: "Address is Required",
                                })}
                                id="street-address"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                {...register("City", {
                                  required: "City is Required",
                                })}
                                id="city"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                {...register("State", {
                                  required: "State is Required",
                                })}
                                id="region"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                {...register("PostalCode", {
                                  required: "PostalCode is Required",
                                })}
                                id="postal-code"
                                className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button
                          onClick={(e) => setselectedIndex(-1)}
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                          Save Updated Address
                        </button>
                      </div>
                    </div>
                  </form>
                ) : null}
                <li className="flex justify-between gap-x-6 px-2 py-2 my-1 border-solid border-2 border-gray-200">
                  <div className="flex gap-x-4">
                    <div className="min-w-0 flex-auto">
                      <p className="text-sm font-semibold leading-6 text-gray-900">
                        {add.fullName}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {add.Address}
                      </p>
                      <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                        {add.PostalCode}
                      </p>
                    </div>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      Phone: {add.PhoneNo}
                    </p>
                    <p className="text-sm leading-6 text-gray-500">
                      {add.City}
                    </p>
                  </div>
                  <div className="hidden sm:flex sm:flex-col sm:items-end">
                    <button
                      onClick={(e) => {
                        handleEditForm(index);
                      }}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        handleRemove(e, index);
                      }}
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                    >
                      Remove
                    </button>
                  </div>
                </li>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
