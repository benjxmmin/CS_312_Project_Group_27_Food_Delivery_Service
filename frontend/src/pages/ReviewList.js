import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ReviewList = ({ restaurantId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/reviews/${restaurantId}`);
        setReviews(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching reviews:', error);
        setLoading(false);
      }
    };
    fetchReviews();
  }, [restaurantId]);

  if (loading) {
    return <div>Loading reviews...</div>;
  }

  return (
    <div>
      <h3>Reviews</h3>
      {reviews.length === 0 ? (
        <p>No reviews yet. Be the first to write one!</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review.review_id}>
              <strong>Rating: {review.rating} / 5</strong>
              <p>{review.review_text}</p>
              <small>Reviewed by User ID: {review.user_id}</small>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;