import { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AdminMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <button
        className={`${isMenuOpen ? "top-2 right-2" : "top-5 right-7"
          } bg-pink-600 p-2 fixed rounded-lg`}
        onClick={toggleMenu}
      >
        {isMenuOpen ? (
          <FaTimes color="white" />
        ) : (
          <>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
            <div className="w-6 h-0.5 bg-gray-200 my-1"></div>
          </>
        )}
      </button>

      {isMenuOpen && (
        <section className="bg-pink-400 p-4 fixed right-7 top-5">
          <ul className="list-none mt-2">
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-pink-600 rounded-sm"
                to="/admin/dashboard"
                style={({ isActive }) => ({
                  color: isActive ? "pink" : "white",
                })}
              >
                Admin Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-pink-600 rounded-sm"
                to="/admin/categorylist"
                style={({ isActive }) => ({
                  color: isActive ? "pink" : "white",
                })}
              >
                Create Category
              </NavLink>
            </li>
            {/* <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-pink-600 rounded-sm"
                to="/admin/productlist"
                style={({ isActive }) => ({
                  color: isActive ? "pink" : "white",
                })}
              >
                Create Product
              </NavLink>
            </li> */}
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-pink-600 rounded-sm"
                to="/admin/allproductslist"
                style={({ isActive }) => ({
                  color: isActive ? "pink" : "white",
                })}
              >
                Manage Products
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-pink-600 rounded-sm"
                to="/admin/bloglist"
                style={({ isActive }) => ({
                  color: isActive ? "pink" : "white",
                })}
              >
                Manage Blogs
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-pink-600 rounded-sm"
                to="/admin/userlist"
                style={({ isActive }) => ({
                  color: isActive ? "pink" : "white",
                })}
              >
                Manage Users
              </NavLink>
            </li>
            <li>
              <NavLink
                className="list-item py-2 px-3 block mb-5 hover:bg-pink-600 rounded-sm"
                to="/admin/orderlist"
                style={({ isActive }) => ({
                  color: isActive ? "pink" : "white",
                })}
              >
                Manage Orders
              </NavLink>
            </li>
          </ul>
        </section>
      )}
    </>
  );
};

export default AdminMenu;
