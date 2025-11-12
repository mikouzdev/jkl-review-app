import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  //   await seedDistricts();
  //   await seedRatings();
}

async function seedDistricts() {
  await prisma.districts.deleteMany();

  await prisma.districts.createMany({
    data: [
      { title: "Keskusta" },
      { title: "Kypärämäki-Kortepohja" },
      { title: "Lohikoski-Seppälänkangas" },
      { title: "Huhtasuo" },
      { title: "Kuokkala" },
      { title: "Keltinmäki-Myllyjärvi" },
      { title: "Keljo" },
      { title: "Halssila" },
      { title: "Säynätsalo" },
      { title: "Tikkakoski-Nyrölä" },
      { title: "Palokka-Puuppola" },
      { title: "Vaajakoski-Jyskä" },
      { title: "Kuohu-Vesanka" },
      { title: "Korpilahti" },
    ],
  });
}

async function seedRatings() {
  // wipe existing
  await prisma.ratings.deleteMany();

  const comments = [
    "Nice and peaceful area.",
    "Could use better public transport.",
    "Great atmosphere but expensive rent.",
    "Feels unsafe at night.",
    "Perfect for families!",
    "Too far from the center.",
    "Lots of services nearby.",
    "Wouldn't recommend living here.",
    "Affordable and quiet.",
    "Love the parks and nature.",
  ];

  const random = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;

  const data = [];

  // 5 users, 14 districts
  for (let user = 1; user <= 5; user++) {
    for (let district = 1; district <= 14; district++) {
      // Randomly decide if this user rated this district
      if (Math.random() < 0.6) {
        data.push({
          district_id: district,
          user_id: user,
          safety: random(1, 5),
          services: random(1, 5),
          atmosphere: random(1, 5),
          cost_of_living: random(1, 5),
          comment: Math.random() < 0.7 ? comments[random(0, comments.length - 1)] : null,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
  }

  await prisma.ratings.createMany({ data });
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
