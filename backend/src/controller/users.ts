import {db} from "@/lib/db";
import {StatusCodes} from "@/lib/statusCodes";
import type {NoParams} from "@/types";
import {AppError} from "@/utils/AppError";
import {asyncHandler} from "@/utils/asyncHandler";

export const me = asyncHandler<NoParams, NoParams, NoParams>(
  async (req, res) => {
    const currentUserId = req.user?.sub;

    console.log("currentUserId: ", currentUserId);

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
            bookingNumber: true,
            startDate: true,
            endDate: true,
            status: true,
            totalPricing: true,
            vehicle: {
              select: {
                id: true,
                name: true,
                number: true,
                brand: true,
                primaryImage: true,
              },
            },
            payments: {
              select: {
                id: true,
                amount: true,
                status: true,
                type: true,
                createdAt: true,
              },
              take: 5,
              orderBy: {createdAt: "desc"},
            },
          },
          orderBy: {createdAt: "desc"},
          take: 10,
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            vehicle: {select: {id: true, name: true, number: true}},
          },
          orderBy: {createdAt: "desc"},
        },
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
