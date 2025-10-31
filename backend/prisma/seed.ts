import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient();

async function main() {
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
            { title: "Korpilahti" }
        ]
    });
    console.log("Seed data created successfully.");
}

main()
    .catch(console.error)
    .finally(() => prisma.$disconnect());
