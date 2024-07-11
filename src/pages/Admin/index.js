import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CryptoJS from "crypto-js";
import Seat from "../../component/seatAdmin";
import "../styles.css";

const AdminHome = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const expectedToken = btoa("081013"); // แปลงค่า otp เป็น base64
      console.log("expectedToken", expectedToken, token);
      if (token === expectedToken) {
        setData("Authorized");
      } else {
        setError("Unauthorized");
        navigate("/hq-krtsk-khn/login");
      }
    } else {
      setError("Unauthorized");
      navigate("/hq-krtsk-khn/login");
    }
  }, []);

  return (
    <div className={"contaner"}>
      <div className={"header"}>
        <img
          src="../../images/header.png"
          alt="header"
          className="header-img"
        />
      </div>
      {error ? (
        <div className={"error"}>{error}</div>
      ) : (
        <div className={"block"}>
          <Seat />
        </div>
      )}
      <span>
        <br />
      </span>
    </div>
  );
};

export default AdminHome;
