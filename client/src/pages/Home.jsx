import { useState } from "react";
import Card from "../components/Card";
import { useEffect } from "react";
import axios from "axios";
import { urlName } from "../../static";
import { Link } from "react-router-dom";

const Home = () => {
  const [rooms, setrooms] = useState([]);

  const fecthRooms = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const { data } = await axios.get(`${urlName}rooms`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      // console.log(data);
      setrooms(data.Rooms);
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(rooms, 19);
  useEffect(() => {
    fecthRooms();
  }, []);
  return (
    <>
      <div>
        <img
          src="https://images.unsplash.com/photo-1628542339736-a2c701bfa1f6?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          className="w-full"
        />
      </div>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex flex-col gap-5">
        <div
          to=""
          href="#"
          className="mx-[20rem] my-[4rem] flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
        >
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Kost yang terjamin kualitas nya hanya ada di ILockDoors
            </h5>
            <p className="mb-3 text-lg font-medium text-gray-700 dark:text-gray-400">
              Sudah terverifikasi oleh banyak orang.
            </p>
          </div>
        </div>
        <div className="flex justify-between w-full">
          <div className=" text-gray-900 flex flex-col gap-8 w-full">
            <div className="grid grid-cols-1 gap-10 my-[2rem] px-[5rem] w-full">
              {rooms.map((room) => {
                return <Card room={room} key={room.id}></Card>;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
