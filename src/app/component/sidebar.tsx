import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faChartArea,
  faFaceLaughWink,
  faLink,
  faTable,
  faTachometerAlt,
  faUser,
  faUsers,
  faWrench,
} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

export default function SideBar() {
  return (
    <div className="bg-blue-600 w-1/5 flex flex-col items-center h-auto">
      <section className="text-white flex justify-around items-center w-4/5 h-[10%] border-b border-slate-100">
        <div className="flex justify-between items-center w-2/5">
          <FontAwesomeIcon
            style={{ fontSize: "37px", transform: "rotate(-25deg)" }}
            icon={faFaceLaughWink}
          ></FontAwesomeIcon>
          <h1 className="text-white font-bold text-center">POS</h1>
        </div>
      </section>
      <section className="text-white flex items-center w-4/5 h-[9%] border-b border-slate-500">
        <Link
          className="flex justify-between items-center w-1/2 no-underline text-white"
          href="/home/dashboard"
        >
          <FontAwesomeIcon
            style={{
              fontSize: "24px",
              marginRight: "10px",
              clipPath: "inset(2px 0px 3px 0px)",
            }}
            icon={faTachometerAlt}
          ></FontAwesomeIcon>
          <h3>Dashboard</h3>
        </Link>
      </section>
      <section className="text-white flex flex-col w-4/5 h-auto border-b border-slate-500 mt-5 pb-5">
        <h4 className="mb-2.5 opacity-50">MASTER</h4>
        <div className="w-auto flex items-end my-2.5 opacity-50 no-underline text-inherit w-auto">
          <FontAwesomeIcon
            style={{ fontSize: "24px", maxWidth: "20px" }}
            icon={faWrench}
          />
          <h4 className="ml-5 font-extralight w-auto w-auto">Good Utilities</h4>
        </div>
        <Link
          className="w-1/2 flex items-end my-2.5 opacity-50 no-underline text-inherit w-auto"
          href="/home/supliers"
        >
          <FontAwesomeIcon
            style={{ fontSize: "24px", maxWidth: "20px" }}
            icon={faLink}
          />
          <h4 className="ml-5 font-extralight w-auto">Suppliers</h4>
        </Link>
        <Link
          className="customers flex items-end my-2.5 opacity-50 no-underline text-inherit w-auto"
          href="/home/customers"
        >
          <FontAwesomeIcon
            style={{ fontSize: "24px", maxWidth: "20px" }}
            icon={faUsers}
          />
          <h4 className="ml-5 font-extralight w-auto ">Customers</h4>
        </Link>
        <Link
          className="w-[42%] flex items-end my-2.5 opacity-50 no-underline text-inherit w-auto"
          href="/home/users"
        >
          <FontAwesomeIcon
            style={{ fontSize: "22px", maxWidth: "20px" }}
            icon={faUser}
          />
          <h4 className="ml-5 font-extralight w-auto ">Users</h4>
        </Link>
      </section>
      <section className="text-white flex flex-col w-4/5 h-auto mt-5 pb-5 border-b border-slate-500">
        <h4 className="mb-2.5 opacity-50">TRANSACTIONS</h4>
        <Link
          className="purchases flex items-end my-2.5 opacity-50 no-underline text-inherit w-auto"
          href="/home/purchases"
        >
          <FontAwesomeIcon
            style={{ fontSize: "24px", maxWidth: "20px" }}
            icon={faTable}
          />
          <h4 className="ml-5 font-extralight w-auto ">Purchases</h4>
        </Link>
        <Link
          className="w-[42%] flex items-end my-2.5 opacity-50 no-underline text-inherit w-auto"
          href="/home/sales"
        >
          <FontAwesomeIcon
            style={{ fontSize: "24px", maxWidth: "20px" }}
            icon={faChartArea}
          />
          <h4 className="ml-5 font-extralight w-auto ">Sales</h4>
        </Link>
      </section>
      <section className="border-none mt-5 items-center text-white flex flex-col w-4/5 h-auto border-b  border-slate-500 mt-5 pb-5">
        <div className="bg-slate-100 w-1/5 rounded-[50%] opacity-50">
          <FontAwesomeIcon
            icon={faAngleLeft}
            style={{
              fontSize: "15px",
              width: "100%",
              background: "#ccc",
              borderRadius: "50%",
              padding: "15px 0",
              fontWeight: "1000",
            }}
          />
        </div>
      </section>
    </div>
  );
}

// IKON
/*
wrench = good utilities
link = suppliers
users = customers
user = users
table = purchase
chart area = sales

*/
