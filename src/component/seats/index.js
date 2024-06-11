import React, { useState } from "react";
import "./styles.css";
//import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { Button, Popover } from "antd";
const data = {
  G: [
    {
      seatId: "G1",
      user: "@ame_kwan",
      img: "p2.png",
    },
    {
      seatId: "G2",
      user: "@Sonagi______",
      img: "p1.png",
    },
    {
      seatId: "G3",
      user: "@ppingth",
      img: "p2.png",
    },
    {
      seatId: "G4",
      user: "@beesawi",
      img: "p1.png",
    },
    {
      seatId: "G5",
      user: "@_another__me___",
      img: "p2.png",
    },
    {
      seatId: "G6",
      user: "@bettercooldown",
      img: "p1.png",
    },
  ],
  F: [
    {
      seatId: "F1",
      user: "@ToonYukiD",
      img: "p2.png",
    },
    {
      seatId: "F2",
      user: "@ToonYukiD",
      img: "p1.png",
    },
    {
      seatId: "F3",
      user: "@MizuMii_",
      img: "p2.png",
    },
    {
      seatId: "F4",
      user: "@MizuMii_",
      img: "p1.png",
    },
    {
      seatId: "F5",
      user: "@JAME_KUN_03",
      img: "p2.png",
    },
    {
      seatId: "F6",
      user: "@_lavieenpastel",
      img: "p1.png",
    },
  ],
  E: [
    {
      seatId: "E1",
      user: "@Areknazan_",
      img: "p2.png",
    },
    {
      seatId: "E2",
      user: "@Areknazan_",
      img: "p1.png",
    },
    {
      seatId: "E3",
      user: "@Areknazan_",
      img: "p2.png",
    },
    {
      seatId: "E4",
      user: "@Areknazan_",
      img: "p1.png",
    },
    {
      seatId: "E5",
      user: "@Areknazan_",
      img: "p2.png",
    },
    {
      seatId: "E6",
      user: "@Areknazan_",
      img: "p1.png",
    },
  ],
  D: [
    {
      seatId: "D1",
      user: "@lililaxx",
      img: "p2.png",
    },
    {
      seatId: "D2",
      user: "@lililaxx",
      img: "p1.png",
    },
    {
      seatId: "D3",
      user: "@captainmeowss",
      img: "p2.png",
    },
    {
      seatId: "D4",
      user: "@captainmeowss",
      img: "p1.png",
    },
    {
      seatId: "D5",
      user: "@Moonlover_Miyu",
      img: "p2.png",
    },
    {
      seatId: "D6",
      user: "@suganim96",
      img: "p1.png",
    },
  ],
  C: [
    {
      seatId: "C1",
      user: "@littlerodrick",
      img: "p2.png",
    },
    {
      seatId: "C2",
      user: "@Sh_wkuyNomsod",
      img: "p1.png",
    },
    {
      seatId: "C3",
      user: "@krizchanewworld",
      img: "p2.png",
    },
    {
      seatId: "C4",
      user: "@nattokrit",
      img: "p1.png",
    },
    {
      seatId: "C5",
      user: "@nattokrit",
      img: "p2.png",
    },
    {
      seatId: "C6",
      user: "@nattokrit",
      img: "p1.png",
    },
  ],
  B: [
    {
      seatId: "B1",
      user: "@CHINB2_",
      img: "p2.png",
    },
    {
      seatId: "B2",
      user: "@sugus_DM",
      img: "p1.png",
    },
    {
      seatId: "B3",
      user: "@mmemeacrl",
      img: "p2.png",
    },
    {
      seatId: "B4",
      user: "@mmemeacrl",
      img: "p1.png",
    },
    {
      seatId: "B5",
      user: "@mmemeacrl",
      img: "p2.png",
    },
    {
      seatId: "B6",
      user: "@Icing_lotus",
      img: "p1.png",
    },
  ],
  A: [
    {
      seatId: "A1",
      user: "@Sxourbutter",
      img: "p2.png",
    },
    {
      seatId: "A2",
      user: "@Sxourbutter",
      img: "p1.png",
    },
    {
      seatId: "A3",
      user: "@Mamee_SmurF",
      img: "p2.png",
    },
    {
      seatId: "A4",
      user: "@maotheharbinger",
      img: "p1.png",
    },
  ],
};
const Seat = () => {
  const [popoverInfo, setPopoverInfo] = useState({
    anchorEl: null,
    user: "",
    img: "",
  });

  const handlePopoverOpen = (event, user, img) => {
    setPopoverInfo({
      anchorEl: event.currentTarget,
      user: user,
      img: img,
    });
  };

  const handlePopoverClose = () => {
    setPopoverInfo({
      ...popoverInfo,
      anchorEl: null,
    });
  };
  const open = Boolean(popoverInfo.anchorEl);

  const content = (user, imges = "p1.png") => (
    <div className="popover-detail">
      <img src={`/images/${imges}`} alt={`Seat`} className="profile-img" />
      {user || "ยังไม่มีใครจอง"}
    </div>
  );

  function chunkArray(array, chunkSize) {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  return (
    <div className={"seatsContainer"}>
      <div className="screen"> Screen</div>
      {Object.entries(data).map(([rowLabel, seats]) => {
        const chunkedSeats = chunkArray(seats, 2);
        return (
          <div key={rowLabel} className={"row"}>
            {chunkedSeats.map((seatGroup, index) => (
              <div key={index} className="seat-group">
                {" "}
                {/* แสดงผลแต่ละกลุ่มที่นั่ง */}
                {seatGroup.map((seat) => (
                  <div key={seat.seatId} className="seat-container">
                    <Popover content={content(seat.user, seat.img)}>
                      <div
                        className={`${"seat"} ${seat.user ? "occupied" : ""}`}
                      >
                        <img
                          src={"/images/seate.png"}
                          alt={`Seat ${seat.seatId}`}
                          className="seat-img"
                        />
                        <span className="font-prompt">{seat.seatId}</span>
                      </div>
                    </Popover>
                  </div>
                ))}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
};

export default Seat;
