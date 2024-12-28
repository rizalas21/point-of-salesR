"use client";

import { faDatabase, faUndo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import { useState } from "react";

export default function AddUsers() {
  const [data, setData] = useState({
    email: "",
    name: "",
    password: "",
    role: "",
  });

  const handleSubmit = async () => {
    const token = await localStorage.getItem("token");

    const res = await axios.post("/api/users", data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer" + token,
      },
    });

    return res;
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  return (
    <div className=" flex flex-col shadow-2xl h-full bg-white">
      <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center pl-2">
        <p className="text-blue-400 font-medium">Form Add</p>
      </div>
      <form className="flex flex-col p-10 gap-5">
        <div className="flex justify-between w-full h-[6vh] rounded">
          <label>Email</label>
          <input
            placeholder="Email"
            type="email"
            className="w-4/5 border p-1.5 drop-shadow"
            name="email"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between w-full h-[6vh] rounded">
          <label>Name</label>
          <input
            placeholder="Name"
            type="text"
            className="w-4/5 border p-1.5 drop-shadow"
            name="name"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between w-full h-[6vh] rounded">
          <label>Password</label>
          <input
            placeholder="Password"
            type="password"
            className="w-4/5 border p-1.5 drop-shadow"
            name="password"
            onChange={handleChange}
          />
        </div>
        <div className="flex justify-between w-full">
          <label>Role</label>
          <div className="flex flex-col w-4/5">
            <div className="flex gap-2">
              <input
                type="radio"
                name="role"
                value="operator"
                onChange={handleChange}
              />
              <span>Operator</span>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                name="role"
                value="admin"
                onChange={handleChange}
              />
              <span>Admin</span>
            </div>
          </div>
        </div>
      </form>
      <div className="flex w-full justify-start text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center gap-5 px-5 py-2">
        <button className="flex w-[8vw] h-full justify-between items-center h-4/5 bg-green-600">
          <FontAwesomeIcon
            className="rounded-l text-center bg-green-700 px-2.5 py-2 text-slate-300 w-1/5 hover:bg-green-800 text-white"
            icon={faDatabase}
          />
          <p className="rounded-l text-center bg-green-500 px-2.5 py-2 text-slate-300 w-4/5 hover:bg-green-800 h-full text-white font-medium">
            Save
          </p>
        </button>
        <button className="flex w-[8vw] h-full justify-between items-center h-4/5 bg-yellow-600">
          <FontAwesomeIcon
            className="rounded-l text-center bg-yellow-700 px-2.5 py-2 text-slate-300 w-1/5 hover:bg-yellow-800 text-white"
            icon={faUndo}
          />
          <p className="rounded-l text-center bg-yellow-500 px-2.5 py-2 text-slate-300 w-4/5 hover:bg-yellow-800 h-full text-white font-medium">
            Cancel
          </p>
        </button>
      </div>
    </div>
  );
}
