import React from "react";
import "./AlertPopUp.scss";

function AlertPopUp(props) {
  const {alert} = props;
  return (
    <>
      {alert && <div className={alert.type === 'danger' ? `alert alert-${alert.type} animate__animated animate__headShake` : `alert alert-${alert.type}`} role="alert">
          <strong>{alert.type}</strong>: {alert.message}
      </div>}
    </>
  );
}

export default AlertPopUp;
