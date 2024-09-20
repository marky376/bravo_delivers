// services/ReviewService.js
import Review from '../models/Review.js'; // Assuming you have a Review model

class ReviewService {
    // Add a new review
    static async addReview(reviewData) {
        const newReview = new Review(reviewData);
        return await newReview.save(); // Save the review to the database
    }

    // Get all reviews for a specific item
    static async getReviewsForItem(itemId) {
        return await Review.find({ itemId }); // Fetch reviews for a specific item
    }

}

export default ReviewService;
