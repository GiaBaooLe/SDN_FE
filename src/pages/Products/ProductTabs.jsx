import { useEffect } from "react";
import { FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Spin, Alert, Form, Rate, Input, Button, Typography } from "antd";
import moment from "moment";

const { TextArea } = Input;
const { Title } = Typography;

const ProductTabs = ({
  loadingProductReview,
  userInfo,
  submitHandler,
  rating,
  setRating,
  comment,
  setComment,
  product,
}) => {
  useEffect(() => {
    if (userInfo) {
      setRating(0);
      setComment("");
    }
  }, [userInfo, setRating, setComment]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <Title level={2} className="mb-4">Reviews</Title>
      {product.reviews.length === 0 && <Alert message="No Reviews" type="info" showIcon />}
      <ul className="mb-6">
        {product.reviews.map((review) => (
          <li key={review._id} className="mb-4 border-b pb-4">
            <strong>{review.name}</strong>
            <div className="my-2">
              <Rate disabled defaultValue={review.rating} />
            </div>
            <p>{review.comment}</p>
            <p className="text-gray-500">{moment(review.createdAt).fromNow()}</p>
          </li>
        ))}
      </ul>
      <div>
        <Title level={2} className="mb-4 ">Write your Review</Title>
        {loadingProductReview && <Spin />}
        {userInfo ? (
          <Form onFinish={submitHandler} className="w-1/2 ">
            <Form.Item
              label="Rating"
              required
              rules={[{ required: true, message: "Please select a rating!" }]}
            >
              <Rate
                onChange={(value) => setRating(value)}
                value={rating}
              />
            </Form.Item>
            <Form.Item
              label="Comment"
              required
              rules={[{ required: true, message: "Please enter your comment!" }]}
            >
              <TextArea
                rows={4}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
            </Form.Item>
            <Form.Item >
              <Button type="primary" htmlType="submit" className="flex  justify-end bg-pink-400">
                Submit
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Alert
            message={
              <span>
                Please <Link to="/login">sign in</Link> to write a review
              </span>
            }
            type="warning"
            showIcon
          />
        )}
      </div>
    </div>
  );
};

export default ProductTabs;
