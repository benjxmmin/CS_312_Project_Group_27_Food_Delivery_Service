import React, { useState } from 'react';
import axios from 'axios';

const ReviewForm = ({ restaurantId }) => {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/reviews', {
        user_id: 1, // Hardcoded user_id for now; replace this with actual user information later
        restaurant_id: restaurantId,
        rating,
        review_text: reviewText,
      });
      alert('Review submitted successfully!');
      setRating(0);
      setReviewText('');
    } catch (error) {
      console.error('Error submitting review:', error);
      alert('Error submitting review. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Leave a Review</h3>
      <div>
        <label>Rating: </label>
        <select value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>
          <option value={0}>Select a rating</option>
          <option value={1}>1 - Poor</option>
          <option value={2}>2 - Fair</option>
          <option value={3}>3 - Good</option>
          <option value={4}>4 - Very Good</option>
          <option value={5}>5 - Excellent</option>
        </select>
      </div>
      <div>
        <label>Review:</label>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows="4"
          placeholder="Write your review here"
        />
      </div>
      <button type="submit">Submit Review</button>
    </form>
  );
};

export default ReviewForm;