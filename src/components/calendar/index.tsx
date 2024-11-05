"use client";

import dayjs from "dayjs";
import { useCallback, useEffect, useState } from "react";

const today = dayjs();

const Calendar = () => {
  const [date, setDate] = useState(today);
  const [arr, setArr] = useState<number[]>([]);

  const a = useCallback(() => {
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
    const currentMonthDays = Array.from(
      { length: days },
      (_, index) => index + 1
    );

    const prevTotalDays = [1, 3, 5, 7, 8, 10, 12].includes(selectedMonth - 1)
      ? 31
      : selectedMonth - 1 === 2
      ? selectedYear % 4 === 0
        ? 29
        : 28
      : 30;

    console.log(prevTotalDays);
    const prevMonthDays = Array.from(
      { length: currentMonthStartDays },
      (_, index) => prevTotalDays - currentMonthStartDays + index + 1
    );
    const nextMonthDays = Array.from(
      { length: 6 - currentMonthEndDays },
      (_, index) => index + 1
    );

    setArr([...prevMonthDays, ...currentMonthDays, ...nextMonthDays]);
  }, [date]);

  useEffect(() => {
    a();
  }, [a]);

  return (
    <div className="border-[1px] border-white w-full">
      <div>2024.{date.get("month") + 1}</div>
      <div onClick={() => setDate((prev) => prev.subtract(1, "month"))}>
        Prev
      </div>
      <div onClick={() => setDate((prev) => prev.add(1, "month"))}>Next</div>
      <header className="flex justify-between items-center">
        <span className={"w-[14.285714285714286%]"}>Sun</span>
        <span className={"w-[14.285714285714286%]"}>Mon</span>
        <span className={"w-[14.285714285714286%]"}>Tue</span>
        <span className={"w-[14.285714285714286%]"}>Wed</span>
        <span className={"w-[14.285714285714286%]"}>Thu</span>
        <span className={"w-[14.285714285714286%]"}>Fri</span>
        <span className={"w-[14.285714285714286%]"}>Sat</span>
      </header>
      <section className="flex flex-1 flex-wrap">
        {arr.map((date, index) => (
          <div
            key={index}
            className={`border-[1px] border-white w-[14.285714285714286%] h-[80px]`}
          >
            {date}
          </div>
        ))}
      </section>
    </div>
  );
};

export default Calendar;
