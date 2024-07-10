import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";
import React from "react";
import { Carousel, Card } from "antd";
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
      <div
        className="logo-container"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginTop: "90px",
        }}
      >
        <img className="logo" src="/src/assets/logo-concung.png" alt="logo" />
      </div>
      <Carousel afterChange={onChange} className="carousel">
        {[
          "carousel-1",
          "carousel-2",
          "carousel-3",
          "carousel-4",
          "carousel-6",
          "carousel-7",
          "carousel-8",
        ].map((image, index) => (
          <div key={index}>
            <img
              src={`/src/assets/${image}.png`}
              alt={image}
              className="carousel-image"
            />
          </div>
        ))}
      </Carousel>
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
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <Card
              hoverable
              style={{ width: 480, margin: 20 }}
              cover={<img src="/src/assets/review.png" alt="review" />}
            >
              <Meta
                avatar={
                  <img
                    className="logo"
                    src="/src/assets/logo-concung.png"
                    alt="logo"
                  />
                }
              />
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
          <div className="product-card">
            <div className="product-card-image-container">
              <img
                src="/src/assets/pink-panther.png"
                className="product-card-image"
                alt="pink-panther"
              />
            </div>
            <div className="product-card-info">
              <p className="product-card-title">asd</p>
              <p className="product-card-price">adfcadf</p>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
