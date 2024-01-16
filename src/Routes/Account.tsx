import React from "react";
import { useParams } from "react-router-dom";

const Account = () => {
  const param = useParams();

  console.log(param);

  return <div>Account</div>;
};

export default Account;
