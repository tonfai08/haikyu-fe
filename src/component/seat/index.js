import React, { useState, useEffect } from "react";
import "./styles.css";
import Typography from "@mui/material/Typography";
import { Button, Popover, Drawer } from "antd";
import { getSeatGroup } from "../../services/seat";
import DrawerSeat from "./drawer";

const Seat = () => {
  const [popoverInfo, setPopoverInfo] = useState({
    anchorEl: null,
    user: "",
    img: "",
  });
  const [open, setOpen] = useState(false);
  const [seatData, setSeatData] = useState([]);
  const showDrawer = (seat) => {
    setSeatData((prevSeats) => [...prevSeats, seat]);
    setOpen(true);
  };
  const onClose = () => {
    setSeatData([]);
    setOpen(false);
  };

  const content = (seat) => {
    return (
      <div className="popover-detail">
        <img src={`/images/p1.png`} alt={`Seat`} className="profile-img" />
        {seat?.status?.statusType === "available"
          ? "ยังไม่ถูกจอง"
          : seat?.status?.statusType}
      </div>
    );
  };

  const [dataSeats, setDataSeats] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      const dataFromServer = await getSeatGroup();
      const sortedData = dataFromServer.sort((a, b) => {
        if (a.row === "a") return 1;
        if (b.row === "a") return -1;
        return a.row < b.row ? 1 : -1;
      });
      setDataSeats(sortedData);
    };
    loadData();
  }, []);

  return (
    <div className="seatsContainer">
      <div className="screen">Screen</div>
      {dataSeats?.map((row) => (
        <div key={row.row} className="row">
          {row?.seats?.map((seat, index) => (
            <div
              key={index}
              className={`seat-container ${
                index % 2 === 1 ? "margin-left" : ""
              }`}
            >
              <div key={seat.seatId} className="seat-container">
                <Popover content={content(seat)}>
                  <div
                    className={`${"seat"} ${seat.user ? "occupied" : ""}`}
                    onClick={() => showDrawer(seat)}
                  >
                    <img
                      src={"/images/seate.png"}
                      alt={`Seat ${seat.name}`}
                      className="seat-img"
                    />
                    <span className="font-prompt">{seat.name}</span>
                  </div>
                </Popover>
              </div>
            </div>
          ))}
        </div>
      ))}
      <Drawer title="จองที่นั่ง" onClose={onClose} mask={false} open={open}>
        <DrawerSeat data={seatData} />
      </Drawer>
    </div>
  );
};

export default Seat;
