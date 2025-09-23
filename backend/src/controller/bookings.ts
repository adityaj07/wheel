import {db} from "@/lib/db";
import {StatusCodes} from "@/lib/statusCodes";
import type {NoParams} from "@/types";
import type {CreateBookingBody} from "@/types/bookings";
import {AppError} from "@/utils/AppError";
import {asyncHandler} from "@/utils/asyncHandler";
import {getDateTime} from "@/utils/date";

export const create = asyncHandler<NoParams, NoParams, CreateBookingBody>(
  async (req, res) => {
    const userId = req.user?.sub;
    const {vehicleId, startDate, startTime, endDate, endTime, location} =
      req.body;

    if (!userId) {
      throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED.code);
    }

    const startDateTime = getDateTime(startDate, startTime);
    const endDateTime = getDateTime(endDate, endTime);

    if (endDateTime <= startDateTime) {
      throw new AppError(
        "End date time must be after start date time",
        StatusCodes.BAD_REQUEST.code,
      );
    }

    // we check vehicle location availability
    const validLocation = await db.vehicleLocation.findFirst({
      where: {
        vehicleId,
        location: {
          equals: location,
          mode: "insensitive",
        },
      },
    });

    if (!validLocation) {
      throw new AppError(
        `Vehicle not available at location: ${location}`,
        StatusCodes.BAD_REQUEST.code,
      );
    }

    // we check if the vehicle exists
    const vehicle = await db.vehicle.findUnique({
      where: {
        id: vehicleId,
      },
    });
    if (!vehicle) {
      throw new AppError("Vehicle not found", StatusCodes.NOT_FOUND.code);
    }

    // We calculate the price
    const durationMs = endDateTime.getTime() - startDateTime.getTime();
    const durationDays = durationMs / (1000 * 60 * 60 * 24);
    const calculatedPrice = Math.ceil(
      durationDays * Number(vehicle.pricePerDay),
    );

    // we check is the vehicle is already booked in the requested slot and if available we create booking
    // We wrap it inside txn
    const newBooking = await db.$transaction(async tx => {
      const alreadyBooked = await tx.booking.findFirst({
        where: {
          vehicleId,
          startDate: {
            lt: endDateTime,
          },
          endDate: {
            gt: startDateTime,
          },
          status: {
            in: ["CONFIRMED", "ACTIVE"],
          },
        },
      });

      if (alreadyBooked) {
        throw new AppError(
          "Vehicle not available in selected time range",
          StatusCodes.CONFLICT.code,
        );
      }

      // create the booking
      return await tx.booking.create({
        data: {
          userId,
          vehicleId,
          location,
          startDate: startDateTime,
          endDate: endDateTime,
          startTime,
          endTime,
          totalPrice: calculatedPrice,
          status: "CONFIRMED",
        },
        include: {
          vehicle: {
            select: {
              id: true,
              name: true,
              imageUrl: true,
              vehicleType: {select: {name: true}},
            },
          },
        },
      });
    });

    const result = {
      id: newBooking.id,
      vehicle: {
        id: newBooking.vehicle.id,
        name: newBooking.vehicle.name,
        imageUrl: newBooking.vehicle.imageUrl,
        type: newBooking.vehicle.vehicleType.name,
      },
      location: newBooking.location,
      startDate,
      startTime,
      endDate,
      endTime,
      totalPrice: calculatedPrice,
      status: newBooking.status,
      createdAt: newBooking.createdAt,
    };

    return res.status(StatusCodes.CREATED.code).json({data: result});
  },
);
