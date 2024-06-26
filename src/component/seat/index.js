import React, { useState, useEffect } from "react";
import "./styles.css";
import Typography from "@mui/material/Typography";
import { Button, Popover, Drawer } from "antd";
import { getSeatGroup } from "../../services/seat";
import DrawerSeat from "./drawer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCouch, faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const Seat = () => {
  const [popoverInfo, setPopoverInfo] = useState({
    anchorEl: null,
    user: "",
    img: "",
  });
  const [open, setOpen] = useState(false);
  const [seatData, setSeatData] = useState([]);
  const showDrawer = (seat) => {
    setSeatData((prevSeats) => {
      const isAlreadySelected = prevSeats.some((s) => s.name === seat.name);

      if (isAlreadySelected) {
        return prevSeats.filter((s) => s.name !== seat.name);
      } else {
        return [...prevSeats, seat];
      }
    });
    setOpen(true);
  };
  const onClose = () => {
    setSeatData([]);
    setOpen(false);
  };

  const content = (seat) => {
    return (
      <div className="popover-detail">
        {seat?.reservedBy?.email ? <p>{seat?.reservedBy?.email}</p> : ""}
        {seat?.reservedBy?.name ? <p>{seat?.reservedBy?.name}</p> : ""}
        {seat?.status?.statusType === "available" ? (
          <div className="text-status">Available</div>
        ) : (
          <div className="text-status text-red">Occupied</div>
        )}
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
    const intervalId = setInterval(loadData, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const fetchData = async () => {
    const dataFromServer = await getSeatGroup();
    const sortedData = dataFromServer.sort((a, b) => {
      if (a.row === "a") return 1;
      if (b.row === "a") return -1;
      return a.row < b.row ? 1 : -1;
    });
    setDataSeats(sortedData);
  };

  const isSeatSelected = (seatName) => {
    return seatData.some((seat) => seat.name === seatName);
  };

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
                  <div className="seat">
                    <div className="bloc-icon-fix">
                      {seat.status?.statusType === "available" ? (
                        <FontAwesomeIcon
                          icon={faCouch}
                          className={`custom-icon ${
                            seat.price > 280
                              ? "custom-icon-285"
                              : "custom-icon-250"
                          }`}
                        />
                      ) : (
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className={`icon-reserved`}
                        />
                      )}
                    </div>
                    <span
                      className={`text-seat-name ${
                        seat.status?.statusType !== "available"
                          ? "reserved-seat-name"
                          : ""
                      }`}
                    >
                      {seat.name}
                    </span>
                  </div>
                </Popover>
              </div>
            </div>
          ))}
        </div>
      ))}
      <Drawer title="จองที่นั่ง" onClose={onClose} mask={false} open={open}>
        <DrawerSeat data={seatData} fetchData={fetchData} onClose={onClose} />
      </Drawer>
    </div>
  );
};

export default Seat;
