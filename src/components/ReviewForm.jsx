import { useState } from "react";
import StarRating from "./StarRating";
import { FaCheck } from "react-icons/fa";

const ReviewForm = ({ onSubmit }) => {
  const [shopName, setShopName] = useState("");
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!shopName.trim()) {
      alert("Please enter a shop name");
      return;
    }

    if (!reviewText.trim()) {
      alert("Please enter your review");
      return;
    }

    if (rating === 0) {
      alert("Please select a rating");
      return;
    }

    onSubmit({ shopName, reviewText, rating });
    setShopName("");
    setReviewText("");
    setRating(0);
  };

  return (
    <div className="bg-[#FAFBFD] p-5  mb-8 border border-gray-100 rounded-2xl shadow-md">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">
        Share Your Experience
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Shop Name <span className="text-red-700 text-xl">*</span>
          </label>
          <input
            type="text"
            value={shopName}
            onChange={(e) => setShopName(e.target.value)}
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
            placeholder="Enter shop name"
            required
          />
        </div>

        <div>
          <label className="block  mb-2 font-medium text-gray-700">
            Rating <span className="text-red-700 text-xl">*</span>
          </label>
          <StarRating rating={rating} onRatingChange={setRating} />
          <div className="text-sm text-gray-500 mt-1">
            {rating > 0
              ? `Selected: ${rating} star${rating > 1 ? "s" : ""}`
              : "Select your rating"}
          </div>
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Review <span className="text-red-700 text-xl">*</span>
          </label>
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            className="w-full p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-300"
            rows="4"
            placeholder="Share your shopping experience..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center gap-2 w-full py-3 text-white font-medium  bg-blue-600 hover:bg-blue-700  rounded-lg transition duration-200"
        >
          <FaCheck />
          Submit Review
        </button>
      </form>
    </div>
  );
};

export default ReviewForm;
