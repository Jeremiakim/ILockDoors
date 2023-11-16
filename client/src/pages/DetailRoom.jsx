import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { urlName } from "../../static";

const DetailRoom = () => {
  let [room, setRoom] = useState({});
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
    AccomodationId,
  } = room;
  const { roomId } = useParams();
  //   console.log(roomId);
  const fecthRoom = async () => {
    const { data } = await axios.get(`${urlName}rooms/${roomId}`);
    // console.log(data);
    setRoom(data.room);
  };
  useEffect(() => {
    fecthRoom();
  }, []);
  //   console.log(roomId);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-center gap-5 py-[5rem]">
        <div className="w-full md:w-2.5/5">
          <img
            className="object-cover w-full rounded-lg h-96 md:h-auto"
            src={imgUrl}
            alt="Room"
          />
        </div>
        <div className="w-full md:w-2.5/5">
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-6">
            <h2 className="text-3xl font-semibold text-gray-800 mb-4">
              {name}
            </h2>
            <p className="text-xl font-semibold text-gray-600 mb-6">
              Nomor Kamar : {roomNumber}
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Spesifikasi : {description}
            </p>
            <p className="text-lg text-gray-600 mb-6">Harga : Rp.{price}</p>
            <p className="text-lg text-gray-600 mb-6">Di mulai : {startDate}</p>
            <p className="text-lg text-gray-600 mb-6"> Sampai : {endDate}</p>
            <div className="flex justify-end">
              <Link
                to="#"
                className="bg-[#343a80] text-white px-6 py-3 rounded-lg hover:bg-blue-950"
              >
                Ajukan Sewa
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailRoom;
