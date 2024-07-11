import React, { useEffect, useState } from "react";
import "./styles.css";
import OtpInput from "react-otp-input";
import CryptoJS from "crypto-js";
import { useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (otp.length === 6) {
      if (otp === "081013") {
        const token = btoa(otp);
        localStorage.setItem("token", token);
        alert("Login successful!");
        navigate("/hq-krtsk-khn/admin/");
      }
    }
  }, [otp]);
  console.log("otp", otp);
  return (
    <div className={"contaner"}>
      <div className={"header"}>
        <img
          src="../../images/header.png"
          alt="header"
          className="header-img"
        />
      </div>
      <div className={"block"}>
        <div className="login-block">
          <OtpInput
            value={otp}
            onChange={setOtp}
            numInputs={6}
            renderSeparator={<span className="otp-separator">-</span>}
            renderInput={(props) => <input {...props} className="otp-input" />}
          />
        </div>
      </div>

      <span>
        <br />
      </span>
    </div>
  );
};

export default LoginPage;
