import React, { useEffect, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserStateContext } from "../../App";
import Users from "./Users";
import UsersBookmarked from "./UsersBookmarked";

function Network() {
  const navigate = useNavigate();
  const userState = useContext(UserStateContext);
  const [selectedTab, setSelectedTab] = useState("all");

  useEffect(() => {
    if (!userState.user) {
      navigate("/login");
      return;
    }
  }, [userState, navigate]);

  return (
    <div className="network-container">
      <section className="section network-content">
        <div className="title-container">
          <h2 className="network-title">
            Shall we check other people's portfolios?
          </h2>
          <p className="network-sub-title">
            Shall we check other people's portfolios? <br></br>Click the Card
            that you want!!
          </p>
        </div>
        <div className="tabs-container" style={tabMenuStyle}>
          <li
            id="all"
            className={selectedTab === "all" ? "tab active" : "tab"}
            onClick={(e) => setSelectedTab(e.target.id)}
            style={selectedTab === "all" ? activeTabStyle : tabStyle}
          >
            All users
          </li>
          <li
            id="bookmarks"
            className={selectedTab === "bookmarks" ? "tab active" : "tab"}
            onClick={(e) => setSelectedTab(e.target.id)}
            style={selectedTab === "bookmarks" ? activeTabStyle : tabStyle}
          >
            Bookmarks
          </li>
        </div>
        {selectedTab === "all" ? <Users /> : <UsersBookmarked />}
      </section>
    </div>
  );
}

export default Network;

const tabMenuStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  listStyle: "none",
  textAlign: "center",
  fontSize: "2rem",
  fontFamily: "Raleway",
  cursor: "pointer",
};

const tabStyle = {
  flex: 1,
  height: "40px",
  lineHeight: "40px",
  backgroundColor: "#f2f2f3",
  borderBottom: "3px solid #0d1e2d",
  transition: "all 0.3s",
};

const activeTabStyle = {
  flex: 1,
  height: "40px",
  lineHeight: "40px",
  fontWeight: "bold",
  backgroundColor: "#0d1e2d",
  borderBottom: "3px solid #0d1e2d",
  color: "white",
  transition: "all 0.3s",
};
