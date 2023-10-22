import { useParams } from "react-router-dom";
import { addItem } from "../utils/cartSlice.js";
import { useDispatch } from "react-redux";
import {
  swiggy_menu_api_URL,
  IMG_CDN_URL,
  MENU_ITEM_TYPE_KEY,
  RESTAURANT_TYPE_KEY,
  ITEM_IMG_CDN_URL,
} from "../utils/Constant";
import Shimmer from "./Shimmer";
import useRestaurant from "../utils/useRestaurant"; // imported custom hook useResMenuData which gives restaurant Menu data from swigy api

const RestaurantMenu = () => {
  const { resId } = useParams(); // call useParams and get value of restaurant id using object destructuring
  const [restaurant, menuItems] = useRestaurant(
    swiggy_menu_api_URL,
    resId,
    RESTAURANT_TYPE_KEY,
    MENU_ITEM_TYPE_KEY
  );
  console.log(menuItems);
  console.log(restaurant);

  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    //ON click dispatch an action
    dispatch(addItem(item));
  };

  return !restaurant ? (
    <Shimmer />
  ) : (
    <div className="restaurant-menu  p-3 min-h-screen w-auto text-white ">
      <div className="restaurant-summary flex h-52 justify-center align-middle overflow-y-hidden bg-black  ">
        <img
          className="restaurant-img w-64 h-44 border-r-4  mt-4 rounded-xl"
          src={IMG_CDN_URL + restaurant?.cloudinaryImageId}
          alt={restaurant?.name}
        />
        <div>
          <div className="restaurant-summary-details flex flex-col m-5">
            <h2 className="restaurant-title text-2xl max-w-lg text-opacity-70 ">
              {restaurant?.name}
            </h2>
            <p className="restaurant-tags flex-nowrap opacity-70 text-base max-w-lg ">
              {restaurant?.cuisines?.join(", ")}
            </p>
          </div>
          <div className="ml-8">
            <span className="flex flex-wrap ">
              <div className="m-1 justify-center">
                {restaurant?.avgRating < 4.2 ? (
                  <h4 className="heading pt-0 pr-5 text-base w-12 h-6 bg-red-600 text-white font-medium rounded-md">
                    ⭐{restaurant?.avgRating}
                  </h4>
                ) : (
                  <h4 className="heading pt-0 pr-5 text-base w-12 h-6 bg-green-600 text-white font-medium rounded-md">
                    ⭐{restaurant?.avgRating}
                  </h4>
                )}
              </div>
              <h2 className="justify-center m-1">|</h2>
              <h4 className="heading text-sm justify-center text-white font-bold m-1.5">
                {" "}
                16 min
              </h4>
              <h2 className="justify-center m-1">|</h2>
              <h4 className="heading text-sm justify-center text-white font-bold m-1.5">
                {" "}
                {`₹${restaurant?.costForTwo / 100}` ?? "₹200 for two"}
              </h4>
            </span>
          </div>
        </div>
      </div>

      <div className="restaurant-menu-content flex justify-center  ">
        <div className="menu-items-container mt-2 max-w-3xl overflow-y-scroll h-[30rem] p-10 ">
          <div className="menu-title-wrap p-5">
            <h3 className="menu-title text-zinc-600">Recommended </h3>
            <p className="menu-count mt-2 text-black  ">
              {menuItems?.length} ITEMS
            </p>
          </div>
          <div className="menu-items-list flex justify-between flex-col mb-15">
            {menuItems.map((item) => (
              <div
                data-testid="foodItems"
                className="menu-item flex flex-col m-3 gap-y-3 w-full md:w-[35rem]"
                key={item?.id}
              >
                <div className="flex m-2 justify-between">
                  <div className="menu-item-details w-[15rem] ml-2">
                    <h3 className="item-title   flex flex-initial overflow-hidden text-2xl text-black">
                      {item?.name}
                    </h3>

                    <p className="text-black w-[15rem]  md:w-[20rem]">
                      {item?.description}
                    </p>
                    <div className="item cost flex justify-start text-black w-[25rem]">
                      {`₹${item?.price > 0 ? item?.price / 100 : 100}`}
                    </div>
                    <p className="text-black">
                      {item.isVeg == 1 ? (
                        <span className="text-green-400">●</span>
                      ) : (
                        <span className="text-red-500">●</span>
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col items-center justify-center right-0">
                    {item?.imageId && (
                      <img
                        className="menu-item-img h-[15rem] w-[15rem] md:h-[10rem] md:w-[10rem] p-5 rounded-3xl"
                        src={ITEM_IMG_CDN_URL + item?.imageId}
                        alt={item?.name}
                      />
                    )}
                    <div className="-translate-y-10">
                      <button
                        className="add-btn  bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded"
                        onClick={() => handleAddItem(item)}
                      >
                        ADD+
                      </button>
                    </div>
                  </div>
                </div>
                <hr className="h-[0.1rem] rounded-2xl my-2 bg-black border-0 dark:bg-blue-300"></hr>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;
