import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ReviewsPage = () => {
  const { restaurantId } = useParams(); // Get the restaurantId from the URL
  const [restaurant, setRestaurant] = useState(null); // Restaurant details
  const [reviews, setReviews] = useState([]); // Reviews list
  const [newReview, setNewReview] = useState(''); // New review input
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch restaurant details and reviews
  useEffect(() => {
    const fetchRestaurantDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/restaurants/${restaurantId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch restaurant details');
        }
        const data = await response.json();
        console.log('Fetched data:', data); // Debugging log
        setRestaurant(data.restaurant);
        setReviews(data.reviews);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err.message);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRestaurantDetails();
  }, [restaurantId]);

  // Handle review submission
  const handleReviewSubmit = async () => {
    try {
      console.log('Submitting review:', { restaurantId, text: newReview }); // Debugging log
      const response = await fetch(`http://localhost:5000/api/reviews`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ restaurantId, text: newReview }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      const addedReview = await response.json();
      console.log('Received response:', addedReview); // Debugging log
      setReviews((prevReviews) => [...prevReviews, addedReview]); // Append new review to state
      setNewReview(''); // Clear the input
    } catch (error) {
      console.error('Error submitting review:', error.message);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container mt-4">
      <h2>{restaurant?.name}</h2>
      <p><strong>Cuisine:</strong> {restaurant?.cuisine}</p>
      <p><strong>Address:</strong> {restaurant?.address}</p>

      <h3>Reviews</h3>
      <ul className="list-group mb-4">
        {reviews.length > 0 ? (
          reviews.map((review, index) => (
            <li key={index} className="list-group-item">
              {review.text}
            </li>
          ))
        ) : (
          <p>No reviews yet. Be the first to leave one!</p>
        )}
      </ul>

      <h4>Leave a Review</h4>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
        />
      </div>
      <button
        className="btn btn-primary"
        onClick={handleReviewSubmit}
        disabled={!newReview.trim()} // Disable button if input is empty
      >
        Submit Review
      </button>
    </div>
  );
};

export default ReviewsPage;