import { FaStar } from "react-icons/fa";

const StarRating = ({ rating, onRatingChange, editable = true }) => {
  return (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => editable && onRatingChange(star)}
          className={`${
            editable
              ? "cursor-pointer hover:scale-110 transition-transform"
              : ""
          } ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
          disabled={!editable}
          aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
        >
          <FaStar size={24} />
        </button>
      ))}
    </div>
  );
};

export default StarRating;
