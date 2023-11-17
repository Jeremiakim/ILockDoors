import { GoogleLogin } from "@react-oauth/google";
import { Link, useNavigate } from "react-router-dom";
import { urlName } from "../../static";
import axios from "axios";
import BigLogo from "../logos/BigLogo.png";
import { useState } from "react";
const RegisterPages = () => {
  const navigate = useNavigate();
  const [inputRegister, setInputRegister] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    address: "",
  });
  const onChange = (e) => {
    setInputRegister({
      ...inputRegister,
      [e.target.name]: e.target.value,
    });
  };
  const onSubmitRegister = async (e) => {
    e.preventDefault();
    try {
      console.log(inputRegister);
      const response = await axios.post(`${urlName}register`, inputRegister);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  async function googleLogin(codeResponse) {
    try {
      const { data } = await axios.post(`${urlName}google-login`, null, {
        headers: {
          token: codeResponse.credential,
        },
      });
      localStorage.setItem("access_token", data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-0 sm:m-20 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div>
              <img
                src={BigLogo}
                className="w-32 mx-auto"
                alt="ILockDoors logo"
              />
            </div>
            <h1 className="text-2xl xl:text-3xl font-extrabold">
              Sign-Up For ILockDoors
            </h1>
            <div className="mt-12 flex flex-col items-center">
              <div className="mx-auto max-w-xs">
                <form onSubmit={onSubmitRegister}>
                  <input
                    className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                    type="text"
                    placeholder="Nama"
                    name="fullName"
                    value={inputRegister.name}
                    onChange={onChange}
                  />
                  <input
                    className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="email"
                    placeholder="Email"
                    name="email"
                    value={inputRegister.email}
                    onChange={onChange}
                  />
                  <input
                    className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={inputRegister.password}
                    onChange={onChange}
                  />
                  <input
                    className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    placeholder="Alamat"
                    name="address"
                    value={inputRegister.address}
                    onChange={onChange}
                  />
                  <input
                    className="w-full h-[1rem] px-4 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                    type="text"
                    placeholder="Nomor Telepon"
                    name="phoneNumber"
                    value={inputRegister.phoneNumber}
                    onChange={onChange}
                  />
                  <button
                    className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-3 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    type="submit"
                  >
                    <svg
                      className="w-6 h-6 -ml-2"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                      <circle cx="8.5" cy="7" r="4" />
                      <path d="M20 8v6M23 11h-6" />
                    </svg>
                    <span className="ml-3">Sign Up</span>
                  </button>
                </form>
              </div>
              <div className="my-2 border-b text-center">
                <div className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2 border-l-2 border-r-2 border-gray-300">
                  Or sign up with e-mail
                </div>
              </div>
              <div className="w-full flex-1 mt-8">
                <div className="flex flex-col items-center">
                  {/* Buttons */}
                  <GoogleLogin onSuccess={googleLogin} />
                </div>
                {/* Email and Password Input */}
                {/* Sign Up Button */}
                <p className="mt-6 text-xs text-gray-600 text-center">
                  Udah ada akun ILockDoors?
                  <Link
                    to="/login"
                    className="border-b border-gray-500 border-dotted"
                  >
                    Log-in aja
                  </Link>
                </p>
              </div>
            </div>
          </div>
          <div className="flex-1 text-center hidden lg:flex">
            <div
              className="w-full h-full bg-contain bg-right bg-no-repeat rounded"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1631819313347-a5dca24a04fa?q=80&w=1917&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>
          </div>
        </div>
        {/* Popup Component */}
        <div
          className="hidden treact-popup fixed inset-0 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.3)" }}
        >
          <div className="max-w-lg p-8 sm:pb-4 bg-white rounded shadow-lg text-center sm:text-left">
            {/* Popup Content */}
            <h1>Password Wrong</h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPages;
