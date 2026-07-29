import { NavLink, useNavigate } from "react-router-dom";
import {
  FaChartPie,
  FaUsers,
  FaMoneyBillWave,
  FaCreditCard,
  FaChartBar,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { FaUserShield } from "react-icons/fa";

const Sidebar = () => {
  const navigate = useNavigate();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Borrowers",
      path: "/borrowers",
      icon: <FaUsers />,
    },
    {
      name: "Loans",
      path: "/loans",
      icon: <FaMoneyBillWave />,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: <FaCreditCard />,
    },
    {
      name: "Reports",
      path: "/reports",
      icon: <FaChartBar />,
    },
    {
    name: "Users",
    path: "/users",
    icon: <FaUserShield />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog />,
    },
  ];

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-slate-800">
        <h1 className="text-2xl font-bold">LMS</h1>

        <p className="text-xs text-slate-400">
          Loan Management System
        </p>
      </div>

      {/* Navigation */}
      <div className="flex-1 mt-4">
        {menu.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 px-5 py-3 mx-2 rounded-lg transition ${
                isActive
                  ? "bg-green-600 text-white"
                  : "hover:bg-slate-800 text-slate-200"
              }`
            }
          >
            <span className="text-lg">
              {item.icon}
            </span>

            <span>{item.name}</span>
          </NavLink>
        ))}
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-slate-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10 transition"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;