import { Link } from "react-router-dom";
import BigLogo from "../logos/BigLogo.png";

const Navbar = () => {
  return (
    <>
      <div className="flex justify-evenly bg-[#efefef] text-neutral-content shadow-2xl py-1">
        <div className="flex-1 my-[0.5rem] ml-[2rem]">
          <Link to="/">
            <button className="flex text-xl font-medium items-center justify-center px-1 py-1 rounded-md text-mono text-black">
              <img src={BigLogo} alt="Logo" className="w-6 h-6 mr-2" />
              <span className="relative text-sm">ILockDoors</span>
            </button>
          </Link>
        </div>
        <div className="flex flex-row gap-2 ">
          <div>
            <div className="relative flex-2 my-[0.5rem] mr-[1rem]">
              <input
                type="text"
                id=""
                placeholder="Search..."
                className="rounded-full px-[13px] w-[30vw] h-[2.5vw] text-sm border border-gray-400"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
                Go
              </button>
            </div>
          </div>
          <div className="flex-2 my-[0.5rem] mr-[1rem]">
            <select
              className="form-control mr-2 bg-[#efefef] flex text-base font-medium items-center justify-center px-1 py-1"
              aria-describedby="clear-addon"
            >
              <option selected disabled>
                Cari Tempat Apa?
              </option>
              <option>Kost</option>
              <option>Villa</option>
            </select>
          </div>

          <div className="flex-2 my-[0.5rem] mr-[1rem]">
            <button className="flex text-base font-medium items-center justify-center px-1 py-1 ">
              <span className="relative text-sm">Pusat Bantuan</span>
            </button>
          </div>

          <div className="flex-2 my-[0.5rem] mr-[1rem]">
            <button className="flex text-base font-medium items-center justify-center px-1 py-1 rounded-md text-mono text-black border-2 border-black transition-all hover:text-slate-500 hover:border-slate-500">
              <span className="relative text-sm">Log In</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
