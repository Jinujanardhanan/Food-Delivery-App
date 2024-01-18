import RestaurantCard from "./RestaurantCard";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";

const Body = () =>{
  const [listOfRestaurants,setListOfRestaurant] = useState([]);
  const [filteredRestaurant,setFilteredRestaurant] = useState([]);

  const [searchText,setSearchText] = useState("");


  useEffect(() =>{
    fetchData()
  },[]);

  const fetchData = async ()=>{
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=9.994867&lng=76.309379&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")

    const json= await data.json();
    
    setListOfRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
  };

  return listOfRestaurants.length == 0 ? <Shimmer/> :(
    <div className="body">
      <div className="filter" >
        <div className="search">
          <input type="text" className="search-box" value={searchText} 
          onChange={(e) =>{
            setSearchText(e.target.value)
            }} />
          <button onClick={()=>{
            const filteredRestaurant = listOfRestaurants.filter (
              (res) => res.info.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredRestaurant(filteredRestaurant);
          }}>Search</button>
         </div>

       <button className="filter-btn"
       onClick={() =>{
        const filterdList = listOfRestaurants.filter(
          (res) => res.info.avgRating > 4.5
        );
        setListOfRestaurant(filterdList);
       }}
       >Top Rated Restaurant</button>
      </div>
      <div className="res-container">
      {
       filteredRestaurant.map(restaurants => <RestaurantCard key={restaurants.info.id} resData ={restaurants}/>)
      } 
      </div>
    </div>
  )
};

export default Body;