import React from "react";
import { useParams } from "react-router-dom";

const Profile = () => {
  const param = useParams();

  console.log(param);

  return <div>Profile</div>;
};

export default Profile;
