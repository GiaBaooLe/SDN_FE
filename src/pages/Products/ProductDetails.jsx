import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import { FaBox, FaClock, FaStore } from "react-icons/fa";
import moment from "moment";
import HeartIcon from "./HeartIcon";

import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { Button, Typography, Select } from "antd";

const { Title, Paragraph } = Typography;
const { Option } = Select;

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingProductReview }] =
    useCreateReviewMutation();

  const submitHandler = async () => {
    try {
      await createReview({ productId, rating, comment }).unwrap();
      refetch();
      toast.success("Review created successfully");
      setRating(0);
      setComment("");
    } catch (error) {
      toast.error(error?.data || error.message);
    }
  };

  const addToCartHandler = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  return (
    <div className="mx-16">
      <div className="top-banner">
        <img
          className="top-banner-image"
          src="/src/assets/banner.png"
          alt="banner"
        />
        <div className="w-full bg-white flex justify-center pt-2 pb-3">
          <img
            className="t logo"
            src="/src/assets/logo-concung.png"
            alt="logo"
          />
        </div>
      </div>
      <div className="my-4 mt-44">
        <Link to="/" className="text-blue-500 hover:underline mt-44 mx-28">
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-wrap items-center mt-6">
            <div className="w-full md:w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full rounded-lg shadow-md"
              />
              <HeartIcon product={product} />
            </div>

            <div className="w-full md:w-1/2 pl-6">
              <Title level={2}>{product.name}</Title>
              <Paragraph className="text-gray-700">
                {product.description}
              </Paragraph>
              <Title level={3} className="text-red-500">
                $ {product.price}
              </Title>

              <div className="flex flex-col md:flex-row md:justify-between my-4">
                <div className="mb-4">
                  <h1 className="flex items-center mb-2">
                    <FaStore className="mr-2 text-black" /> Brand:{" "}
                    {product.brand}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaClock className="mr-2 text-black" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaStore className="mr-2 text-black" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>
                <div className="mb-4">
                  <h1 className="flex items-center mb-2">
                    <FaStore className="mr-2 text-black" /> Ratings:{" "}
                    {product.rating}
                  </h1>
                  <h1 className="flex items-center mb-2">
                    <FaBox className="mr-2 text-black" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              {userInfo && !userInfo.isAdmin && (
                <>
                  {product.countInStock > 0 ? (
                    <div className="flex items-center justify-center">
                      <Select
                        value={qty}
                        onChange={(value) => setQty(value)}
                        className="w-24 mr-4"
                      >
                        {[...Array(product.countInStock).keys()].map((x) => (
                          <Option key={x + 1} value={x + 1}>
                            {x + 1}
                          </Option>
                        ))}
                      </Select>
                      <Button
                        className="bg-pink-400"
                        type="primary"
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                      >
                        Add To Cart
                      </Button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <Button
                        className="bg-gray-500 text-white"
                        type="primary"
                        disabled
                      >
                        Out of Stock
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="w-full mt-8">
              <ProductTabs
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductDetails;
