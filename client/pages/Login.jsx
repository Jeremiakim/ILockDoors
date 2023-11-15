import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { urlName } from "../static";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  async function googleLogin(codeResponse) {
    try {
      // console.log(codeResponse.credential);
      const { data } = await axios.post(`${urlName}google-login`, null, {
        headers: {
          token: codeResponse.credential,
        },
      });
      console.log(data);
      localStorage.setItem("access_token", data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <p>Hello</p>
      <GoogleLogin onSuccess={googleLogin} />
    </>
  );
};

export default Login;
