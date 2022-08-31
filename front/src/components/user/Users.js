import React, { useEffect, useState } from "react";

import * as Api from "../../api";
import UserCard2 from "./UserCard2";

const shuffle = (array) => {
  for (let currentIndex = array.length - 1; currentIndex > 0; currentIndex--) {
    const targetIndex = Math.floor(Math.random() * (currentIndex + 1));
    [array[currentIndex], array[targetIndex]] = [
      array[targetIndex],
      array[currentIndex],
    ];
  }
  return array;
};

function Users() {
  const [users, setUsers] = useState([]);
  const [pagedUsers, setPagedUsers] = useState([]);
  const [ioTarget, setIoTarget] = useState(null);

  useEffect(() => {
    Api.get("api", "userlist").then((res) => {
      const data = shuffle(res.data.data);
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
        {pagedUsers.map((user) => (
          <UserCard2 key={user.id} user={user} isNetwork />
        ))}
      </div>
      <div ref={setIoTarget} style={targetStyle} />
    </div>
  );
}

export default Users;

const targetStyle = {
  width: "1px",
  height: "1px",
};
