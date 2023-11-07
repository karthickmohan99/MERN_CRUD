import { Link } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import Token from "../../src/TokenService/Token";
import React from "react";

const BackButton = ({ destination, logout }) => {
  console.log(destination, "------destination----");

  const handleLogout = () => {
    if (logout) {
      Token.removeAccessToken();
      Token.removeRefreshToken();

      window.location.href = destination;
    }
  };
  return (
    <div className="flex" onClick={handleLogout}>
      <Link
        to={destination}
        className="bg-sky-800 text-white px-4 py-1 rounded-lg w-fit no-underline "
      >
        {logout ? (
          <span className="mt-2 ">Logout</span>
        ) : (
          <BsArrowLeft className="text-2xl" />
        )}
      </Link>
    </div>
  );
};

export default BackButton;
