import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GiClothes } from "react-icons/gi";
import { FaUserEdit } from "react-icons/fa";
import { RiLogoutCircleLine } from "react-icons/ri";
import { FaUserLock } from "react-icons/fa";


import CMSRoute from "../routers/CMSRoute";
import Swal from "sweetalert2";

function SideBarCMS() {
  const [showDashboard, setShowDashboard] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (
      localStorage.getItem("access_token") &&
      localStorage.getItem("type") === "user"
    ) {
      navigate("/user/home");
    } else if (
      !localStorage.getItem("access_token") ||
      localStorage.getItem("type") !== "cms"
    ) {
      navigate("/login");
    }
  }, []);

  return (
    <div className="flex">
      <aside
        className={`flex transform top-0 left-0 w-96 fixed h-screen overflow-auto ease-in-out transition-all duration-300 z-[3] ${
          showDashboard ? "translate-x-0" : "-translate-x-3/4"
        } `}
      >
        <div className="justify-between border-r-4 border-cyan-200 pt-6 w-3/4 bg-gradient-to-r from-cyan-600 to-cyan-900">
          <div className="flex flex-col items-center text-6xl">
            <FaUserLock className="  font-semibold text-white" />
            <div className=" text-lg h-2/12 font-semibold mt-2 text-white mb-6">
              Admin
            </div>
          </div>
          <hr />
          <div className="flex justify-center">
            <ul className="">
              <li className="my-2">
                <button
                  className="flex items-center px-4 py-2 text-white rounded-md hover:text-black "
                  onClick={() => navigate("/cms/dashboard")}
                >
                  <GiClothes size={25} />
                  <span className="mx-4 font-medium">Products</span>
                </button>
              </li>
              <hr className="w-[280px]"/>
              <li className="my-2">
                <button
                  className="flex items-center px-4 py-2 text-white rounded-md hover:text-black"
                  onClick={() => navigate("/cms/profile")}
                >
                  <FaUserEdit size={25} />
                  <span className="mx-4 font-medium">Profile</span>
                </button>
              </li>
              <hr />
              <li className="my-2 absolute bottom-5">
                <hr className="w-[280px] mb-3"/>
                <button
                  className="flex items-center px-4 py-2 text-white rounded-md hover:text-red-700"
                  onClick={() => {
                    localStorage.clear();
                    Swal.fire("Logout Success!", "See you later!", "success");
                    navigate("/login");
                  }}
                >
                  <RiLogoutCircleLine size={25} />
                  <span className="mx-4 font-medium">Logout</span>
                </button>
                
              </li>
            </ul>
          </div>
        </div>
        {/* <div className="w-1/4 flex justify-center items-center max-h-screen">
          <div className="h-14 w-14 bg-gradient-to-r from-cyan-600 to-cyan-900 rounded-full flex justify-center items-center">
            <button
              className="h-12 w-12 bg-lightColor text-darkColor text-2xl flex justify-center items-center rounded-full"
              onClick={() => setShowDashboard(!showDashboard)}
            >
              <HiMenu />
            </button>
          </div>
        </div> */}
      </aside>
      <main className="mx-auto w-full">
        <div className="container mx-auto">
          <CMSRoute />
        </div>
      </main>
    </div>
  );
}

export default SideBarCMS;
