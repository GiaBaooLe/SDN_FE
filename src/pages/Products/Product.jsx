import { Link } from "react-router-dom";
import HeartIcon from "./HeartIcon";

const Product = ({ product }) => {
  return (
    <div className="w-[30rem] ml-[2rem] p-3">
      <div className="relative bg-white rounded-lg shadow-md border dark:bg-white dark:border-gray-700 ">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-t-lg"
          />
          <HeartIcon product={product} className="absolute top-2 right-2" />
        </div>
        <div className="p-4">
          <Link to={`/product/${product._id}`}>
            <h2 className="flex justify-between items-center">
              <div className="text-lg text-black font-semibold ">
                {product.name}
              </div>
              <span className="bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
                ${product.price}
              </span>
            </h2>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Product;
