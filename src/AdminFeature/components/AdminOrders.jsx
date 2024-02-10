import React, { useState } from 'react'
import { ITEMS_PER_PAGES } from '../../app/constants';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllOrdersAsync,SumofOrders,TotalOrders,updateOrdersAsync } from '../../app/orderSlice';
import { useEffect } from 'react';
import {
  PencilIcon,
  EyeIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from '@heroicons/react/24/outline';
import { discountedPrice } from '../../app/constants';
import Pagination from '../../common/Pagination';

const AdminOrders = () => {

  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const orders = useSelector(TotalOrders);
  console.log(orders);
  const totalOrders = useSelector(SumofOrders);
  const [editableOrderId, setEditableOrderId] = useState(-1);
  const [sort, setSort] = useState({});

  const handleEdit = (order) => {
    setEditableOrderId(order.id);
  };
  const handleShow = () => {
    console.log('handleShow');
  };

  const handleUpdate = (e, order) => {
    const updatedOrder = { ...order, Status: e.target.value };
    dispatch(updateOrdersAsync(updatedOrder));
    setEditableOrderId(-1);
  };

  const handlePage = (page) => {
    setPage(page);
  };

  const handleSort = (sortOption) => {
    const sort = { _sort: sortOption.sort, _order: sortOption.order };
    setSort(sort);
  };

  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-300 text-purple-700';
      case 'dispatched':
        return 'bg-yellow-300 text-yellow-700';
      case 'delivered':
        return 'bg-green-300 text-green-700';
      case 'cancelled':
        return 'bg-red-300 text-red-700';
      default:
        return 'bg-purple-300 text-purple-700';
    }
  };

  useEffect(() => {
    const pagination = { _page: page, _limit: ITEMS_PER_PAGES };
    dispatch(fetchAllOrdersAsync({ sort, pagination }));
  }, [dispatch, page, sort]);


  return (
    <div className="overflow-x-auto">
    <div className="bg-gray-100 flex items-center justify-center font-sans overflow-hidden">
      <div className="w-full">
        <div className="bg-white shadow-md rounded my-6">
          <table className="min-w-max w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th
                  className="py-3 px-6 text-left cursor-pointer"
                  onClick={(e) =>
                    handleSort({
                      sort: 'id',
                      order: sort?._order === 'asc' ? 'desc' : 'asc',
                    })
                  }
                >
                  Order# {' '}
                  {sort._sort === 'id' &&
                    (sort._order === 'asc' ? (
                      <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                    ))}
                </th>
                <th className="py-3 px-6 text-left">Items</th>
                <th
                  className="py-3 px-6 text-left cursor-pointer"
                  onClick={(e) =>
                    handleSort({
                      sort: 'TotalSum',
                      order: sort?._order === 'asc' ? 'desc' : 'asc',
                    })
                  }
                >
                  Total Amount {' '}
                  {sort._sort === 'TotalSum' &&
                    (sort._order === 'asc' ? (
                      <ArrowUpIcon className="w-4 h-4 inline"></ArrowUpIcon>
                    ) : (
                      <ArrowDownIcon className="w-4 h-4 inline"></ArrowDownIcon>
                    ))}
                </th>
                <th className="py-3 px-6 text-center">Shipping Address</th>
                <th className="py-3 px-6 text-center">Status</th>
                <th className="py-3 px-6 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map((order) => (
                <tr key={order.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="py-3 px-6 text-left whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="mr-2"></div>
                      <span className="font-medium">{order.id}</span>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-left">
                    {order.items.map((item,index) => (
                      <div key={index} className="flex items-center">
                        <div className="mr-2">
                          <img
                            className="w-6 h-6 rounded-full"
                            src={item.product.thumbnail}
                          />
                        </div>
                        <span>
                          {item.product.title} - #{item.quantity} - $
                          {discountedPrice(item.product)}
                        </span>
                      </div>
                    ))}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex items-center justify-center">
                      ${order.TotalSum}
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="">
                      <div>
                        <strong>{order.SelectAdd.fullName}</strong>,
                      </div>
                      {/* <div>{order.SelectAdd.Address},</div> */}
                      <div>{order.SelectAdd.City}, </div>
                      <div>{order.SelectAdd.State}, </div>
                      <div>{order.SelectAdd.PostalCode}, </div>
                      <div>{order.SelectAdd.PhoneNo}, </div>
                    </div>
                  </td>
                  <td className="py-3 px-6 text-center">
                    {order.id === editableOrderId ? (
                      <select onChange={(e) => handleUpdate(e, order)}>
                        <option value="pending">Pending</option>
                        <option value="dispatched">Dispatched</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    ) : (
                      <span
                        className={`${chooseColor(
                          order.Status
                        )} py-1 px-3 rounded-full text-xs`}
                      >
                        {order.Status}
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center">
                    <div className="flex item-center justify-center">
                      <div className="w-6 mr-4 transform hover:text-purple-500 hover:scale-120">
                        <EyeIcon
                          className="w-8 h-8"
                          onClick={(e) => handleShow(order)}
                        ></EyeIcon>
                      </div>
                      <div className="w-6 mr-2 transform hover:text-purple-500 hover:scale-120">
                        <PencilIcon
                          className="w-8 h-8"
                          onClick={(e) => handleEdit(order)}
                        ></PencilIcon>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <Pagination
      page={page}
      setPage={setPage}
      handlePage={handlePage}
      totalItems={totalOrders}
    ></Pagination>
  </div>
  )
}

export default AdminOrders
