import React, { useState, useEffect } from "react";
import OrderTable from "../../components/OrderTable";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../actions/shoppingActions";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const OrdersPage = () => {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  
  
  useEffect(() => {
    if (action === "GET_ORDERS_BY_USER_ID" && status === "data") {
      setOrders(data);
    }
  }, [status]);
  
  useEffect(() => {
    dispatch(getOrdersByUserId(page, 5));
  }, [page]);

  function changeDataPage (page) {
    if(page < 1 ) {
      return
    }
    if(data.length < 5 && page > 1) {
      return
    }
    setPage(page);
  }

  return (
    <div className="py-3 p-24 3xl:px-48 3xl:ml-6 h-[820px]">
      <div className="container mx-auto h-[499px]">
        <h1 className="font-semibold text-center text-3xl text-darkColor mt-10">
          Your Orders
        </h1>
        <hr className="mt-5" />

        <div className="flex flex-wrap  w-full justify-end space-x-6 py-4">
          <button
            className="text-base rounded-md border-bottom text-midColor border-0 px-3 bg-gray-200 font-semibold"
            onClick={() => {
              navigate(`/user/orders`);
            }}
          >
            All
          </button>
          <button
            className="text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            onClick={() => {
              navigate(`/user/orders/unpaid`);
            }}
          >
            Unpaid
          </button>

          <button
            className="text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            onClick={() => {
              navigate(`/user/orders/ready`);
            }}
          >
            Completed
          </button>

          <button
            className="text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            onClick={() => {
              navigate(`/user/orders/cancelled`);
            }}
          >
            Cancelled
          </button>
          <div className="text-4xl flex items-center ">
            {(page < 2 ) ?
              <button onClick={() => changeDataPage(page - 1)}>
                <MdKeyboardArrowLeft className="text-gray-400" />
              </button>
              :
              <MdKeyboardArrowLeft className="text-darkColor cursor-pointer" onClick={() => changeDataPage(page - 1)} />
            }
            <p className="text-sm">{page}</p>
            {(data.length >= 5) ?
              <button onClick={() => changeDataPage(page + 1)}>
                <MdKeyboardArrowRight className="text-darkColor cursor-pointer" />
              </button>
              :
              <MdKeyboardArrowRight className="text-gray-400 cursor-pointer" onClick={() => changeDataPage(page + 1)} />
            }
            </div>
          </div>

          <hr className="mt-1" />

          <div className="p-5 border border-1 bg-gray-100 mt-5">
            {orders ? <OrderTable data={orders} /> : <></>}
          </div>
        </div>
      </div>
      );
}

      export default OrdersPage;
