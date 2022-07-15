import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";

import { useDispatch, useSelector } from "react-redux";
import { update, getProductById } from "../../actions/cmsActions";

import base_url from "../../helpers/base_url";

function EditProduct() {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const id = Number(useParams().id);
  const url = base_url;

  const [images, setImages] = useState([]);
  const [imageIsUploaded, setImageIsUploaded] = useState(false);
  const [sizeRows, setSizeRows] = useState([1]);

  const [sizeArr, setSizeArr] = useState([]);

  const [form, setForm] = useState({
    name: "",
    desc: "",
    price: 0,
    weight: 0,
    category: "tops",
    condition: "available",
  });

  const [sizeObj, setSizeObj] = useState([]);

  useEffect(() => {
    if (action === "GET_PRODUCT_BY_ID" && status === "data") {
      setSizeArr(data.ProductStocks);
      setForm({
        name: data.name,
        desc: data.desc,
        price: data.price,
        weight: data.weight,
        category: data.category,
        condition: data.condition,
      });
    }
    // else if (action === "UPDATE" && status === "data") {
    //   dispatch(getUser());
    // }
  }, [data, dispatch]);

  useEffect(() => {
    if (action === "UPDATE" && status === "data") {
      navigate(`/cms/details/${id}`);
    }
  });

  useEffect(() => {
    console.log(sizeArr);
  }, [sizeArr]);

  const addSize = () => {
    setSizeRows([...sizeRows, sizeRows.length + 1]);
    setSizeArr([
      ...sizeArr,
      {
        type: "",
        stock: 0,
      },
    ]);
  };

  const updateTypeChanged = (index, e) => {
    let newArr = [...sizeArr];
    newArr[index] = { ...newArr[index], type: e.target.value };
    setSizeArr(newArr);
  };

  const updateStockChanged = (index, e) => {
    let newArr = [...sizeArr];
    newArr[index] = { ...newArr[index], stock: e.target.value };
    setSizeArr(newArr);
  };

  const editProductHandler = () => {
    let formData = new FormData();
    formData.append("name", form.name);
    formData.append("desc", form.desc);
    formData.append("price", form.price);
    formData.append("weight", form.weight);
    formData.append("category", form.category);
    formData.append("condition", form.condition);

    if (sizeArr.length !== 0) {
      for (const sizeStock of sizeArr) {
        formData.append("sizes", sizeStock.type);
        formData.append("stocks", sizeStock.stock);
      }
    }

    if (images.length !== 0) {
      for (const image of images) {
        formData.append("filename", image);
      }
    }

    // console.log(formData);

    dispatch(update(formData, id));
  };

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  return (
    <div className="px-10 lg:px-32 lg:ml-52 3xl:ml-12 overflow-scroll max-h-screen py-5 no-scrollbar">
      <div className="">
        <div className="flex cursor-pointer" onClick={() => navigate(-1)}>
          <h1 className="text-lg hover:text-cyan-600 font-semibold pt-10 pb-5 text-cyan-900 flex items-center">
            <MdOutlineArrowBackIos className="mr-1" /> Back
          </h1>
        </div>
        <div className="py-4 text-xl font-bold text-cyan-900 text-left 3xl:mt-3 3xl:mb-8">
          <h1 className="pl-5">Edit Product</h1>
          <hr className="border-cyan-800 mx-5 mt-2" />
        </div>

        <div className="grid grid-cols-3 ">
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Name
            </label>
          </div>

          <div className="px-5 py-2 col-span-2">
            <input
              type="text"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              value={form.name || ""}
            ></input>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Description
            </label>
          </div>

          <div className="px-5 py-2 col-span-2">
            <textarea
              rows="4"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              onChange={(e) => setForm({ ...form, desc: e.target.value })}
              value={form.desc || ""}
            ></textarea>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Category
            </label>
            <select
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
              name="category"
              id="category"
              onChange={(e) => setForm({ ...form, category: e.target.value })}
              value={form.category || ""}
            >
              <option value="tops">Tops</option>
              <option value="bottoms">Bottoms</option>
              <option value="accessories">Accessories</option>
              <option value="grooming">Grooming</option>
            </select>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Condition
            </label>
            <select
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-4/5"
              name="condition"
              id="condition"
              onChange={(e) => setForm({ ...form, condition: e.target.value })}
              value={form.condition || ""}
            >
              <option value="available">Available</option>
              <option value="soldout">Sold-Out</option>
            </select>
          </div>

          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Weight
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              onChange={(e) => setForm({ ...form, weight: e.target.value })}
              value={form.weight || ""}
            ></input>
          </div>
          <div className="px-5 py-2">
            <label className="block text-cyan-900 text-lg font-bold pb-2">
              Price
            </label>
            <input
              type="number"
              className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              value={form.price || ""}
            ></input>
          </div>
        </div>
        <hr className="border-cyan-800 mx-5 mt-2" />
        <div className="px-5 py-5">
          <h1 className="text-cyan-900 text-lg font-bold">
            Upload Images (Choose up to 4)
          </h1>
          <div className=" flex space-x-8">
            {data.ProductImages !== undefined && imageIsUploaded === false
              ? data.ProductImages.map((img, index) => {
                  return (
                    <div
                      className="flex-shrink-0 flex-col my-5 w-36 h-36   shadow-lg rounded-md cursor-pointer"
                      key={index}
                    >
                      <label
                        className="cursor-pointer custom-file-upload"
                        htmlFor="file-upload"
                      >
                        <div className="text-7xl">
                          <img
                            className="object-cover w-full h-40"
                            src={
                              img
                                ? url + "/images/" + img.filename
                                : "https://www.w3schools.com/howto/img_avatar.png"
                            }
                          />
                        </div>
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        multiple="multiple"
                        accept="image/*"
                        name="filename"
                        id="file-upload"
                        onChange={(e) => {
                          setImages([...images, ...e.target.files]);
                          setImageIsUploaded(true);
                        }}
                      />
                    </div>
                  );
                })
              : images !== undefined && imageIsUploaded === true
              ? Array.from(images).map((img, index) => {
                  return (
                    <div
                      className="flex-shrink-0 flex-col my-5 w-36 h-36   shadow-lg rounded-md cursor-pointer"
                      key={index}
                    >
                      <label
                        className="cursor-pointer custom-file-upload"
                        htmlFor="file-upload"
                      >
                        <div className="text-7xl">
                          <img
                            className="object-cover w-full h-40"
                            src={
                              img
                                ? URL.createObjectURL(img)
                                : "https://www.w3schools.com/howto/img_avatar.png"
                            }
                          />
                        </div>
                      </label>
                      <input
                        className="hidden"
                        type="file"
                        multiple="multiple"
                        accept="image/*"
                        name="filename"
                        id="file-upload"
                        onChange={(e) =>
                          setImages([...images, ...e.target.files])
                        }
                      />
                    </div>
                  );
                })
              : console.log(imageIsUploaded, images)}
          </div>
        </div>
        <hr className="border-cyan-800 mx-5 mt-2" />
        <div className="grid grid-cols-2">
          <div className="px-5 py-2">
            <div className="py-4 text-xl font-bold text-cyan-900 text-left 3xl:mt-3 3xl:mb-8">
              <h1 className="pl-5">Size Chart</h1>
            </div>
          </div>
          <div className="px-5 py-2 text-right">
            <button className="p-2" onClick={() => addSize()}>
              <h1 className="pl-5 text-base font-bold text-cyan-700 hover:text-cyan-900 ">
                Add Rows
              </h1>
            </button>
          </div>
          <table className="table-auto">
            <tbody>
              {sizeArr !== undefined ? (
                sizeArr.map((row, index) => {
                  return (
                    <tr key={index}>
                      <td className="pl-5 ml-5 w-[200vw]">
                        <input
                          placeholder={row.size}
                          type="text"
                          className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
                          onChange={(e) => updateTypeChanged(index, e)}
                        />
                      </td>
                      <td className="ml-5 w-[80vw]">
                        <input
                          placeholder="Stock"
                          type="number"
                          className="border hover:border-cyan-800 focus:border-darkColor p-2 rounded-md  w-full"
                          onChange={(e) => updateStockChanged(index, e)}
                          value={row.stock}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <></>
              )}
            </tbody>
          </table>
        </div>
        <div className="px-5 py-5 text-center">
          <button
            className="text-2xl py-2 border bg-cyan-700 hover:bg-cyan-900 p-2 rounded-md w-1/3 text-white uppercase"
            name="condition"
            id="condition"
            onClick={() => {
              editProductHandler();
            }}
          >
            EDIT
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProduct;
