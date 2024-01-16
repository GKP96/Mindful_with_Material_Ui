import { MenuItem } from "@mui/material";
import React from "react";

export default function LogoutDropDown() {
  const email =localStorage.getItem('email');
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    window.location.reload();
  };
  return (
      <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
      <div className="flex flex-col w-48 h-20  mt-16  ">
      <MenuItem>{email}</MenuItem>
      <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </div>
      </div>
  );
}
