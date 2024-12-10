import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const BrowseRestaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Mock restaurant data
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

    // Set mock data to state
    setRestaurants(mockRestaurants);
  }, []);

  // Filter restaurants based on search term
  const filteredRestaurants = restaurants.filter((restaurant) =>
    restaurant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <h2 className="text-center my-4">Browse Restaurants</h2>
      <input
        type="text"
        placeholder="Search for a restaurant..."
        className="form-control mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ul className="list-group">
        {filteredRestaurants.map((restaurant) => (
          <li key={restaurant.restaurant_id} className="list-group-item">
            <h4>{restaurant.name}</h4>
            <p>Cuisine: {restaurant.cuisine}</p>
            <p>Address: {restaurant.address}</p>
            <p>Rating: {restaurant.rating}</p>
            <button
              className="btn btn-primary mt-2"
              onClick={() => navigate(`/reviews/${restaurant.restaurant_id}`)}
            >
              View Reviews & Leave a Review
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BrowseRestaurants;