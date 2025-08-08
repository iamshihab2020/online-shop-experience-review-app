import { useState, useEffect } from "react";
import ReviewForm from "./components/ReviewForm";
import ReviewList from "./components/ReviewList";

function App() {
  const [reviews, setReviews] = useState(() => {
    // Initialize state from localStorage
    const savedReviews = localStorage.getItem("shopReviews");
    return savedReviews ? JSON.parse(savedReviews) : [];
  });
  const [searchTerm, setSearchTerm] = useState("");

  // Save to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem("shopReviews", JSON.stringify(reviews));
  }, [reviews]);

  const addReview = (review) => {
    const newReview = {
      ...review,
      id: Date.now(),
      date: new Date().toLocaleString(),
    };
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  const updateReview = (updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === updatedReview.id ? updatedReview : review
      )
    );
  };

  const deleteReview = (id) => {
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== id)
    );
  };

  const filteredReviews = reviews.filter((review) =>
    review.shopName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-[#E0EDFF] w-full p-4 min-h-screen">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl lg:text-3xl my-6 font-bold lg:font-black text-center text-blue-600">
          Online Shop Reviews
        </h1>

        <ReviewForm onSubmit={addReview} />

        <div className="mb-6">
          <input
            type="text"
            placeholder="Search by shop name..."
            className="w-full p-3 bg-[#FAFBFD] border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <ReviewList
          reviews={filteredReviews}
          onUpdate={updateReview}
          onDelete={deleteReview}
        />
      </div>
    </div>
  );
}

export default App;
