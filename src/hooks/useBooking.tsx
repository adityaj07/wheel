import {BookingData} from "@/types/home";
import {generateTimeSlots} from "@/utils/time";
import {useCallback, useState} from "react";

export const useBooking = () => {
  const [bookingData, setBookingData] = useState<BookingData>({
    pickupDate: null,
    pickupTime: null,
    dropoffDate: null,
    dropoffTime: null,
  });

  const [modals, setModals] = useState({
    showPickupDate: false,
    showPickupTime: false,
    showDropoffDate: false,
    showDropoffTime: false,
  });

  const updateBookingData = useCallback((updates: Partial<BookingData>) => {
    setBookingData(prev => ({...prev, ...updates}));
  }, []);

  const toggleModal = useCallback(
    (modalName: keyof typeof modals, show?: boolean) => {
      setModals(prev => ({
        ...prev,
        [modalName]: show !== undefined ? show : !prev[modalName],
      }));
    },
    [],
  );

  const pickupTimeSlots = generateTimeSlots(bookingData.pickupDate);
  const dropoffTimeSlots = generateTimeSlots(bookingData.dropoffDate);

  const isSearchDisabled = !bookingData.pickupDate || !bookingData.dropoffDate;

  return {
    bookingData,
    modals,
    updateBookingData,
    toggleModal,
    pickupTimeSlots,
    dropoffTimeSlots,
    isSearchDisabled,
  };
};
