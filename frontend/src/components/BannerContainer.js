import React from "react";
import { useNavigate } from "react-router-dom";

import { MdDescription } from "react-icons/md";

const ProductCardContainerCMS = (props) => {
  const navigate = useNavigate();
  const data = props.data;

  return (
    <div>
      <table className="table-fixed">
        <thead>
          <tr className="h-20 uppercase text-left">
            <th colSpan="2" className="text-center">
              Banner
            </th>
            <th className="text-left">Upload Date</th>
            <th className="text-center">Status</th>
            <th className="text-right">Details</th>
          </tr>
        </thead>
        <tbody>
          {data.map((banner, index) => {
            return (
              <tr key={index}>
                <td className="pr-5 py-1">{index + 1}.</td>
                <td className="w-3/6 py-1">
                  <img
                    className="w-[400px] h-[200px] hover:shadow-xl hover:scale-125 cursor-pointer object-cover"
                    alt=""
                    src={banner.filename}
                    // src={`${url}/images/${product.ProductImages[0].filename}`}
                  />
                </td>
                <td className="w-2/6 py-1">
                  {String(banner.createdAt).slice(0, 10)}
                </td>
                {banner.active === true ? (
                  <td className="w-1/6 text-center py-1 text-green-700 font-extrabold">
                    ACTIVE
                  </td>
                ) : (
                  <td className="w-1/6 text-center py-1 text-red-700 font-extrabold">
                    INACTIVE
                  </td>
                )}

                <td className="w-2/6 py-1">
                  <button
                    onClick={() => navigate(`/cms/editBanner/${banner.id}`)}
                  >
                    <MdDescription
                      size={30}
                      className="text-darkColor hover:text-cyan-600 cursor-pointer hover:scale-125 ml-5"
                    />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCardContainerCMS;
