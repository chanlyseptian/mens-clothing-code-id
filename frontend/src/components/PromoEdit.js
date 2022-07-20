import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

function PromoEdit(props) {
  const [formPromo, setFormPromo] = useState({
    promoName: "",
    discount: 0,
    startDate: "",
    endDate: "",
  });

  const id = +props.id;

  useEffect(() => {
    //   dispatch(getPromoById(id))
    console.log(id);
  }, []);

  return (
    <div className="overflow-y-auto fixed z-10 flex justify-center items-center inset-0 h-modal w-full">
      <div className="bg-darkColor lg:w-3/12 w-11/12 pb-5 rounded-md">
        <div className="grid grid-cols-12 py-3">
          <div className="col-span-11 flex justify-center item-center">
            <p className="text-white text-2xl">Edit Promo</p>
          </div>
          <div className="flex justify-center item-center">
            <button
              className="text-right text-white text-2xl"
              onClick={() => props.setShowPromoEdit(false)}
            >
              <AiOutlineClose />
            </button>
          </div>
        </div>
        <hr className="mx-5 mb-5" />
        <div className="grid grid-cols-2 w-full pb-5">
          <div className="space-y-5">
            <div className="flex justify-center">
              <div className="w-11/12">
                <p className="text-white text-center">Promo Name</p>
                <input
                  className="block w-10/12 mx-auto h-10 rounded-md px-3"
                  type="number"
                ></input>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-11/12">
                <p className="text-white text-center">Start Date</p>
                <input
                  type="date"
                  className="block w-10/12 mx-auto h-10 rounded-md px-3"
                ></input>
              </div>
            </div>
          </div>
          <div className="space-y-5">
            <div className="flex justify-center">
              <div className="w-11/12">
                <p className="text-white text-center">Discount</p>
                <input
                  className="block w-10/12 mx-auto rounded-md"
                  type="range"
                  min="0"
                  max="100"
                  value={formPromo.discount}
                  onChange={(e) =>
                    setFormPromo({ ...formPromo, discount: e.target.value })
                  }
                  step="5"
                ></input>
                <p className="text-white text-center">{formPromo.discount}%</p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-11/12">
                <p className="text-white text-center">End Date</p>
                <input
                  type="date"
                  className="block w-10/12 mx-auto h-10 rounded-md px-3"
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button className="bg-white px-10 rounded-md py-2 text-darkColor">
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromoEdit;
