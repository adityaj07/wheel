import {db} from "@/lib/db";
import {StatusCodes} from "@/lib/statusCodes";
import type {NoParams} from "@/types";
import type {GetUserBookingsQuery} from "@/types/users";
import {AppError} from "@/utils/AppError";
import {asyncHandler} from "@/utils/asyncHandler";
import {getPaginationMeta, getPaginationParams} from "@/utils/pagination";
import type {Prisma} from "generated/prisma/index.js";

export const me = asyncHandler<NoParams, NoParams, NoParams>(
  async (req, res) => {
    const currentUserId = req.user?.sub;

    if (!currentUserId) {
      throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED.code);
    }

    const user = await db.user.findUnique({
      where: {id: currentUserId},
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        dateOfBirth: true,
        licenseNumber: true,
        address: true,
        city: true,
        state: true,
        zipCode: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
        updatedAt: true,
        bookings: {
          select: {
            id: true,
            startDate: true,
            endDate: true,
            startTime: true,
            endTime: true,
            location: true,
            totalPrice: true,
            status: true,
            vehicle: {
              select: {
                id: true,
                name: true,
                number: true,
                pricePerDay: true,
                totalPriceFor2Days: true,
                includedKmPerDay: true,
                includedKmFor2Days: true,
                locations: {
                  select: {location: true},
                },
                vehicleType: {
                  select: {id: true, name: true},
                },
              },
            },
          },
          orderBy: {createdAt: "desc"},
          take: 10,
        },
        refreshTokens: false,
      },
    });

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND.code);
    }

    if (!user.isActive) {
      throw new AppError(
        "User account is inactive",
        StatusCodes.BAD_REQUEST.code,
      );
    }

    return res.status(StatusCodes.OK.code).json({user});
  },
);

export const getUserBookings = asyncHandler<
  NoParams,
  NoParams,
  NoParams,
  GetUserBookingsQuery
>(async (req, res) => {
  const userId = req.user?.sub;
  if (!userId) {
    throw new AppError("Unauthorized", StatusCodes.UNAUTHORIZED.code);
  }

  const {page, limit, skip} = getPaginationParams(req.query);
  const {status, startDate, endDate} = req.query;

  if (startDate && endDate) {
    if (endDate <= startDate) {
      throw new AppError(
        "End date time must be after start date time",
        StatusCodes.BAD_REQUEST.code,
      );
    }
  }

  const whereClause: Prisma.BookingWhereInput = {userId};

  if (status) {
    whereClause.status = status;
  }

  if (startDate) {
    whereClause.startDate = {gte: new Date(startDate)};
  }

  if (endDate) {
    whereClause.endDate = new Date(endDate);
  }

  const totalCount = await db.booking.count({where: whereClause});

  const bookings = await db.booking.findMany({
    where: whereClause,
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
    skip,
    take: limit,
    orderBy: {startDate: "desc"},
  });

  const data = bookings.map(b => ({
    id: b.id,
    vehicle: {
      id: b.vehicle.id,
      name: b.vehicle.name,
      imageUrl: b.vehicle.imageUrl,
      type: b.vehicle.vehicleType.name,
    },
    location: b.location,
    startDate: b.startDate.toISOString().split("T")[0],
    startTime: b.startTime,
    endDate: b.endDate.toISOString().split("T")[0],
    endTime: b.endTime,
    totalPrice: Number(b.totalPrice),
    status: b.status,
  }));

  return res.status(StatusCodes.OK.code).json({
    data,
    ...getPaginationMeta({totalCount, page, limit}),
  });
});
