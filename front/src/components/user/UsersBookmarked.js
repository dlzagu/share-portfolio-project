import React, { useEffect, useState } from "react";

import * as Api from "../../api";
import UserCard2 from "./UserCard2";
import Icon from "../icon/Icon";

function UsersBookmarked() {
  const [users, setUsers] = useState([]);
  const [pagedUsers, setPagedUsers] = useState([]);
  const [ioTarget, setIoTarget] = useState(null);

  useEffect(() => {
    Api.get("api/userlist", "?bookmark=true").then((res) => {
      const data = res.data.data;
      setUsers(data);
      if (data.length < 6) setPagedUsers(data.slice(0, data.length));
      else setPagedUsers(data.slice(0, 6));
    });
  }, []);

  useEffect(() => {
    let io;
    let page = 2;
    if (ioTarget) {
      const pageControll = (entries, observer) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            observer.unobserve(entry.target);
            if (page * 3 >= users.length) {
              setPagedUsers([...users]);
            } else {
              setPagedUsers([...users.slice(0, page * 3)]);
              page++;
            }
            observer.observe(entry.target);
          }
        });
      };
      io = new IntersectionObserver(pageControll, {
        threshold: 1,
      });
      io.observe(ioTarget);
    }
    return () => io && io.disconnect();
  }, [ioTarget, users]);

  return (
    <div className="usercard-container">
      <div className="usercard-content">
        {pagedUsers.length !== 0 ? (
          pagedUsers.map((user) => (
            <UserCard2 key={user.id} user={user} isNetwork />
          ))
        ) : (
          <div
            style={{
              width: "100%",
              paddingTop: "15rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div style={{ fontSize: "8rem", color: "#0d1e2d" }}>
              <Icon name={"regularBookmark"} />
            </div>
            <div style={{ marginTop: "1rem", fontSize: "3rem" }}>
              북마크가 없습니다.
            </div>
          </div>
        )}
      </div>
      <div ref={setIoTarget} style={targetStyle} />
    </div>
  );
}

export default UsersBookmarked;

const targetStyle = {
  width: "1px",
  height: "1px",
};
