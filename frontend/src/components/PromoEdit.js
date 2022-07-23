import React, { useState, useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { getPromoById, editPromo } from "../actions/promoActions";

function PromoEdit(props) {
  const { action, status, data, actionPromo, statusPromo, dataPromo } =
    useSelector((state) => state.promoReducer);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const [formPromo, setFormPromo] = useState({
    nama_promo: "",
    potongan_harga: 0,
    tgl_mulai: "",
    tgl_akhir: "",
  });

  const id = +props.id;

  useEffect(() => {
    dispatch(getPromoById(id));
  }, []);

  useEffect(() => {
    if (actionPromo === "GET_PROMO_BY_ID" && statusPromo === "data") {
      setFormPromo({
        nama_promo: dataPromo.nama_promo,
        potongan_harga: dataPromo.potongan_harga,
        tgl_mulai: dataPromo.tgl_mulai.split("T")[0],
        tgl_akhir: dataPromo.tgl_akhir.split("T")[0],
      });
    }
    // console.log(formPromo)
  }, [statusPromo]);

  const submitHandler = () => {
    dispatch(editPromo(id, formPromo));
  };

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
                  type="text"
                  value={formPromo.nama_promo}
                  onChange={(e) => {
                    setFormPromo({ ...formPromo, nama_promo: e.target.value });
                  }}
                ></input>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-11/12">
                <p className="text-white text-center">Start Date</p>
                <input
                  type="date"
                  className="block w-10/12 mx-auto h-10 rounded-md px-3"
                  value={formPromo.tgl_mulai}
                  onChange={(e) => {
                    setFormPromo({ ...formPromo, tgl_mulai: e.target.value });
                  }}
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
                  value={formPromo.potongan_harga}
                  onChange={(e) =>
                    setFormPromo({
                      ...formPromo,
                      potongan_harga: e.target.value,
                    })
                  }
                  step="5"
                ></input>
                <p className="text-white text-center">
                  {formPromo.potongan_harga}%
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-11/12">
                <p className="text-white text-center">End Date</p>
                <input
                  type="date"
                  className="block w-10/12 mx-auto h-10 rounded-md px-3"
                  value={formPromo.tgl_akhir}
                  onChange={(e) => {
                    setFormPromo({ ...formPromo, tgl_akhir: e.target.value });
                  }}
                ></input>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-white px-10 rounded-md py-2 text-darkColor"
            onClick={() => submitHandler()}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
}

export default PromoEdit;
