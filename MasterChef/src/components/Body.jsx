import React, { useState, useEffect } from "react";
import RestrauntCard, { withPromoted } from "./RestaurantCards";
import { Link } from "react-router-dom";
import { filterData } from "../utils/helper";
import Shimmer from "./Shimmer";

const Body = () => {
  const [allRestaurant, setAllRestaurant] = useState("");
  const [searchText, setSearchText] = useState("");
  const [filterdRestaurant, setFilterdRestaurant] = useState([]);
  const RestaurantCardPromoted = withPromoted(RestrauntCard);

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    try {
      const data = await fetch(
        "https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();
      console.log(json);

      //It may showing an error durimg data fatching because sometime data coming from cards[1] sometime cards[2] and different on other times so me make a function and check which value of i gives data in cards[i]
      async function checkJsonData(jsonData) {
        for (let i = 0; i < jsonData?.data?.cards.length; i++) {
          let checkData =
            json?.data?.cards[i]?.card?.card?.gridElements?.infoWithStyle
              ?.restaurants;

          // if checkData is not undefined then return it
          if (checkData !== undefined) {
            return checkData;
          }
        }
      }
      // call the checkJsonData() function which return Swiggy Restaurant data
      const resData = await checkJsonData(json);
      console.log(resData);

      // update the state variable restaurants with Swiggy API data
      setAllRestaurant(resData);
      setFilterdRestaurant(resData);
    } catch (error) {
      console.log(error);
    }
  };

  const filterTopRated = () => {
    const topRatedRestaurants = allRestaurant.filter((restaurant) => {
      return restaurant?.info?.avgRating > 4.2;
    });
    console.log(topRatedRestaurants);
    setFilterdRestaurant(topRatedRestaurants);
  };

  return allRestaurant?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="p-5 min-w-full  md:flex items-center justify-center ">
        <input
          type="text"
          className="Search-input border-2 border-black rounded-l-2xl h-[3rem] w-[15rem] p-5"
          data-testid="searchInput"
          placeholder="Search"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
        />

        <button
          className="p-3   bg-purple-600 text-white rounded-r-lg hover:bg-orange-500 hover:underline"
          onClick={() => {
            const data = filterData(searchText, allRestaurant);
            setFilterdRestaurant(data);
          }}
        >
          Search
        </button>
        <button
          className="p-3 ml-2 md:ml-5  bg-purple-600 text-white rounded-lg hover:bg-orange-500 hover:underline"
          onClick={filterTopRated}
        >
          Top Rated
        </button>
      </div>

      <div className="resturant-list flex flex-wrap items-center justify-center ">
        {filterdRestaurant?.length === 0 ? (
          <h1 className="text-6xl h-[30rem] flex items-center justify-center">
            No item matches your filter
          </h1>
        ) : (
          filterdRestaurant?.map((restaurant) => {
            return (
              <Link
                key={restaurant?.info.id}
                to={"/restaurant/" + restaurant?.info.id}
              >
                {
                  /**Promoted Logic*/

                  restaurant.info.promoted ? (
                    <RestaurantCardPromoted {...restaurant?.info} />
                  ) : (
                    <RestrauntCard {...restaurant?.info} />
                  )
                }
              </Link>
            );
          })
        )}
      </div>
    </>
  );
};

export default Body;
