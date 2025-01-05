import {
  faArrowDown,
  faArrowUp,
  faCircleInfo,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import "./usersStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function UsersBox() {
  const [users, setUsers]: any = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token);
    if (!token) {
      // signOut({ redirect: true, callbackUrl: "/" });
      return;
    }
    const fetchUsers = async () => {
      try {
        const res = await axios.get("/api/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        if (res.status === 403) {
          return signOut({ redirect: true, callbackUrl: "/" });
        }
        setUsers(res.data);
      } catch (error) {
        console.log("error when fetch users", error);
        signOut({ redirect: true, callbackUrl: "/" });
        return null;
      }
    };

    fetchUsers();
  }, [setUsers]);

  console.log("users nihh bosz => ", users);

  return (
    <div className="shadow-2xl h-auto bg-white">
      <Link
        href={"/home/users/add"}
        className="flex cursor-pointer w-full justify-start text-white font-thin rounded-[5px] text-center mb-2 bg-slate-100 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] h-[8vh] items-center pl-2"
      >
        <FontAwesomeIcon
          icon={faPlus}
          className="rounded-l text-center bg-blue-700 px-2.5 py-2 text-slate-300 w-[2vw] hover:bg-blue-800"
        />
        <p className="rounded-r text-center bg-blue-600 px-2.5 py-1 text-base w-[5vw] hover:bg-blue-800">
          Add
        </p>
      </Link>
      <section className="table w-full px-4">
        <div className="flex justify-between items-center mb-5 px-2">
          <div className="w-[15%] flex justify-between items-center">
            <p>Show</p>
            <input
              className="border border-slate-300 w-2/6 px-1.5"
              title="show-data"
              type="number"
              name="show-data"
              id=""
            />
            <p>entries</p>
          </div>
          <div className="flex justify-between items-center">
            <p>Search: </p>
            <input
              className="border-2 border-slate-300"
              title="search"
              type="text"
              name="search"
              id=""
            />
          </div>
        </div>
        <table className="w-full flex flex-col">
          <thead className="w-full">
            <tr className="flex w-full justify-between text-slate-500">
              <th className="flex justify-between w-2/12 px-2 py-2 border">
                <h3>User ID</h3>
                <div className="icon-thead flex gap-2">
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="text-sm cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="text-sm cursor-pointer"
                  />
                </div>
              </th>
              <th className="flex justify-between w-3/12 px-1 py-2 border">
                <h3>Email</h3>
                <div className="icon-thead flex gap-2">
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="text-sm cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="text-sm cursor-pointer"
                  />
                </div>
              </th>
              <th className="flex justify-between w-3/12 px-1 py-2 border">
                <h3>Name</h3>
                <div className="icon-thead flex gap-2">
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="text-sm cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="text-sm cursor-pointer"
                  />
                </div>
              </th>
              <th className="flex justify-between w-2/12 px-2 py-2 border">
                <h3>Role</h3>
                <div className="icon-thead flex gap-2">
                  <FontAwesomeIcon
                    icon={faArrowUp}
                    className="text-sm cursor-pointer"
                  />
                  <FontAwesomeIcon
                    icon={faArrowDown}
                    className="text-sm cursor-pointer"
                  />
                </div>
              </th>
              <th className="flex w-2/12 px-1 py-2 border">
                <h3>Actions</h3>
              </th>
            </tr>
          </thead>
          <tbody className="w-full">
            {users.map((user: any, index: any) => (
              <tr
                className="flex w-full justify-between text-slate-500"
                key={index}
              >
                <td className="w-2/12 px-1 py-2 border">{index + 1}</td>
                <td className="w-3/12 px-1 py-2 border">{user.email}</td>
                <td className="w-3/12 px-1 py-2 border">{user.name}</td>
                <td className="w-2/12 px-1 py-2 border">{user.role}</td>
                <td className="w-2/12 px-1 py-2 border">
                  <div className="flex gap-4">
                    <button className="text-white bg-green-600 w-3/12 rounded-[50%] px-1 py-2">
                      <FontAwesomeIcon icon={faCircleInfo} />
                    </button>
                    <button className="text-white bg-red-600 w-3/12 rounded-[50%] px-1 py-2">
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="w-full">
            <tr className="flex w-full justify-between text-slate-500">
              <th className="w-2/12 px-1 py-2 border">
                <h3 className="text-left">User ID</h3>
              </th>
              <th className="w-3/12 px-1 py-2 border">
                <h3 className="text-left">Email</h3>
              </th>
              <th className="w-3/12 px-1 py-2 border">
                <h3 className="text-left">Name</h3>
              </th>
              <th className="w-2/12 px-1 py-2 border">
                <h3 className="text-left">Role</h3>
              </th>
              <th className="w-2/12 px-1 py-2 border">
                <h3 className="text-left">Actions</h3>
              </th>
            </tr>
          </tfoot>
        </table>
        <div className="p-2">
          <p>showing NUMBER to NUMBER of NUMBER entries</p>
          <div className=""></div>
        </div>
      </section>
    </div>
  );
}
