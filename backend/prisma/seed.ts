import {PrismaClient} from "../generated/prisma";
import {vehicleTypes} from "./data";

const prisma = new PrismaClient();

async function main() {
  for (const type of vehicleTypes) {
    const createdType = await prisma.vehicleType.upsert({
      where: {name: type.name},
      update: {},
      create: {
        name: type.name,
        vehicles: {
          create: type.vehicles.map(v => ({
            name: v.name,
            number: v.number,
            imageUrl: v.imageUrl,
            pricePerDay: v.pricePerDay,
            includedKmPerDay: v.includedKmPerDay,
            totalPriceFor2Days: v.totalPriceFor2Days,
            includedKmFor2Days: v.includedKmFor2Days,
            locations: {create: v.locations},
          })),
        },
      },
    });

    console.log(`✅ Seeded VehicleType: ${createdType.name}`);
  }
}

main()
  .then(() => {
    console.log("🌱 Seeding finished");
  })
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
