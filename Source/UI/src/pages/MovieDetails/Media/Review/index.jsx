import { useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';
import { AppContext } from '../../../../AppContext';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { JAVA_API } from "../../../../const/linkToResource";

const Review = ({ reviews }) => {
  const [review, setReview] = useState('');
  const { userData, isAuthenticated } = useContext(AppContext);
  const { id } = useParams();
  
  const handleReviewSubmit = async () => {
    if (!isAuthenticated) {
      toast.warning('You need to login to write a review');
      return;
    }

    // console.log("review", review);
    // console.log("review", id);

    if (review.length < 20) {
      toast.warning('Review must be at least 20 characters long');
      return;
    }

    const timeNow = new Date().toISOString();
    const reviewData = {
      author: userData.name,
      content: review,
      created_at: timeNow
    }

    try {
      // Call API to submit review
      const response = await axios.post(`${JAVA_API}/movies/${id}/reviews`, reviewData);
      console.log("review response", response);
      if (response.status == 200) {
        toast.success('Review submitted successfully');
        setTimeout(() => {
          window.location.reload();
        }, 2500);
      } else {
        toast.warning('Something went wrong while submitting review');
      }
    } catch (error) {
      toast.error('Failed to submit review');
    }
  };

  return (
    <div className="shadow-md w-full text-left mx-0 my-2">
      <div className="bg-white shadow-md rounded-lg p-2 w-full">
        <h2 className="text-xl font-bold my-2">Reviews</h2>
        <p className="text-sm text-gray-400 my-2">
          What do people say about this?
        </p>
        <ul className="space-y-4 mb-6">
          {reviews?.length > 0 &&
            reviews?.map((r) => (
              <ReviewCard
                author={r.author}
                content={r.content}
                createdAt={r.created_at}
              />
            ))}
        </ul>

        <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
        <textarea
          className="w-full h-24 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your review here..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        ></textarea>
        <button
          onClick={handleReviewSubmit}
          className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
        >
          Send Review
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
};

export default Review;
