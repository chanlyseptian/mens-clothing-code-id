import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import intToRupiah from "../helpers/rupiah";
import { MdEventNote } from "react-icons/md";
import PromoEdit from "../components/PromoEdit";

const PromoTable = (props) => {
  const navigate = useNavigate();
  const data = props.data;
  const [showPromoEdit, setShowPromoEdit] = useState(false);

  useEffect(() => {
    console.log(showPromoEdit);
  }, [showPromoEdit]);

  return (
    <div>
      <div className="w-full text-sm lg:text-base" cellSpacing="0">
        {/* <thead> */}
        <div className="h-12 uppercase grid grid-cols-11 font-bold">
          <div className="text-right text-darkColor">No</div>

          <div className="md:visible invisible text-right text-darkColor col-span-2">
            Promo Name
          </div>
          <div className="lg:text-right text-left text-darkColor col-span-2">
            {"Discount (%)"}
          </div>
          <div className="text-right text-darkColor col-span-3">Start Date</div>
          <div className="text-right text-darkColor col-span-3">End Date</div>
        </div>
        {/* </thead> */}
        {/* <tbody> */}
        {data
          ? data.map((promo, index) => {
              return (
                <>
                  {showPromoEdit ? (
                    <PromoEdit
                      id={promo.id}
                      setShowPromoEdit={setShowPromoEdit}
                    />
                  ) : (
                    ""
                  )}
                  <div
                    className="border bg-gray-50 hover:bg-white relative cursor-pointer grid grid-cols-11"
                    key={index}
                    onClick={
                      () => setShowPromoEdit(true)
                      // navigate("/user/orderDetail/" + order.id)
                    }
                  >
                    <div className="pb-4 md:table-cell p-2 text-right ">
                      <Link to="#">
                        <p className="md:table-cell text-midColor">
                          {index + 1}.
                        </p>
                      </Link>
                    </div>
                    <div className="text-right md:table-cell pb-3 p-2 col-span-2">
                      <span className="text-sm lg:text-base text-midColor fot-medium">
                        {promo.promoName}
                      </span>
                    </div>
                    <div className="p-2 text-right md:table-cell pb-3 col-span-2">
                      <span className="text-sm lg:text-base font-medium text-midColor ">
                        {promo.discount}
                      </span>
                    </div>

                    <div className="text-right md:table-cell pb-3 p-2 col-span-3">
                      <span className="text-sm lg:text-base font-medium text-midColor">
                        {promo.startDate}
                      </span>
                    </div>

                    <div className="text-right md:table-cell pb-3 p-2 col-span-3">
                      <span className="text-sm lg:text-base">
                        {promo.endDate}
                      </span>
                    </div>
                  </div>
                </>
              );
            })
          : console.log(data)}
        {/* </tbody> */}
      </div>
    </div>
  );
};

export default PromoTable;
