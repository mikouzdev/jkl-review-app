import prisma from "../prisma/client.js";

export interface Review {
    ratings: {
        safety: number,
        services: number,
        atmosphere: number,
        cost_of_living: number
    },
    comment?: string
}

export const reviewRepo = {
    createReview: async (userId: number, districtId: number, review: Review) => {
        const createdReview = await prisma.ratings.create({
            data: {
                user_id: userId,
                district_id: districtId,
                ...review.ratings,
                comment: review.comment,
                created_at: new Date()
            }
        })
        return createdReview;
    }
}