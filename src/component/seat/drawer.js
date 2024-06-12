import React, { useState, useEffect } from "react";
import { Button, Tag } from "antd";
const DrawerSeat = ({ data }) => {
  console.log("test-test", data);
  return (
    <div className="seatsContainer">
      <p>
        เก้าอี้ที่ต้องการจอง :{" "}
        {data.map((seat, index) => (
          <Tag key={index} color="blue">
            {seat.name}
          </Tag>
        ))}
      </p>

      <Button type="primary">จอง</Button>
    </div>
  );
};

export default DrawerSeat;
