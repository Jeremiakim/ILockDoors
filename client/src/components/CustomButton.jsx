import { Link } from "react-router-dom";

const CustomButton = () => {
  return (
    <>
      <div className="flex-2 my-[0.5rem] mr-[1rem]">
        <Link to="/login">
          <button className="flex text-base font-medium items-center justify-center px-1 py-1 rounded-md text-mono text-[#343a80] border-2 border-[#343a80] transition-all hover:text-slate-400 hover:border-slate-400">
            <span className="relative text-sm">{/* <LuLogOut /> */}</span>
          </button>
        </Link>
      </div>
    </>
  );
};

export default CustomButton;
