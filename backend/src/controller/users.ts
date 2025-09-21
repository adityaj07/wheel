import {db} from "@/lib/db";
import {StatusCodes} from "@/lib/statusCodes";
import type {NoParams} from "@/types";
import {AppError} from "@/utils/AppError";
import {asyncHandler} from "@/utils/asyncHandler";

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
