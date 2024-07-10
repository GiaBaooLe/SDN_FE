import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useLogoutMutation } from "../../src/redux/api/usersApiSlice";
import { logout } from "../../src/redux/features/auth/authSlice";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import { Carousel, Card, Row, Col } from "antd";
import {
  AiOutlineHome,
  AiOutlineShopping,
  AiOutlineLogin,
  AiOutlineUserAdd,
  AiOutlineShoppingCart,
  AiFillBook,
} from "react-icons/ai";
import { FaHeart } from "react-icons/fa";
import { CheckCircleOutlined } from "@ant-design/icons";
import FavoritesCount from "./Products/FavoritesCount";
import "./Auth/Navigation.css";
import "./Home.css";
import Footer from "./Footer";

const { Meta } = Card;

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  const { userInfo } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };

  return (
    <>
      {!keyword ? <Header /> : null}
      {isLoading ? (
        <Loader />
      ) : isError ? (
        <Message variant="danger">
          {isError?.data.message || isError.error}
        </Message>
      ) : (
        <>
          <div className="top-banner">
            <img
              className="top-banner-image"
              src="/src/assets/banner.png"
              alt="banner"
            />
          </div>

          <div className="navigation-horizontal">
            <div className="flex justify-between p-4 text-white font-bold bg-pink-600 w-full">
              <div className="flex space-x-4">
                <Link
                  to="/"
                  className="flex items-center transition-transform transform hover:translate-y-2"
                >
                  <AiOutlineHome className="mr-2" size={26} />
                  <span className="nav-item-name">HOME</span>
                </Link>
                <Link
                  to="/blog"
                  className="flex items-center transition-transform transform hover:translate-y-2"
                >
                  <AiFillBook className="mr-2" size={26} />
                  <span className="nav-item-name">BLOG</span>
                </Link>
                <Link
                  to="/shop"
                  className="flex items-center transition-transform transform hover:translate-y-2"
                >
                  <AiOutlineShopping className="mr-2" size={26} />
                  <span className="nav-item-name">SHOP</span>
                </Link>
                <Link
                  to="/cart"
                  className="flex relative items-center transition-transform transform hover:translate-y-2"
                >
                  <AiOutlineShoppingCart className="mr-2" size={26} />
                  <span className="nav-item-name">Cart</span>
                  {cartItems.length > 0 && (
                    <span className="absolute top-0 right-0 px-1 py-0 text-sm text-black bg-pink-500 rounded-full">
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </span>
                  )}
                </Link>
                <Link
                  to="/favorite"
                  className="flex items-center transition-transform transform hover:translate-y-2"
                >
                  <FaHeart className="mr-2" size={20} />
                  <span className="nav-item-name">Favorites</span>
                  <FavoritesCount />
                </Link>
              </div>
              <div className="flex items-center">
                {userInfo ? (
                  <div className="relative">
                    <button
                      onClick={toggleDropdown}
                      className="flex items-center text-gray-800 focus:outline-none"
                    >
                      <span className="text-white">{userInfo.username}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-4 w-4 ml-1 ${
                          dropdownOpen ? "transform rotate-180" : ""
                        }`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                        />
                      </svg>
                    </button>
                    {dropdownOpen && (
                      <ul className="absolute right-0 mt-2 space-y-2 bg-pink-400 text-white">
                        {userInfo.isAdmin && (
                          <>
                            <li>
                              <Link
                                to="/admin/dashboard"
                                className="block px-4 py-2 hover:bg-pink-500"
                              >
                                Dashboard
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/manageblog"
                                className="block px-4 py-2 hover:bg-pink-500"
                              >
                                Blog
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/productlist"
                                className="block px-4 py-2 hover:bg-pink-500"
                              >
                                Products
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/categorylist"
                                className="block px-4 py-2 hover:bg-pink-500"
                              >
                                Category
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/orderlist"
                                className="block px-4 py-2 hover:bg-pink-500"
                              >
                                Orders
                              </Link>
                            </li>
                            <li>
                              <Link
                                to="/admin/userlist"
                                className="block px-4 py-2 hover:bg-pink-500"
                              >
                                Users
                              </Link>
                            </li>
                          </>
                        )}
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-pink-500"
                          >
                            Profile
                          </Link>
                        </li>
                        <li>
                          <button
                            onClick={logoutHandler}
                            className="block w-full px-4 py-2 text-left hover:bg-pink-500"
                          >
                            Logout
                          </button>
                        </li>
                      </ul>
                    )}
                  </div>
                ) : (
                  <div className="flex space-x-4">
                    <Link
                      to="/login"
                      className="flex items-center transition-transform transform hover:translate-y-2"
                    >
                      <AiOutlineLogin className="mr-2" size={26} />
                      <span className="nav-item-name">LOGIN</span>
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center transition-transform transform hover:translate-y-2"
                    >
                      <AiOutlineUserAdd size={26} />
                      <span className="nav-item-name">REGISTER</span>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="container_2">
            {/* Logo */}
            <div
              className="logo-container"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <img
                className="logo"
                src="/src/assets/logo-concung.png"
                alt="logo"
              />
            </div>

            <Carousel afterChange={onChange} className="carousel">
              <div>
                <img
                  src="/src/assets/carousel-1.png"
                  alt="carousel-1"
                  className="carousel-image"
                />
              </div>
              <div>
                <img
                  src="/src/assets/carousel-2.png"
                  alt="carousel-2"
                  className="carousel-image"
                />
              </div>
              <div>
                <img
                  src="/src/assets/carousel-3.png"
                  alt="carousel-3"
                  className="carousel-image"
                />
              </div>
              <div>
                <img
                  src="/src/assets/carousel-4.png"
                  alt="carousel-4"
                  className="carousel-image"
                />
              </div>
              <div>
                <img
                  src="/src/assets/carousel-6.png"
                  alt="carousel-6"
                  className="carousel-image"
                />
              </div>
              <div>
                <img
                  src="/src/assets/carousel-8.png"
                  alt="carousel-8"
                  className="carousel-image"
                />
              </div>
            </Carousel>

            {/* Card */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginTop: "20px",
              }}
            >
              <Card
                hoverable
                style={{ width: 480, margin: 20 }}
                cover={<img src="/src/assets/review.png" alt="review" />}
              >
                <div style={{ marginTop: "10px" }}>
                  <Row gutter={[16, 16]}>
                    <Col span={8} style={{ textAlign: "left" }}>
                      <div>
                        <CheckCircleOutlined /> Content 1
                      </div>
                      <div>
                        <CheckCircleOutlined /> Content 2
                      </div>
                      <div>
                        <CheckCircleOutlined /> Content 3
                      </div>
                    </Col>
                    <Col span={8} style={{ textAlign: "right" }}>
                      <div>
                        <CheckCircleOutlined /> Content 4
                      </div>
                      <div>
                        <CheckCircleOutlined /> Content 5
                      </div>
                      <div>
                        <CheckCircleOutlined /> Content 6
                      </div>
                    </Col>
                    <Col span={8} style={{ textAlign: "right" }}>
                      <div>
                        <CheckCircleOutlined /> Content 7
                      </div>
                      <div>
                        <CheckCircleOutlined /> Content 8
                      </div>
                      <div>
                        <CheckCircleOutlined /> Content 9
                      </div>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>

            <div className="special-products-header">
              <h1 className="special-products-title">Special Products</h1>
              <Link to="/shop" className="shop-link">
                Shop
              </Link>
            </div>

            <div className="product-card">
              <div className="product-card-image-container">
                <img
                  src="/src/assets/pink-panther.png"
                  className="product-card-image"
                />
              </div>
              <div className="product-card-info">
                <p className="product-card-title">asd</p>
                <p className="product-card-price">adfcadf</p>
              </div>
            </div>
          </div>
        </>
      )}

      <Footer />
    </>
  );
};

export default Home;
