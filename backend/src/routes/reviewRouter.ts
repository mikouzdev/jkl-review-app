import { type Review } from "../repos/reviewRepo.js"
import { type AuthenticatedRequest } from "../middleware/auth.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";
import { reviewRepo } from "../repos/reviewRepo.js";
import express, { type Request, type Response } from "express";

const router = express.Router();

// endpoint to get all reviews in a descending order latest first.
const MAX_REVIEWS_LIMIT = 50; // hard limit for amount of reviews returned
router.get("/", authenticate, requireAdmin, async (req: Request, res: Response) => {
    const limit = Number(req.query.limit);

    // validate limit query
    if (isNaN(limit) || limit <= 0) return res.status(400).send({ error: "invalid query" })
    if (limit > MAX_REVIEWS_LIMIT) return res.status(400).send({ error: "max limit exceeded" })

    const reviews = await reviewRepo.getAllReviews(limit);
    if (!reviews) return res.status(404).send({ error: "no reviews found" });

    return res.send({ reviews })
})

// endpoint to delete a review, requires user to be owner of the review, or admin.
router.delete("/:id", authenticate, async (req: AuthenticatedRequest, res: Response) => {
    const reviewId = Number(req.params.id);
    const userId = req.user?.userId;
    const userRole = req.user?.role;

    // validate
    if (userId === undefined) return res.status(400).send({ error: "missing user id" });
    if (userRole === undefined) return res.status(400).send({ error: "missing user role" });
    if (isNaN(reviewId)) return res.status(400).send({ error: "invalid id parameter" });

    const result = await reviewRepo.deleteReview(reviewId, userId, userRole)

    if (result.error === "not found") return res.status(404).send({ error: "review not found" });
    if (result.error === "forbidden") return res.status(403).send({ error: "forbidden" });

    res.send(result);
})

// admin only endpoint to update/change a reviews comment
router.patch("/:id", authenticate, requireAdmin, async (req: AuthenticatedRequest, res: Response) => {
    const reviewId = Number(req.params.id);
    const { comment } = req.body;

    //validate
    if (isNaN(reviewId) || reviewId < 0) return res.status(400).send({ error: "invalid review id" });
    if (comment === undefined) return res.status(400).send({ error: "comment undefined" })

    const result = await reviewRepo.updateReviewComment(reviewId, comment);
    if (!result) return res.status(500).send({ error: "unable to update comment" })
    res.send(result)
})

// endpoint for user to update their own review
const MAX_COMMENT_LENGTH = 100;
router.put("/:id", authenticate, async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    const reviewId = Number(req.params.id)
    const review: Review = req.body

    // validate
    if (userId === undefined) return res.status(401).send({ error: "missing user id" });
    if (isNaN(reviewId)) return res.status(400).send({ error: "invalid id parameter" });
    if (!review.ratings) return res.status(400).send({ error: "missing review body" });

    // validate that rating values are inside the constraints of 1-5
    for (const [key, value] of Object.entries(review.ratings)) {
        if (typeof value !== "number" || value < 1 || value > 5) {
            return res.status(400).send({ error: `invalid value for ${key}` })
        }
    }

    if (review.comment && review.comment?.length > MAX_COMMENT_LENGTH) return res.status(400).send({ error: "comment is too long" })

    const result = await reviewRepo.updateReview(reviewId, review, userId);

    if (result.error === "not found") return res.status(404).send({ error: "review not found" });
    if (result.error === "forbidden") return res.status(403).send({ error: "forbidden" });

    res.send(result)
})

// endpoint to get all own reviews
router.get("/me", authenticate, async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;

    if (userId === undefined) return res.status(401).send({ error: "missing user id" });

    const reviews = await reviewRepo.getAllUserReviews(userId)

    return res.send({ reviews })
})

export default router;