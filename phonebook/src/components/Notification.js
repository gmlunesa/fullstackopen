import React from "react";

const Notification = ({ alert }) => {
  if (Object.keys(alert).length === 0) {
    return null;
  }

  return <div className={alert.className}>{alert.message}</div>;
};

export default Notification;
