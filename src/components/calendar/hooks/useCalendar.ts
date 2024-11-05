import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

const today = dayjs();

const useCalendar = () => {
  const [date, setDate] = useState(today);
  const [days, setDays] = useState<string[]>([]);

  const getDate = useCallback(() => {
    const selectedMonth = date.get("month") + 1;
    const selectedYear = date.get("year");
    const days = [1, 3, 5, 7, 8, 10, 12].includes(selectedMonth)
      ? 31
      : selectedMonth === 2
      ? selectedYear % 4 === 0
        ? 29
        : 28
      : 30;
    const currentDate = date.get("date");
    const currentMonthStartDays = date
      .subtract(currentDate - 1, "days")
      .get("days");
    const currentMonthEndDays = date
      .add(days - currentDate, "days")
      .get("days");
    const currentMonthDays = Array.from({ length: days }, (_, index) =>
      date.format(`YYYY-MM-${index + 1}`)
    );

    const prevTotalDays = [1, 3, 5, 7, 8, 10, 12].includes(selectedMonth - 1)
      ? 31
      : selectedMonth - 1 === 2
      ? selectedYear % 4 === 0
        ? 29
        : 28
      : 30;

    const prevMonthDays = Array.from(
      { length: currentMonthStartDays },
      (_, index) =>
        date
          .subtract(1, "month")
          .format(
            `YYYY-MM-${prevTotalDays - currentMonthStartDays + index + 1}`
          )
      // prevTotalDays - currentMonthStartDays + index + 1
    );
    const nextMonthDays = Array.from(
      { length: 6 - currentMonthEndDays },
      (_, index) => date.add(1, "month").format(`YYYY-MM-${index + 1}`)
    );

    setDays([...prevMonthDays, ...currentMonthDays, ...nextMonthDays]);
  }, [date]);

  useEffect(() => {
    getDate();
  }, [getDate]);

  return {
    date,
    setDate,
    days,
  };
};

export default useCalendar;
