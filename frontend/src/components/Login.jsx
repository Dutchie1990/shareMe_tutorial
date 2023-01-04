import React from "react";
import {
  GoogleLogin,
  GoogleOAuthProvider,
  useGoogleLogin,
} from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import shareVideo from "../assets/share.mp4";
import logo from "../assets/logowhite.png";
import jwt_decode from "jwt-decode";

import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();

  const saveUser = (response) => {
    const profile = jwt_decode(response.credential);
    localStorage.setItem("user", JSON.stringify(profile));
    const { name, jti, picture } = jwt_decode(response.credential);

    const doc = {
      _id: jti,
      _type: "user",
      userName: name,
      image: picture,
    };

    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative  w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute flex flex-center flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
        <div className="p-5">
          <img src={logo} width="130px" alt="Logo" />
        </div>
        <div className="shadow-2xl">
          <GoogleLogin
            onSuccess={(codeResponse) => {
              saveUser(codeResponse);
            }}
            onError={(err) => console.log(err)}
          />
        </div>
      </div>
    </div>
  );
};

export default Login;
