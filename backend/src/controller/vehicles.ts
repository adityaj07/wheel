import {db} from "@/lib/db";
import {StatusCodes} from "@/lib/statusCodes";
import type {NoParams} from "@/types";
import type {SearchVehicleBody, SearchVehicleQuery} from "@/types/vehicles";
import {AppError} from "@/utils/AppError";
import {asyncHandler} from "@/utils/asyncHandler";
import {getDateTime} from "@/utils/date";
import {getPaginationMeta, getPaginationParams} from "@/utils/pagination";
import type {Prisma} from "generated/prisma/index.js";

export const searchVehicle = asyncHandler<
  NoParams,
  NoParams,
  SearchVehicleBody,
  SearchVehicleQuery
>(async (req, res) => {
  const {startDate, endDate, startTime, endTime} = req.body;
  const {location} = req.query;

  const {page, limit, skip} = getPaginationParams(req.query);

  const startDateTime = getDateTime(startDate, startTime);
  const endDateTime = getDateTime(endDate, endTime);

  if (endDateTime <= startDateTime) {
    throw new AppError(
      "End date time must be after start date time",
      StatusCodes.BAD_REQUEST.code,
    );
  }

  // We calculate the duration
  const durationMs = endDateTime.getTime() - startDateTime.getTime();
  const remainingMs = durationMs % (1000 * 60 * 60 * 24);
  const durationDays = Math.floor(durationMs / (1000 * 60 * 60 * 24));
  const durationHours = Math.floor(remainingMs / (1000 * 60 * 60));
  const durationMinutes = Math.floor(
    (remainingMs % (1000 * 60 * 60)) / (1000 * 60),
  );

  let whereClause: Prisma.VehicleWhereInput = {
    bookings: {
      none: {
        startDate: {lt: endDateTime},
        endDate: {gt: startDateTime},
      },
    },
  };

  if (location) {
    whereClause = {
      ...whereClause,
      locations: {
        some: {
          location: {
            equals: location,
            mode: "insensitive",
          },
        },
      },
    };
  }

  const totalCount = await db.vehicle.count({where: whereClause});

  // get the vehicles not booked in this range duration
  const availableVehicles = await db.vehicle.findMany({
    where: whereClause,
    include: {
      locations: {
        select: {
          location: true,
        },
      },
      vehicleType: {
        select: {
          name: true,
        },
      },
    },
    skip,
    take: limit,
  });

  const mappedResults = availableVehicles.map(vehicle => {
    const totalDays =
      durationDays + durationHours / 24 + durationMinutes / (24 * 60);

    const calculatedPrice = Math.ceil(totalDays * Number(vehicle.pricePerDay));
    const calculatedIncludedKm = Math.ceil(
      totalDays * vehicle.includedKmPerDay,
    );

    const vehicleLocations = vehicle.locations.map(locObj => {
      return locObj.location;
    });

    return {
      id: vehicle.id,
      name: vehicle.name,
      imageUrl: vehicle.imageUrl,
      vehicleType: vehicle.vehicleType.name,
      pricePerDay: Number(vehicle.pricePerDay),
      locations: vehicleLocations,
      includedKmPerDay: Number(vehicle.includedKmPerDay),
      calculatedPrice,
      calculatedIncludedKm,
      duration: `${durationDays} Days, ${durationHours} Hours, ${durationMinutes} Minutes`,
      availability: vehicle.locations.reduce(
        (acc, loc) => ({...acc, [loc.location]: true}),
        {},
      ),
    };
  });

  const result = {
    data: mappedResults,
    ...getPaginationMeta({totalCount, page, limit}),
  };

  return res.status(StatusCodes.OK.code).json(result);
});
