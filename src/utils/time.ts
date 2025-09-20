import {TimeSlot} from "@/types/home";
import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";

dayjs.extend(isSameOrBefore);

export const generateTimeSlots = (
  selectedDate: string | null,
  minTime?: string, // HH:mm format
): TimeSlot[] => {
  const times: TimeSlot[] = [];
  if (!selectedDate) return times;

  const now = dayjs();
  let start: dayjs.Dayjs;

  // Start at either midnight (future date) or nearest half hour (today)
  if (dayjs(selectedDate).isAfter(now, "day")) {
    start = dayjs(selectedDate).startOf("day");
  } else {
    const current = dayjs();
    start =
      current.minute() > 30
        ? current.add(1, "hour").minute(0).second(0)
        : current.minute(30).second(0);
  }

  const end = dayjs(selectedDate).endOf("day");

  while (start.isBefore(end)) {
    const value = start.format("HH:mm");
    const dropoffDateTime = dayjs(`${selectedDate}T${value}`);
    const minDateTime = minTime
      ? dayjs(`${selectedDate}T${minTime}`)
      : undefined;

    times.push({
      value,
      label: start.format("hh:mm A"),
      disabled: minDateTime
        ? dropoffDateTime.isSameOrBefore(minDateTime)
        : false,
    });

    start = start.add(30, "minute");
  }

  return times;
};

export const formatDate = (dateString: string | null): string => {
  if (!dateString) return "Date";
  return dayjs(dateString).format("DD MMM YYYY");
};

export const formatTime = (timeString: string | null): string => {
  if (!timeString) return "Time";
  const [hours, minutes] = timeString.split(":");
  return dayjs()
    .hour(parseInt(hours))
    .minute(parseInt(minutes))
    .format("hh:mm A");
};
