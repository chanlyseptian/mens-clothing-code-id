import React from "react";
import { useNavigate, Link } from "react-router-dom";
import intToRupiah from "../helpers/rupiah";
import { MdEventNote } from "react-icons/md";

const OrderTable = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  return (
    <div>
      <table className="w-full text-sm lg:text-base" cellSpacing="0">
        <thead>
          <tr className="h-12 uppercase">
            <th className="text-right text-cyan-900 ">No</th>

            <th className="md:visible invisible text-right text-cyan-900  ">
              Order Date
            </th>
            <th className="lg:text-right text-left text-cyan-900">
              Total Quantity
            </th>
            <th className="md:visible invisible text-right text-cyan-900 ">
              Price
            </th>
            <th className="text-right text-cyan-900 ">Total price</th>
            <th className="text-right text-cyan-900 ">Status</th>
            <th className="text-right text-cyan-900">Details</th>
          </tr>
        </thead>
        <tbody>
          {data
            ? data.map((order, index) => {
                return (
                  <tr
                    className="border bg-gray-50 hover:bg-white relative"
                    key={index}
                    // onClick={() => navigate("/user/orderDetail/" + order.id)}
                  >
                    <td className="pb-4 md:table-cell p-2 text-right">
                      <Link to="#">
                        <p className="md:table-cell text-cyan-900">
                          {index + 1}.
                        </p>
                      </Link>
                    </td>
                    <td className="md:visible invisible text-right md:table-cell pb-3 ">
                      <span className="text-sm lg:text-base text-cyan-900 fot-medium">
                        {String(order.createdAt)
                          .split("T")[0]
                          .split("-")
                          .reverse()
                          .join("-")}
                      </span>
                    </td>
                    <td className="p-2 text-right md:table-cell pb-3">
                      <span className="text-sm lg:text-base font-medium text-cyan-900 ">
                        {order.totalQty}
                      </span>
                    </td>

                    <td className="md:visible invisible text-right md:table-cell pb-3">
                      <span className="text-sm lg:text-base font-medium text-cyan-900">
                        {`Rp${intToRupiah(+order.subtotal)}`}
                      </span>
                    </td>
                    <td className="text-right md:table-cell pb-3">
                      <span className="text-sm lg:text-base font-medium text-cyan-900">
                        {`Rp${intToRupiah(+order.totalDue)}`}
                      </span>
                    </td>
                    {order.status !== null ? (
                      <td className="text-right md:table-cell pb-3 p-2">
                        {/* <span className="text-sm lg:text-base  text-cyan-900 font-semibold uppercase">
                          {order.status === "ready to collect"
                            ? "Completed"
                            : order.status}
                        </span> */}

                        {order.status === "ready to collect" ? (
                          <span className="text-sm lg:text-base  text-green-500 font-semibold uppercase">
                            completed
                          </span>
                        ) : order.status === "unpaid" ? (
                          <span className="text-sm lg:text-base  text-cyan-700 font-semibold uppercase">
                            unpaid
                          </span>
                        ) : (
                          <span className="text-sm lg:text-base  text-red-700 font-semibold uppercase">
                            cancelled
                          </span>
                        )}
                      </td>
                    ) : (
                      <td className="text-right md:table-cell pb-3 p-2">
                        <span className="text-sm lg:text-base  ">UNPAID</span>
                      </td>
                    )}
                    <td
                      className="text-right md:table-cell pb-3 absolute right-5 top-3 cursor-pointer"
                      onClick={() => navigate("/user/orderDetail/" + order.id)}
                    >
                      <span className="text-sm lg:text-2xl font-medium text-cyan-900 ">
                        <MdEventNote className="" />
                      </span>
                    </td>
                  </tr>
                );
              })
            : console.log(data)}
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
