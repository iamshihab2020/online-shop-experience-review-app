import { useState, useEffect } from "react";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";
import { FaTimes } from "react-icons/fa";

function App() {
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("shopReviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [ratingFilter, setRatingFilter] = useState(0);

  // Saving to localstorage
  useEffect(() => {
    localStorage.setItem("shopReviews", JSON.stringify(reviews));
  }, [reviews]);

  // Add a review
  const addReview = (review) => {
    const newReview = {
      ...review,
      id: Date.now(),
      date: new Date().toLocaleString(),
    };
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  // for update a review
  const updateReview = (updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
  };

  // delete a review
  const deleteReview = (id) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== id)
    );
  };

  // filtering functions
  const filteredReviews = reviews.filter((review) => {
    const matchesSearch = review.shopName
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesRating = ratingFilter === 0 || review.rating === ratingFilter;
    return matchesSearch && matchesRating;
  });

  return (
    <div className="bg-[#E0EDFF] w-full px-4 md:px-8 lg:px-10 py-5 min-h-screen overflow-y-hidden">
      <h1 className="text-2xl lg:text-3xl mb-6 font-bold md:font-black text-center text-blue-600">
        Online Shop Reviews
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 ">
        {/* Review Form */}
        <div className=" col-span-1 ">
          <ReviewForm onSubmit={addReview} />
        </div>

        {/* All Reviews */}
        <div className="col-span-2">
          {/* Filtering Section */}
          <div>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              {/* Filter by search */}
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by shop name..."
                  className="w-full p-3 bg-[#FAFBFD] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Dropdown for filter by star */}
              <div className="w-full md:w-48">
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(Number(e.target.value))}
                  className="w-full p-3 bg-[#FAFBFD] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value={0}>All Ratings</option>
                  <option value={5}>⭐⭐⭐⭐⭐ (5)</option>
                  <option value={4}>⭐⭐⭐⭐ (4)</option>
                  <option value={3}>⭐⭐⭐ (3)</option>
                  <option value={2}>⭐⭐ (2)</option>
                  <option value={1}>⭐ (1)</option>
                </select>
              </div>
            </div>

            {/* Clearing the filter */}
            {ratingFilter > 0 && (
              <div className="mb-4 flex items-center">
                <span className="text-sm font-medium text-gray-700 mr-2">
                  Showing {ratingFilter}-star reviews:
                </span>
                <button
                  onClick={() => setRatingFilter(0)}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  Clear filter <FaTimes />
                </button>
              </div>
            )}
          </div>

          <ReviewList
            reviews={filteredReviews}
            onUpdate={updateReview}
            onDelete={deleteReview}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
