import React, { useEffect, useState } from "react";
import Seat from "../component/seats";
import "./styles.css";
import axios from "axios";

const Home = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://haikyu-be.vercel.app/seat/grouped"
        );
        setData(response.data);
        console.log("response", response);
      } catch (err) {
        setError(err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={"contaner"}>
      <div className={"block"}>
        <Seat />
      </div>
      <span>
        <br />
        test
      </span>
    </div>
  );
};

export default Home;
