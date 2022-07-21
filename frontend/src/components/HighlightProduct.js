import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import base_url from "../helpers/base_url";
import intToRupiah from "../helpers/rupiah";
import {
    oneStar,
    twoStars,
    threeStars,
    fourStars,
    fiveStars,
} from "../helpers/stars";
import { getProductsSortPrice } from "../actions/cmsActions"

import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

import dummy_1 from "./image_banner/dummy_1.webp";
import dummy_2 from "./image_banner/dummy_2.webp"
import dummy_3 from "./image_banner/dummy_3.webp"
import dummy_4 from "./image_banner/dummy_4.webp"
import dummy_5 from "./image_banner/dummy_5.webp"
import dummy_6 from "./image_banner/dummy_6.webp"

const dummyImg = [
    {
        image: dummy_1,
        label: "gambar 1"
    },
    {
        image: dummy_2,
        label: "gambar 2"
    },
    {
        image: dummy_3,
        label: "gambar 3"
    },
    {
        image: dummy_4,
        label: "gambar 4"
    },
    {
        image: dummy_5,
        label: "gambar 5"
    },
    {
        image: dummy_6,
        label: "gambar 6"
    },
    {
        image: dummy_2,
        label: "gambar 2"
    },
    {
        image: dummy_3,
        label: "gambar 3"
    },
    {
        image: dummy_4,
        label: "gambar 4"
    },
];
let count = 0;


const HighlightProduct = () => {
    const url = base_url;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [product, setProduct] = useState([]);

    const { actionPrice, statusPrice, dataPrice } = useSelector((state) => state.cmsReducer);

    const slideLeft = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft + 220;
    }

    const slideRight = () => {
        let slider = document.getElementById('slider');
        slider.scrollLeft = slider.scrollLeft - 220;
    }

    useEffect(() => {
        if (actionPrice === "GET_PRODUCTS_SORT_PRICE" && statusPrice === "dataPrice") {
            setProduct(dataPrice)
        }
    }, [statusPrice])

    useEffect(() => {
        dispatch(getProductsSortPrice(10))
    }, []);

    return (
        <>
            <div className='relative px-24 3xl:px-[73px] flex items-center lg:mt-2 lg:mb-8 justify-between border-solid border-2 bg-darkColor'>
                <h1 className=" text-xl text-gray-100 font-semibold">
                    Produk Termurah
                </h1>
                <MdKeyboardArrowLeft className='text-gray-200 opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
                <div
                    id='slider'
                    className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide '
                >

                    <div >
                        {dataPrice.data && dataPrice.data.map((data) => (
                            <div
                                // onClick={() => navigate(`/cms/details/${data.id}`)}
                                className='w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'
                            >
                                <img
                                    alt=''
                                    src={`${url}/images/${data.ProductImages[0].filename}`}
                                    onClick={() => navigate(`/cms/details/${data.id}`)}
                                />
                                <div className="p-2 flex justify-between">
                                    <div>
                                        <p className="text-start text-gray-200">{data.name}</p>
                                        <div>
                                            <p className="text-start text-gray-200 font-bold">
                                                Rp. {intToRupiah(data.price)}{" "}
                                            </p>
                                        </div>
                                        <div className="flex grid-cols-5 mt-1 text-start">
                                            <div className="flex col-span-2 w-12 text-start">
                                                <div className="text-amber-500 text-lg flex text-start">
                                                    {data.rating === 1
                                                        ? oneStar
                                                        : data.rating === 2
                                                            ? twoStars
                                                            : data.rating === 3
                                                                ? threeStars
                                                                : data.rating === 4
                                                                    ? fourStars
                                                                    : fiveStars}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-200">
                                        <p className="text-[12px] capitalize text-end">{data.category}</p>
                                        <p className="font-semibold text-end">Sold: {data.totalSold}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                < MdKeyboardArrowRight className='text-gray-200 opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
            </div>


            {/* dummy */}
            <div className='relative px-24 3xl:px-[73px] flex items-center lg:mt-2 lg:mb-8 justify-between border-solid border-2 bg-darkColor'>
                <h1 className=" text-xl text-gray-100 font-semibold">
                    Produk Terlaris
                </h1>
                < MdKeyboardArrowLeft className='text-gray-200 opacity-50 cursor-pointer hover:opacity-100' onClick={slideRight} size={40} />
                <div
                    id='slider'
                    className='w-full h-full overflow-x-scroll scroll whitespace-nowrap scroll-smooth scrollbar-hide '
                >
                    <div >
                        {dummyImg.map((item) => (
                            <div
                                className='w-[220px] inline-block p-2 cursor-pointer hover:scale-105 ease-in-out duration-300'
                            >
                                <img
                                    alt=''
                                    src={item.image}
                                    // onClick={() => navigate(`/cms/details/${data.id}`)}
                                />
                                <div className="p-2 flex justify-between">
                                    <div>
                                        <p className="text-start text-gray-200">{item.label}</p>
                                        <div>
                                            <p className="text-start text-gray-200 font-bold">
                                                Rp. 0000000
                                                {/* {intToRupiah(data.price)}{" "} */}
                                            </p>
                                        </div>
                                        <div className="flex grid-cols-5 mt-1 text-start">
                                            <div className="flex col-span-2 w-12 text-start">
                                                <div className="text-amber-500 text-lg flex text-start">
                                                    {/* {data.rating === 1
                                                        ? oneStar
                                                        : data.rating === 2
                                                            ? twoStars
                                                            : data.rating === 3
                                                                ? threeStars
                                                                : data.rating === 4
                                                                    ? fourStars
                                                                    : fiveStars} */}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-sm text-gray-200">
                                        {/* <p className="text-[12px] capitalize text-end">{data.category}</p>
                                        <p className="font-semibold text-end">Sold: {data.totalSold}</p> */}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                < MdKeyboardArrowRight className='text-gray-200 opacity-50 cursor-pointer hover:opacity-100' onClick={slideLeft} size={40} />
            </div>
        </>
    );
};

export default HighlightProduct;
