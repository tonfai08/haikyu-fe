import React, { useState, useEffect } from "react";
import { Button, Tag, Modal } from "antd";
import { reserveSeats } from "../../services/seat";

const DrawerSeat = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modelMns, setIsModalMns] = useState("");
  const totalPrice = data.reduce((acc, seat) => acc + seat.price, 0);

  const showModal = () => {
    handleReserveClick();
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleReserveClick = async () => {
    try {
      const response = await reserveSeats(data);
      console.log("Reservation successful:", response);
      if (!response.ok && response.status >= 400) {
        setIsModalMns("มีคนจองแล้ว");
      }
      setIsModalMns("สำเร็จ");
    } catch (error) {
      console.error("Failed to reserve seats:", error);
      setIsModalMns("มีคนจองแล้ว");
    }
  };
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
      <p>ราคา : {totalPrice} </p>
      <Button type="primary" onClick={showModal}>
        จอง
      </Button>
      <Modal title="Basic Modal" open={isModalOpen} onCancel={handleCancel}>
        <p>{modelMns}</p>
      </Modal>
    </div>
  );
};

export default DrawerSeat;
