import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

import { useSelector, useDispatch } from "react-redux";
import {
  getOrder,
  updatePayment,
  cancelOrder,
} from "../../actions/shoppingActions";

import Modal from "react-modal";
import Swal from "sweetalert2";
import StripeContainer from "../../components/StripeContainer";

import base_url from "../../helpers/base_url";
import intToRupiah from "../../helpers/rupiah";

const OrderDetailsPage = () => {
  const dispatch = useDispatch();
  const id = Number(useParams().id);

  const { action, status, data } = useSelector(
    (state) => state.shoppingReducer
  );

  useEffect(() => {
    dispatch(getOrder(id));
  }, []);

  const [openModal, setOpenModal] = useState(false);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "rgba(55, 49, 52, 0.5)",
      zIndex: 1000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    // subtitle.style.color = "#f00";
  }

  function closeModal() {
    setOpenModal(false);
    dispatch(updatePayment(id)).then(() => {
      dispatch(getOrder(id));
    });
  }

  const cancelOrderHandler = () => {
    Swal.fire({
      title: "Are you sure you want to cancel this order?",
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
      confirmButtonColor: "#008080",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        dispatch(cancelOrder(id)).then(() => {
          dispatch(getOrder(+id));
        });
      }
    });
  };

  const navigate = useNavigate();

  return (
    <div className="container mx-auto">
      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <StripeContainer totalDue={data.totalDue} />
        <div align="center" className="py-5">
          <button
            className="bg-gray-500  text-white p-3 rounded font-semibold"
            onClick={() => {
              closeModal();
            }}
          >
            Close
          </button>
        </div>
      </Modal>
      {action === "GET_ORDER" && status === "data" && data !== "Loading" ? (
        <div className="w-full ">
          <div
            className="px-16 lg:px-24 3xl:px-[100px] mt-4  relative z-10 flex cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <h1 className="text-lg hover:text-cyan-600 font-semibold text-cyan-900 flex items-center">
              <MdOutlineArrowBackIos className="mr-1" /> Back
            </h1>
          </div>
          <h1 className="font-semibold text-center text-3xl text-cyan-900 mt-5">
            Order Summary
          </h1>
          <hr className="mt-5 mx-24" />

          <hr className="mx-24" />
          <div className="container mx-auto px-24">
            {/* <h1 className="font-semibold text-lg text-center">Detail</h1> */}
            <div className="py-5">
              <table>
                <tbody>
                  <tr>
                    <td className="hidden pb-4 md:table-cell">
                      <h1 className="font-semibold text-md text-cyan-900">
                        Transaction
                      </h1>
                    </td>
                    <td>
                      <Link to="#">
                        {data.paymentTrasaction !== null ? (
                          <p className="mb-4 md:ml-4 text-cyan-900">
                            : {data.paymentTrasaction.toUpperCase()}
                          </p>
                        ) : (
                          <p className="mb-4 md:ml-4 text-cyan-900">: -</p>
                        )}
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="hidden pb-4 md:table-cell">
                      <h1 className="font-semibold text-md text-cyan-900">
                        Order Date
                      </h1>
                    </td>
                    <td>
                      <Link to="#">
                        <p className="mb-4 md:ml-4 text-cyan-900">
                          : {String(data.createdAt).slice(0, 10)}
                        </p>
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="hidden pb-4 md:table-cell">
                      <h1 className="font-semibold text-md text-cyan-900">
                        Status
                      </h1>
                    </td>
                    <td>
                      <Link to="#">
                        {data.status === "unpaid" ? (
                          <p className="mb-4 md:ml-4 text-cyan-900 font-bold">
                            <span className="text-cyan-900 font-normal">
                              :{" "}
                            </span>
                            {data.status.toUpperCase()}
                          </p>
                        ) : data.status === "ready to collect" ? (
                          <p className="mb-4 md:ml-4 text-green-700 font-bold">
                            <span className="text-cyan-900 font-normal">
                              :{" "}
                            </span>{" "}
                            COMPLETED
                          </p>
                        ) : (
                          <p className="mb-4 md:ml-4 text-red-700 font-bold">
                            <span className="text-cyan-900 font-normal">
                              :{" "}
                            </span>{" "}
                            {data.status.toUpperCase()}
                          </p>
                        )}
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="px-24 ">
            <table
              className="border w-full text-sm lg:text-base"
              cellspacing="0"
            >
              <thead className="bg-gray-200 ">
                <tr className="h-12 uppercase">
                  <th className=" text-center text-cyan-900">Image</th>
                  <th className="text-center text-cyan-900">Product</th>
                  <th className="text-center">
                    <span className="lg:hidden text-cyan-900" title="Quantity">
                      Qty
                    </span>
                    <span className="hidden lg:inline text-cyan-900">
                      Quantity
                    </span>
                  </th>
                  <th className="text-center text-cyan-900">Unit price</th>
                  <th className="text-center text-cyan-900">Total price</th>
                </tr>
              </thead>
              <tbody className="text-center py-10">
                {data.Products.map((product, index) => {
                  return (
                    <tr className="text-center ">
                      <td className="text-center flex justify-center">
                        <Link to="#">
                          <img
                            src={
                              base_url +
                              "/images/" +
                              product.ProductImages[0].filename
                            }
                            className="w-20 h-25 "
                            alt="Thumbnail"
                          />
                        </Link>
                      </td>
                      <td className="text-center text-cyan-900">
                        <Link to="#">
                          <p className="mb-2 md:ml-4">{product.name}</p>
                        </Link>
                      </td>
                      <td className="text-center text-cyan-900">
                        <span className="text-sm lg:text-base font-medium">
                          {product.LineItem.qty}
                        </span>
                      </td>
                      <td className="text-center text-cyan-900">
                        <span className="text-sm lg:text-base font-medium">
                          {product.price}
                        </span>
                      </td>
                      <td className="text-center text-cyan-900">
                        <span className="text-sm lg:text-base font-bold text-cyan-900">
                          {product.price * product.LineItem.qty}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="flex px-2  mr-12 mt-5 mb-10  justify-center">
              <div className="bg-white w-96 justify-center rounded-lg h-[300px]">
                <h1 className="font-semibold text-base text-center mt-2 text-cyan-900">
                  Subtotal
                </h1>
                <hr className="mt-2" />
                <div className="py-5">
                  <table align="center">
                    <tbody>
                      <tr className="">
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="text-cyan-900 text-md">Price</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <p className="mb-4 md:ml-4 text-cyan-900 font-semibold ">
                              <span className="text-cyan-900 font-normal">
                                :{" "}
                              </span>{" "}
                              {intToRupiah(data.subtotal)}
                            </p>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="text-cyan-900 text-md">Discount</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <p className="mb-4 md:ml-4 text-cyan-900 font-semibold">
                              {data.discount !== 0
                                ? `-${intToRupiah(data.discount)}`
                                : `: ${intToRupiah(data.discount)}`}
                            </p>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="text-cyan-900 text-md">Tax</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <p className="mb-4 md:ml-4 font-semibold text-cyan-900">
                              <span className="text-cyan-900 font normal">
                                :{" "}
                              </span>{" "}
                              {intToRupiah(data.tax)}
                            </p>
                          </Link>
                        </td>
                      </tr>
                      <tr>
                        <td className="hidden pb-4 md:table-cell">
                          <h1 className="text-cyan-900 text-md">Total</h1>
                        </td>
                        <td>
                          <Link to="#">
                            <p className="mb-4 md:ml-4 font-bold text-cyan-900 text-lg">
                              <span className="text-cyan-900 font-normal">
                                :{" "}
                              </span>{" "}
                              {intToRupiah(data.totalDue)}
                              <hr className="font-bold " />
                            </p>
                          </Link>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div align="center">
                    {data.status === "unpaid" ? (
                      <div className="w-full">
                        <button
                          className="text-white bg-amber-600 hover:bg-amber-700 font-bold p-3 mt-5 w-1/2"
                          onClick={() => cancelOrderHandler()}
                        >
                          CANCEL ORDER
                        </button>
                        <button
                          className="text-white bg-green-500 hover:bg-green-600 font-bold p-3 mt-5  w-1/2"
                          onClick={() => setOpenModal(true)}
                        >
                          PAY NOW
                        </button>
                      </div>
                    ) : data.status === "cancelled" ? (
                      <div className="text-gray-50 bg-red-400 font-bold p-3 mt-5">
                        CANCELLED
                      </div>
                    ) : (
                      <div className="text-gray-50 bg-green-400 font-bold p-3 mt-5">
                        ORDER HAS BEEN PAID
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default OrderDetailsPage;
