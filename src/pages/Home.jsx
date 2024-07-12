import { Link, useParams } from "react-router-dom";
import { useGetProductsQuery } from "../redux/api/productApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Header from "../components/Header";
import Product from "./Products/Product";

import { Carousel, Card } from "antd";

import "./Home.css";
import TawkToChat from "../components/TawkToChat";

const { Meta } = Card;

const Home = () => {
  const { keyword } = useParams();
  const { data, isLoading, isError } = useGetProductsQuery({ keyword });

  const onChange = (currentSlide) => {
    console.log(currentSlide);
  };
  return (
    <div className="container mx-12">
     
     <div className=" p-3 mt-36">
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
     </div>
     <div>

      
     </div>
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
            <div className="w-full bg-white  flex justify-center  pt-2 pb-3">
              <img
                className="t logo"
                src="/src/assets/logo-concung.png"
                alt="logo"
              />
            </div>
          </div>

          
          <div className="special-products-header">
            <h1 className="special-products-title">Special Products</h1>
            <Link to="/shop" className="shop-link">
              Shop
            </Link>
          </div>
          <div className="products-container">
            <div className="products-grid  ">
              {data.products.map((product) => (
                <div key={product._id} className="product-item">
                  <Product product={product} />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
