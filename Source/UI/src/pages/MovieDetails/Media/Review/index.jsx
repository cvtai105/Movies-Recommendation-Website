import React from 'react';
import ReviewCard from './ReviewCard';

const Review = ({ reviews }) => {
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
        ></textarea>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
          Send Review
        </button>
      </div>
    </div>
  );
};

export default Review;
