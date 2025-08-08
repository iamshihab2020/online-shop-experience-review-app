import { useState } from "react";
import StarRating from "./StarRating";
import { FaEdit } from "react-icons/fa";

const ReviewList = ({ reviews, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editedShopName, setEditedShopName] = useState("");
  const [editedReviewText, setEditedReviewText] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  const handleEditClick = (review) => {
    setEditingId(review.id);
    setEditedShopName(review.shopName);
    setEditedReviewText(review.reviewText);
    setEditedRating(review.rating);
  };

  const handleSave = (review) => {
    if (
      !editedShopName.trim() ||
      !editedReviewText.trim() ||
      editedRating === 0
    ) {
      alert("Please fill all fields");
      return;
    }

    onUpdate({
      ...review,
      shopName: editedShopName,
      reviewText: editedReviewText,
      rating: editedRating,
      date: new Date().toLocaleString(),
    });
    setEditingId(null);
  };

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl shadow border border-gray-100">
        <p className="text-gray-500 text-lg">
          No reviews found. Be the first to share your experience!
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-5 rounded-xl shadow-md border border-gray-100 h-full lg:max-h-[72vh] lg:overflow-y-scroll">
      <h2 className="text-xl font-semibold text-gray-800 mb-5">
        Customer Reviews ({reviews.length})
      </h2>
      <div className="space-y-5">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="p-5 rounded-lg border border-gray-200 bg-gray-50"
          >
            {/* * Editing Mode */}
            {editingId === review.id ? (
              <>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Shop Name <span className="text-red-700 text-xl">*</span>
                  </label>
                  <input
                    type="text"
                    value={editedShopName}
                    onChange={(e) => setEditedShopName(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Rating <span className="text-red-700 text-xl">*</span>
                  </label>
                  <StarRating
                    rating={editedRating}
                    onRatingChange={setEditedRating}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 mb-2 font-medium">
                    Review <span className="text-red-700 text-xl">*</span>
                  </label>
                  <textarea
                    value={editedReviewText}
                    onChange={(e) => setEditedReviewText(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    required
                  ></textarea>
                </div>

                <div className="flex space-x-3">
                  <button
                    onClick={() => handleSave(review)}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition duration-200"
                  >
                    Save Changes
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="flex-1 bg-gray-500 hover:bg-gray-600 text-white py-2 rounded-lg transition duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              // * View Mode
              <>
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      {review.shopName}
                    </h3>
                    <div className="mt-1 flex items-center">
                      <StarRating rating={review.rating} editable={false} />
                      <span className="ml-2 text-gray-600 text-sm">
                        {review.rating}/5
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditClick(review)}
                      className="flex items-center gap-x-1.5 font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-200"
                    >
                      <FaEdit />
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(review.id)}
                      className="text-red-600 hover:text-red-800 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p className="mt-4 text-gray-700 whitespace-pre-line">
                  {review.reviewText}
                </p>

                <p className="mt-3 text-gray-500 text-sm">
                  Reviewed on: {review.date}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewList;
