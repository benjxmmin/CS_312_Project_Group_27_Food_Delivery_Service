import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import ReviewForm from '../pages/ReviewForm';
import ReviewList from '../pages/ReviewList';
import 'bootstrap/dist/css/bootstrap.min.css';

const BrowseRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRestaurantId, setSelectedRestaurantId] = useState(null);

  useEffect(() => {
    const mockRestaurants = [
      {
        restaurant_id: 1,
        name: 'Pasta Palace',
        cuisine: 'Italian',
        address: '123 Main St, Cityville',
        rating: 4.5,
      },
      {
        restaurant_id: 2,
        name: 'Burger Barn',
        cuisine: 'American',
        address: '456 Central Ave, Townsville',
        rating: 4.0,
      },
      {
        restaurant_id: 3,
        name: 'Sushi Spot',
        cuisine: 'Japanese',
        address: '789 Maple Rd, Metropolis',
        rating: 4.8,
      },
    ];

    setRestaurants(mockRestaurants);
  }, []);

  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h2>Browse Restaurants</h2>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ul>
        {filteredRestaurants.map((restaurant) => (
          <li key={restaurant.restaurant_id}>
            <h3>{restaurant.name}</h3>
            <p>Cuisine: {restaurant.cuisine}</p>
            <p>Address: {restaurant.address}</p>
            <p>Rating: {restaurant.rating}</p>
            <button onClick={() => setSelectedRestaurantId(restaurant.restaurant_id)}>
              View Reviews & Leave a Review
            </button>
            {selectedRestaurantId === restaurant.restaurant_id && (
              <div>
                <ReviewForm restaurantId={restaurant.restaurant_id} />
                <ReviewList restaurantId={restaurant.restaurant_id} />
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrowseRestaurants;