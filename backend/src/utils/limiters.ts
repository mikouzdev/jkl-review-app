import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";

export const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
});

export const registerLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  limit: 15,
  standardHeaders: true,
  legacyHeaders: false,
});

// used for public gets of districts and reviews.
export const publicGetSlowdown = slowDown({
  windowMs: 1 * 60 * 1000,
  delayAfter: 30,
  delayMs: (hits) => hits * 200,
  maxDelayMs: 5000,
});

// used for public gets of districts and reviews, hard limit.
export const publicGetLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

// used for creating, updating and deleting review.
export const userActionLimiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  limit: 25,
  standardHeaders: true,
  legacyHeaders: false,
});
