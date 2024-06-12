import React, { useEffect, useState } from "react";
import Seat from "../component/seat";
import "./styles.css";
const Home = () => {
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

export default Home;
