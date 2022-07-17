import React, { useState, useEffect } from "react";
import OrderTable from "../../components/OrderTable";

import { useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../actions/shoppingActions";

function OrdersPage() {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getOrdersByUserId());
  }, []);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (action === "GET_ORDERS_BY_USER_ID" && status === "data") {
      setOrders(data);
    }
  }, [status]);

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
