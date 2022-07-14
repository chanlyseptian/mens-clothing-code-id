import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { ProductCardContainerCMS } from "../../components/";
import { GiLoincloth } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../actions/cmsActions";
import { RiTShirtAirFill } from "react-icons/ri";

const CMSDashboard = () => {
  const { action, status, data } = useSelector((state) => state.cmsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  const [query, setQuery] = useState("");
  const [queryDone, setQueryDone] = useState(false);

  useEffect(() => {
    navigate(`/cms/dashboard/${query}`);
  }, [queryDone]);

  return (
    <div className="px-10 lg:px-32 lg:ml-52 3xl:ml-12">
      <div className="flex items-center justify-between p-4 mb-2">
        <div className="mt-3 shadow-sm">
          <a href="" className="flex items-center">
            <GiLoincloth className="text-3xl text-darkColor mr-2 " />
            <span className="lg:text-3xl name-com font-extrabold text-transparent text-8xl bg-clip-text bg-darkColor">
              MEN'S CLOTHING
            </span>
          </a>
        </div>
        <div className="flex">
          <input
            className="rounded mt-6 p-2 w-full search outline-1 outline-lightColor"
            placeholder="Search"
            onChange={(e) => setQuery(e.target.value)}
          ></input>
          <button
            className="ml-1 mt-6 p-3 rounded bg-white text-lightColor hover:bg-darkColor hover:text-white"
            onClick={() => setQueryDone(true)}
          >
            <FaSearch />
          </button>
        </div>
      </div>

      <div className="solid"></div>

      <div className="p-3 flex justify-end">
        <div className="flex flex-col space-x-2 p-3  rounded w-fit ">
          <div className="space-x-5">
            <button
              className=" text-base rounded-md border-bottom text-lightColor border-0 px-3 bg-gray-200 font-semibold "
              onClick={() => {
                navigate(`/cms/dashboard/`);
              }}
            >
              All
            </button>
            <button
              className=" text-base rounded-md  text-lightColor hover:text-darkColor hover:font-semibold"
              onClick={() => {
                navigate(`/cms/dashboard/tops`);
              }}
            >
              Tops
            </button>

            <button
              className="text-base rounded-md  text-lightColor hover:text-darkColor hover:font-semibold"
              onClick={() => {
                navigate(`/cms/dashboard/bottoms`);
              }}
            >
              Bottoms
            </button>

            <button
              className="text-base rounded-md  text-lightColor hover:text-darkColor hover:font-semibold"
              onClick={() => {
                navigate(`/cms/dashboard/accessories`);
              }}
            >
              Accessories
            </button>

            <button
              className="text-base rounded-md  text-lightColor hover:text-darkColor hover:font-semibold"
              onClick={() => {
                navigate(`/cms/dashboard/grooming`);
              }}
            >
              Grooming
            </button>
          </div>
        </div>
      </div>
      <div className="solid"></div>

      <div className=" m-2 mt-6">
        <h1 className="text-xl text-darkColor uppercase"> Products List</h1>
        <p className="text-thin text-gray-400 mt-2 mb-3">
          You can select and customize one of <br></br> your product
        </p>
      </div>
      {/* card */}
      <div className="">
        {action === "GET_ALL_PRODUCTS" && status === "data" ? (
          <ProductCardContainerCMS data={data.data} />
        ) : (
          "loading"
        )}
      </div>
      <div className="fixed right-28 bottom-9">
        <button
          className="text-darkColor hover:text-cyan-600"
          onClick={() => navigate("/cms/add")}
        >
          <div className="flex">
            <IoMdAddCircle size={50} />
            <h1 className="text-base rounded-md font-bold pt-3 pl-1">
              PRODUCTS
            </h1>
          </div>
        </button>
      </div>
    </div>
  );
};

export default CMSDashboard;
