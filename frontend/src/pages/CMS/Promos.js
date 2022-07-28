import React, { useState, useEffect } from "react";
import PromoTable from "../../components/PromoTable";
import PromoInput from "../../components/PromoInput";

import { useNavigate } from "react-router-dom";

import { IoMdAddCircle } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { getPromos } from "../../actions/promoActions";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

const Promos = () => {
  const { action, status, data } = useSelector((state) => state.promoReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);

  const [showPromoInput, setShowPromoInput] = useState(false);

  useEffect(() => {
    if (
      (action === "CREATE_PROMO" || action === "EDIT_PROMO") &&
      status === "data"
    ) {
      dispatch(getPromos());
    }
  }, [status]);

  useEffect(() => {
    dispatch(getPromos());
  }, []);

  function changeDataPage(page) {
    if (page < 1) {
      return;
    }
    if (data.length < 5 && page > 1) {
      return;
    }
    setPage(page);
  }

  return (
    <div className="py-3 p-24 3xl:px-48 3xl:ml-6 h-[820px] ml-20">
      <div className="grid grid-cols-12">
        <div className="col-span-1"></div>
        <div className="container h-[499px] col-span-11">
          <h1 className="font-semibold text-center text-3xl text-darkColor mt-10">
            Promos
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
              Active
            </button>

            <button
              className="text-base rounded-md  text-midColor hover:text-darkColor hover:font-semibold"
              onClick={() => {
                navigate(`/user/orders/ready`);
              }}
            >
              Expired
            </button>

            <div className="text-4xl flex items-center ">
              {page < 2 ? (
                <MdKeyboardArrowLeft className="text-gray-400" />
              ) : (
                <MdKeyboardArrowLeft
                  className="text-darkColor cursor-pointer"
                  onClick={() => changeDataPage(page - 1)}
                />
              )}
              <p className="text-sm">{page}</p>
              {data.length >= 5 ? (
                <button onClick={() => changeDataPage(page + 1)}>
                  <MdKeyboardArrowRight className="text-darkColor cursor-pointer" />
                </button>
              ) : (
                <MdKeyboardArrowRight className="text-gray-400" />
              )}
            </div>
          </div>

          <hr className="mt-1" />

          <div className="p-5 border border-1 bg-gray-100 mt-5">
            {action === "GET_PROMOS" && status === "data" ? (
              <PromoTable data={data} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div className="fixed right-28 bottom-9">
        <button
          className="text-darkColor hover:text-cyan-600"
          onClick={
            () => setShowPromoInput(!showPromoInput)
            // navigate("/cms/add")
          }
        >
          <div className="flex">
            <IoMdAddCircle size={50} />
            <h1 className="text-base rounded-md font-bold pt-3 pl-1">PROMO</h1>
          </div>
        </button>

        {showPromoInput ? (
          <PromoInput setShowPromoInput={setShowPromoInput} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Promos;
