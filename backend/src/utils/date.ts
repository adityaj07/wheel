import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

export function addDays(d: Date, days: number) {
  const result = new Date(d);
  result.setDate(result.getDate() + days);
  return result;
}

export function getDateTime(d: string, time: string) {
  return dayjs(`${d} ${time}`, "YYYY-MM-DD HH:mm").toDate();
}
