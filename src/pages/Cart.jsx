import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { addToCart, removeFromCart } from "../redux/features/cart/cartSlice";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }));
  };

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  return (
    <div className="mx-24">
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
      <div className="container flex flex-col lg:flex-row justify-around items-start mx-auto mt-44 p-4">
        {cartItems.length === 0 ? (
          <div className="text-center">
            Your cart is empty <Link to="/shop" className="text-pink-500">Go To Shop</Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col w-full lg:w-3/4 mb-8 lg:mb-0">
              <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>
              {cartItems.map((item) => (
                <div key={item._id} className="flex items-center mb-4 p-4 border rounded-lg shadow-sm bg-white">
                  <div className="w-20 h-20">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 ml-4">
                    <Link to={`/product/${item._id}`} className="text-pink-500 text-lg font-semibold">
                      {item.name}
                    </Link>
                    <div className="mt-2 text-gray-600">Brand: {item.brand}</div>
                    <div className="mt-2 text-gray-800 font-bold">
                      {item.price} VND
                    </div>
                  </div>
                  <div className="w-24">
                    <select
                      className="w-full p-1 border rounded text-black"
                      value={item.qty}
                      onChange={(e) =>
                        addToCartHandler(item, Number(e.target.value))
                      }
                    >
                      {[...Array(item.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button
                      className="text-red-500"
                      onClick={() => removeFromCartHandler(item._id)}
                    >
                      <FaTrash className="ml-4 mt-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="w-full lg:w-1/4 mt-12">
              <div className="p-4 rounded-lg border shadow-sm bg-white">
                <h2 className="text-xl font-semibold mb-2">
                  Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items
                </h2>
                <div className="text-2xl font-bold mb-4">
                  {cartItems.reduce((acc, item) => acc + item.qty * item.price, 0)} VND
                </div>
                <button
                  className="bg-pink-500 py-2 px-4 rounded-full text-lg w-full text-white hover:bg-pink-600 transition duration-300"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  Proceed To Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
