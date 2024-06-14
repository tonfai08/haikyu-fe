import React, { useEffect, useState } from "react";
import Seat from "../../component/seatAdmin";
import "../styles.css";
const AdminHome = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  return (
    <div className={"contaner"}>
      <div className={"block"}>
        <Seat />
      </div>
      <span>
        <br />
      </span>
    </div>
  );
};

export default AdminHome;
