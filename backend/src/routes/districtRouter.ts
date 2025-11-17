import express, { type Request, type Response } from "express";
import { districtRepo } from "../repos/districtRepo.js";
import { authenticate } from "../middleware/auth.js";
import { type Review } from "../repos/reviewRepo.js";
import { type AuthenticatedRequest } from "../middleware/auth.js";
import { reviewRepo } from "../repos/reviewRepo.js";
import { publicGetLimiter, publicGetSlowdown, userActionLimiter } from "../utils/limiters.js";

const router = express.Router();

// endpoint to get all districts + ratings averages and count.
// GET: /districts + /districts?sort=
router.get("/", publicGetSlowdown, publicGetLimiter, async (req: Request, res: Response) => {
  const sort = req.query.sort as string | undefined;
  const districts = await districtRepo.getDistricts(sort);
  if (!districts) res.status(404).send({ error: "no districts found" });
  res.send({ districts });
});

// endpoint to get all reviews for a district
const MAX_REVIEW_AMOUNT = 25;
const DEFAULT_REVIEW_AMOUNT = 10;
router.get("/:id/reviews", publicGetSlowdown, publicGetLimiter, async (req: Request, res: Response) => {
  const districtId = Number(req.params.id);
  if (Number.isNaN(districtId) || districtId < 0) return res.status(400).send({ error: "invalid parameters" });

  // validate limit
  let limit = Number(req.query.limit);
  if (!limit || Number.isNaN(limit) || limit < 1) limit = DEFAULT_REVIEW_AMOUNT;
  limit = Math.min(limit, MAX_REVIEW_AMOUNT);

  // get reviews and respond
  const reviews = await districtRepo.getDistrictReviews(districtId, limit);
  if (!reviews) return res.status(404).send({ error: "district not found" });
  res.send({ reviews });
});

// endpoint to post a review to a district
router.post("/:id", authenticate, userActionLimiter, async (req: AuthenticatedRequest, res: Response) => {
  const review: Review = req.body;
  const districtId = Number(req.params.id);
  const userId = req.user?.userId; // user id from jwt token

  if (isNaN(districtId)) return res.status(400).send({ error: "invalid district id" });

  if (!userId) return res.status(401).send({ error: "unauthorized" });

  if (!review?.ratings) return res.status(400).send({ error: "missing ratings" });

  const { safety, services, atmosphere, cost_of_living } = review.ratings;

  if ([safety, services, atmosphere, cost_of_living].some((v) => v == null)) {
    return res.status(400).send({ error: "All rating fields are required" });
  }

  const existingReviews = await reviewRepo.getAllUserReviews(userId);
  if (existingReviews.some((review) => review.district_id === districtId)) {
    return res.status(400).send({ error: "user has already reviewed this district" });
  }

  const createdReview = await reviewRepo.createReview(userId, districtId, review);
  if (!createdReview) return res.status(500).send({ error: "could not create review" });

  return res.status(201).send({ review: createdReview });
});

export default router;
