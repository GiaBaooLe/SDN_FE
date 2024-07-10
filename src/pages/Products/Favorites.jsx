import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favorites/favoriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);

  return (
    <div>
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
       <div className="ml-[10rem] mt-44">

      <h1 className="text-lg font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
    </div>
   
  );
};

export default Favorites;
