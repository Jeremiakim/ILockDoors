import { useEffect, useState } from "react";
import Card from "../components/Card";
import axios from "axios";
import { urlName } from "../../static";
import { useNavigate } from "react-router-dom";
// import { Card } from "../components/Card";
const apiPlaces = import.meta.env.VITE_SECRET_API_PLACES;

const Home = () => {
  const navigate = useNavigate();
  const [rooms, setrooms] = useState([]);
  const [places, setPlaces] = useState([]);
  const [searchPlaces, setSearchPlaces] = useState("");
  // console.log(places, 14);
  const onChange = (e) => {
    setSearchPlaces(e.target.value);
  };
  const onSubmitSearch = async (e) => {
    e.preventDefault();
    try {
      await fecthPlaces();
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  const fecthRooms = async () => {
    try {
      const access_token = localStorage.getItem("access_token");
      const { data } = await axios.get(`${urlName}rooms`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setrooms(data.Rooms);

      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fecthPlaces = async () => {
    try {
      const { data } = await axios.get(
        `https://api.goapi.io/places?api_key=${apiPlaces}&search=${searchPlaces}`
      );
      // console.log(data.data.results);
      setPlaces(data.data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fecthRooms();
    fecthPlaces();
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
        <div className="mx-[20rem] my-[2rem] flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
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
        <div className="mx-[20rem] my-[2rem] flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
          <div className="flex flex-col justify-between p-4 leading-normal">
            <div className="">
              <form
                action=""
                onSubmit={onSubmitSearch}
                className="flex flex-col px-[5rem] gap-5"
              >
                <label htmlFor="">Kamu Engga ketemu Penginapan di sini?</label>
                <input
                  type="text"
                  id=""
                  placeholder="Cari Tempat Lain, Contoh : Kost Jakarta, Kost tangerang"
                  onChange={onChange}
                  className="rounded-full px-[13px] w-[30vw] h-[2.5vw] text-sm border border-gray-400"
                />
                <button className="flex text-base font-medium items-center justify-center px-1 py-1 rounded-md text-mono text-[#343a80] border-2 border-[#343a80] transition-all hover:text-slate-400 hover:border-slate-400">
                  <span className="relative text-sm">Search</span>
                </button>
                <div>
                  <p>
                    {" "}
                    Your search results :{" "}
                    {places.map((place) => {
                      {
                        console.log(place, 109);
                      }
                      return <p key={place.id}>{place.displayName}</p>;
                    })}
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
