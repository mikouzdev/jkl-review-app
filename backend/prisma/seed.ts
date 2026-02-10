import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
  await seedDistricts();
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

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
