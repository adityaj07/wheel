import {TimeSlot} from "@/types/home";
import dayjs from "dayjs";

export const generateTimeSlots = (selectedDate: string | null): TimeSlot[] => {
  const times: TimeSlot[] = [];
  const now = dayjs();
  let start: dayjs.Dayjs;

  if (!selectedDate || dayjs(selectedDate).isAfter(now, "day")) {
    start = dayjs().startOf("day").hour(0).minute(0).second(0);
  } else {
    start =
      dayjs().minute() > 30
        ? dayjs().add(1, "hour").minute(0).second(0)
        : dayjs().minute(30).second(0);
  }

  const end = dayjs().endOf("day").hour(23).minute(59);

  while (start.isBefore(end)) {
    times.push({
      value: start.format("HH:mm"),
      label: start.format("hh:mm A"),
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
  return timeString;
};
