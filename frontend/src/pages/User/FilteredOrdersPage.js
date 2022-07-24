import React, { useEffect,useState } from "react";
import OrderTable from "../../components/OrderTable";
import { useParams, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { getOrdersByUserId } from "../../actions/shoppingActions";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";


const FilteredOrdersPage = () => {
  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page,setPage] = useState(1)

  const { query } = useParams();
  // console.log(query);

  // useEffect(() => {
  //   let pageAttribute = `?page${page}`
  //   dispatch(getOrdersByUserId(pageAttribute));
  // }, [page]);
  useEffect(() => {
    let pageAttribute = `?page=${page}`;
    dispatch(getOrdersByUserId(pageAttribute));
  }, [page]);

  // useEffect(() => {
  //   console.log(action, "||", status, "||", data, "||");
  // }, [status]);
  // const pageHandler = (page)=>{
  //     if(page<1){
  //       return
  //     }
  //     if(data.length < 5 && data > 1){
  //         return
  //     }
  //     setPage(page)
  // }
  function pageHandler(page) {
    if (page < 1) {
      return;
    }
    if (data.length < 5 && page > 1) {
      return;
    }
    setPage(page);
  }

  return (
    <div className="py-3 p-24 3xl:px-48 3xl:ml-6">
      <div className="container mx-auto h-[499px]">
        <h1 className="font-semibold text-center text-3xl text-midColor mt-10">
          Your Orders
        </h1>
        <hr className="mt-5" />
        <div className="flex flex-wrap  w-full justify-end space-x-6 py-4">
          <button
            className="text-base rounded-md border-bottom text-midColor border-0 px-3 font-semibold"
            onClick={() => {
              navigate(`/user/orders`);
            }}
          >
            All
          </button>
          <button
            className={
              query === "unpaid"
                ? "text-base rounded-md border-bottom text-midColor border-0 px-3 bg-gray-200 font-semibold"
                : "text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            }
            onClick={() => {
              navigate(`/user/orders/unpaid`);
            }}
          >
            Unpaid
          </button>

          <button
            className={
              query === "ready"
                ? "text-base rounded-md border-bottom text-midColor border-0 px-3 bg-gray-200 font-semibold"
                : "text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            }
            onClick={() => {
              navigate(`/user/orders/ready`);
            }}
          >
            Completed
          </button>

          <button
            className={
              query === "cancelled"
                ? "text-base rounded-md border-bottom text-midColor border-0 px-3 bg-gray-200 font-semibold"
                : "text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
            }
            onClick={() => {
              navigate(`/user/orders/cancelled`);
            }}
          >
            Cancelled
          </button>
          <div className="text-4xl flex items-center ">
            {page < 2 ? (
              <button onClick={() => pageHandler(page - 1)}>
                <MdKeyboardArrowLeft className="text-gray-400" />
              </button>
            ) : (
              <MdKeyboardArrowLeft
                className="text-darkColor cursor-pointer"
                onClick={() => pageHandler(page - 1)}
              />
            )}
            <p className="text-sm">{page}</p>
            {data.length >= 5 ? (
              <button onClick={() => pageHandler(page + 1)}>
                <MdKeyboardArrowRight className="text-darkColor cursor-pointer" />
              </button>
            ) : (
              <MdKeyboardArrowRight
                className="text-gray-400 cursor-pointer"
                onClick={() => pageHandler(page + 1)}
              />
            )}
          </div>
        </div>
        <div className="p-5 border border-1 bg-gray-100 mt-5">
          {action === "GET_ORDERS_BY_USER_ID" && status === "data" ? (
            <OrderTable
              data={data.filter((order) => order.status.includes(query))}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilteredOrdersPage;
