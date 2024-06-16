import React, { useState, useEffect } from "react";
import "./styles.css";

import { Button, Popover, Drawer, Modal } from "antd";
import {
  getSeatGroup,
  deleteRowSeat as deleteRowSeatService,
  createSeats,
} from "../../services/seat";
import DrawerSeat from "./drawer";
import CreateSeatModal from "./modalAddRow";
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
  const [createModalVisible, setCreateModalVisible] = useState(false);

  const showDrawer = (seat) => {
    setSeatData((prevSeats) => {
      console.log(prevSeats);
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
  const deleteRowSeat = async (row) => {
    console.log(row);
    try {
      await deleteRowSeatService(row);
      setDataSeats((currentDataSeats) =>
        currentDataSeats.filter((r) => r.row !== row)
      );
    } catch (error) {
      console.error("Failed to reserve seats:", error);
    }
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

  const showDeleteConfirm = (row) => {
    Modal.confirm({
      title: "Are you sure you want to delete this row?",
      content: `Deleting row: ${row}. This action cannot be undone.`,
      okText: "Yes, delete it",
      okType: "danger",
      cancelText: "No, cancel",
      onOk() {
        deleteRowSeat(row);
      },
      onCancel() {
        console.log("Cancel delete");
      },
    });
  };

  const handleCreate = async (data) => {
    try {
      await createSeats(data);
      fetchData();
      setCreateModalVisible(false);
    } catch (error) {
      console.error("Error creating seats:", error);
    }
  };
  return (
    <div className="seatsContainer">
      <div className="title-btn">
        <Button
          type="primary"
          className="btn-add"
          onClick={() => setCreateModalVisible(true)}
        >
          + Add Row
        </Button>
      </div>
      <div className="screen">Screen</div>
      {dataSeats?.map((row) => (
        <div key={row.row} className="row">
          <Button
            type="primary"
            className="center "
            onClick={() => showDeleteConfirm(row.row)}
          >
            -
          </Button>
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
                    className={`seat  ${
                      isSeatSelected(seat.name) ? "selected" : ""
                    }`}
                    onClick={() => showDrawer(seat)}
                  >
                    <div>
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
                    </div>
                    <span
                      className={`${
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
      <CreateSeatModal
        visible={createModalVisible}
        onCreate={handleCreate}
        onCancel={() => setCreateModalVisible(false)}
        fetchData={fetchData}
      />
    </div>
  );
};

export default Seat;
