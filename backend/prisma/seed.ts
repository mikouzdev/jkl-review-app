import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  // await seedDistricts();
  //   await seedRatings();
}

async function seedDistricts() {
  await prisma.districts.deleteMany();

  await prisma.districts.createMany({
    data: [
      { title: "Keskusta", latitude: 25.7448676, longitude: 62.240026 },
      { title: "Kypärämäki-Kortepohja", latitude: 25.6811838, longitude: 62.2535129 },
      { title: "Lohikoski-Seppälänkangas", latitude: 25.8153752, longitude: 62.289311999 },
      { title: "Huhtasuo", latitude: 25.8054041, longitude: 62.26612749 },
      { title: "Kuokkala", latitude: 25.7658089, longitude: 62.2258171 },
      { title: "Keltinmäki-Myllyjärvi", latitude: 25.64679809, longitude: 62.22179019 },
      { title: "Keljo", latitude: 25.7171617, longitude: 62.2195982 },
      { title: "Halssila", latitude: 25.7958007, longitude: 62.2457366 },
      { title: "Säynätsalo", latitude: 25.76878808, longitude: 62.1417246 },
      { title: "Tikkakoski-Nyrölä", latitude: 25.6469255, longitude: 62.3884713 },
      { title: "Palokka-Puuppola", latitude: 25.69323529, longitude: 62.33042709 },
      { title: "Vaajakoski-Jyskä", latitude: 25.8626803, longitude: 62.2443229 },
      { title: "Kuohu-Vesanka", latitude: 25.53958534, longitude: 62.2821831 },
      { title: "Korpilahti", latitude: 25.5611984, longitude: 62.0168002 },
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
