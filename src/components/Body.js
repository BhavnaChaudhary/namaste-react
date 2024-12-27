import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () => {
//local State Variables - Super powerful variable
 const [listOfRestaurants, setListOfRestaurants] = useState([]);

 const [filteredRestaurant, setFilteredRestaurant] = useState([]);

 const [searchText, setSearchText] = useState("");  

 console.log("Body Rendered");

 useEffect(() => {
    fetchData();
    console.log("use effect called");
 });

 const fetchData = async () => {
    const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data.json();

    console.log(json);
    //optional chaining
    setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
 };

 // Conditional Rendering

    return listOfRestaurants?.length === 0 ? (
      <Shimmer/>
    ) : (
        <div className="body">
            <div className="filter">
                <div className="search">
                    <input type="text"
                     className="search-box" 
                     value={searchText} 
                     onChange={(e) => {
                        setSearchText(e.target.value);
                     }}/>
                    <button onClick={() => {
                        //filter the restaurant card and update the UI
                        //searchText
                        console.log(searchText);

                         const filteredRestaurant = listOfRestaurants?.filter((res) =>
                             res.info.name.toLowerCase().includes(searchText.toLowerCase()) 
                        );
                        setListOfRestaurants(filteredRestaurant) ;   

                    }}>Search</button> 
                </div>
                <button
                 className="filter-btn"
                 onClick={() => {
                  const filteredList = listOfRestaurants?.filter(
                    (res) => res.info.avgRating > 4
                  );
                    setListOfRestaurants(filteredList);
                  }}
                  >
                 Top Rated Restaurants
                 </button>
            </div>
            <div className="res-container">
                {filteredRestaurant?.map((restaurant) => (
                    <RestaurantCard key={restaurant.info.id}  resData={restaurant} />
                ))}
            </div>
        </div>
    );
};

export default Body;