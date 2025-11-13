import prisma from "../prisma/client.js";

export interface Review {
  ratings: {
    safety: number;
    services: number;
    atmosphere: number;
    cost_of_living: number;
  };
  comment?: string;
}

export const reviewRepo = {
  createReview: async (userId: number, districtId: number, review: Review) => {
    const createdReview = await prisma.ratings.create({
      data: {
        user_id: userId,
        district_id: districtId,
        ...review.ratings,
        comment: review.comment,
        created_at: new Date(),
        updated_at: new Date(),
      },
    });
    return createdReview;
  },

  getAllReviews: async (limit: number) => {
    const reviews = await prisma.ratings.findMany({
      take: limit,
      orderBy: {
        created_at: "desc",
      },
      include: {
        districts: {
          select: {
            title: true,
          },
        },
      },
    });
    return reviews;
  },

  getAllUserReviews: async (userId: number) => {
    const reviews = await prisma.ratings.findMany({
      where: { user_id: userId },
      include: {
        districts: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        updated_at: "desc",
      },
    });

    return reviews;
  },

  deleteReview: async (reviewId: number, userId: number, userRole: string) => {
    const review = await prisma.ratings.findUnique({
      where: { id: reviewId },
      select: { user_id: true },
    });

    if (!review) return { error: "not found" };

    if (review.user_id !== userId && userRole !== "admin") {
      return { error: "forbidden" };
    }

    const deleted = await prisma.ratings.delete({
      where: { id: reviewId },
    });

    return { deleted };
  },

  updateReviewComment: async (reviewId: number, newComment: string) => {
    const updated = await prisma.ratings.update({
      where: { id: reviewId },
      data: {
        comment: newComment,
      },
    });

    return { updated };
  },

  updateReview: async (reviewId: number, newReview: Review, userId: number) => {
    const review = await prisma.ratings.findUnique({
      where: { id: reviewId },
      select: { user_id: true },
    });

    if (!review) return { error: "not found" };

    if (review.user_id !== userId) {
      return { error: "forbidden" };
    }

    const updated = await prisma.ratings.update({
      where: { id: reviewId },
      data: {
        safety: newReview.ratings.safety,
        services: newReview.ratings.services,
        atmosphere: newReview.ratings.atmosphere,
        cost_of_living: newReview.ratings.cost_of_living,
        comment: newReview.comment,
      },
    });

    return { updated };
  },
};
