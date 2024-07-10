import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import React from "react";
import { Carousel, Card, Button, Row, Col } from "antd";
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  CheckCircleOutlined,
} from "@ant-design/icons";
import "./Home.css";

const { Meta } = Card;

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

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

          <div
            className="logo-container"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "90px",
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
                src="/src/assets/carousel-7.png"
                alt="carousel-7"
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

          <div className="products-container">
            <div className="products-grid">
              {data.products.map((product) => (
                <div key={product._id} className="product-item">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
