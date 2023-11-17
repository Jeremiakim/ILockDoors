import React from "react";
import { Link } from "react-router-dom";
import {
  FaMoneyBillWave,
  FaBed,
  FaInfoCircle,
  FaHeart,
  FaStar,
} from "react-icons/fa"; // Import beberapa icon dari React Icons

const Card = ({ room }) => {
  const {
    id,
    name,
    roomNumber,
    imgUrl,
    price,
    description,
    startDate,
    endDate,
    status,
    AccommodationId,
  } = room;

  return (
    <>
      {status === "vacant" && (
        <Link
          to={`/room/${id}`}
          className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="flex flex-row w-full h-[20rem]">
            <div className="w-2/5" style={{ height: "100%" }}>
              <img
                src={imgUrl}
                className="w-[30rem] h-full rounded-l-lg object-cover"
                alt="Rooms"
              />
            </div>
            <div className="flex flex-col justify-between pl-[3rem] pt-[2rem] pb-[1rem] leading-normal w-3/5">
              <div>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {name}
                </h5>
                <p className="mb-3 font-normal text-gray-400 dark:text-gray-400">
                  {description}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center font-medium text-gray-700 dark:text-gray-400">
                  <FaHeart className="mr-2 text-red-500" />
                  <FaMoneyBillWave className="mr-2" /> Rp.{price}
                </div>
                <div className="flex items-center space-x-1">
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                  <FaStar className="text-yellow-500" />
                </div>
                <button className="px-4 py-2 mr-[2rem] bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          </div>
        </Link>
      )}
    </>
  );
};

export default Card;
