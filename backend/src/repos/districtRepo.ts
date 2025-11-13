import prisma from "../prisma/client.js";

export const districtRepo = {
  getDistricts: async (sort?: string) => {
    const districts = await prisma.districts.findMany({
      include: {
        ratings: {
          select: {
            safety: true,
            services: true,
            atmosphere: true,
            cost_of_living: true,
          },
        },
      },
    });

    const data = districts.map((district) => {
      const ratings = district.ratings;
      const ratingCount = ratings.length;

      // if no reviews
      if (ratingCount === 0) {
        return {
          id: district.id,
          title: district.title,
          longitude: district.longitude,
          latidude: district.latitude,
          avg_safety: null,
          avg_services: null,
          avg_atmosphere: null,
          avg_cost_of_living: null,
          avg_overall: null,
          rating_count: 0,
        };
      }

      // helper to calculate averages
      const avg = (key: keyof (typeof ratings)[0]) =>
        ratings.reduce((sum, rating) => sum + rating[key], 0) / ratingCount;

      const avg_safety = avg("safety");
      const avg_services = avg("services");
      const avg_atmosphere = avg("atmosphere");
      const avg_cost_of_living = avg("cost_of_living");
      const avg_overall = (avg_safety + avg_services + avg_atmosphere + avg_cost_of_living) / 4;

      return {
        id: district.id,
        title: district.title,
        longitude: district.longitude,
        latidude: district.latitude,
        avg_safety,
        avg_services,
        avg_atmosphere,
        avg_cost_of_living,
        avg_overall,
        rating_count: ratingCount,
      };
    });

    // query parameters
    const parameters = ["safety", "services", "atmosphere", "cost_of_living", "overall"];

    if (sort && parameters.includes(sort)) {
      const sortKey = `avg_${sort}` as keyof (typeof data)[0];
      data.sort((a, b) => Number(b[sortKey] ?? 0) - Number(a[sortKey] ?? 0));
    }

    return data;
  },

  getDistrictReviews: async (districtId: number, limit: number) => {
    const district = await prisma.districts.findUnique({
      where: { id: districtId },
      include: {
        ratings: {
          take: limit, // limit amount returned
          orderBy: { id: "desc" }, // newest first
          select: {
            id: true,
            user_id: true,
            safety: true,
            services: true,
            atmosphere: true,
            cost_of_living: true,
            comment: true,
            created_at: true,
          },
        },
      },
    });

    if (!district) return null;

    const ratings = district.ratings;
    const count = ratings.length;

    if (count === 0) {
      return {
        id: district.id,
        title: district.title,
        avg_safety: null,
        avg_services: null,
        avg_atmosphere: null,
        avg_cost_of_living: null,
        rating_count: 0,
        reviews: [],
      };
    }

    const avg = (key: keyof (typeof ratings)[0]) =>
      ratings.reduce((sum, r) => {
        const value = r[key];
        return sum + (typeof value === "number" && value !== null ? value : 0);
      }, 0) / count;

    const avg_safety = avg("safety");
    const avg_services = avg("services");
    const avg_atmosphere = avg("atmosphere");
    const avg_cost_of_living = avg("cost_of_living");
    const avg_overall = (avg_safety + avg_services + avg_atmosphere + avg_cost_of_living) / 4;

    return {
      id: district.id,
      title: district.title,
      avg_safety,
      avg_services,
      avg_atmosphere,
      avg_cost_of_living,
      avg_overall,
      rating_count: count,
      reviews: ratings,
    };
  },
};
