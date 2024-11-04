"use client";

import dayjs from "dayjs";
import { useEffect, useState } from "react";

const today = dayjs();

const totalDays = (today.get("month") + 1) % 2 === 0 ? 31 : 30;

const Calendar = () => {
  const [month, setMonth] = useState(today.get("month"));
  const [days, setDays] = useState(totalDays);
  const [arr, setArr] = useState<number[]>([]);
  useEffect(() => {
    const currentDate = today.get("date");
    const currentMonthStartDays = today
      .subtract(currentDate - 1, "days")
      .get("days");
    const currentMonthEndDays = today
      .add(days - currentDate, "days")
      .get("days");
    const currentMonthDays = Array.from(
      { length: days },
      (_, index) => index + 1
    );
    const prevMonthDays = Array.from(
      { length: currentMonthStartDays },
      (_, index) =>
        days === 30
          ? 31 - currentMonthStartDays + index + 1
          : 30 - currentMonthStartDays + index + 1
    );
    const nextMonthDays = Array.from(
      { length: 6 - currentMonthEndDays },
      (_, index) => index + 1
    );

    setArr([...prevMonthDays, ...currentMonthDays, ...nextMonthDays]);
  }, [days]);

  console.log("arr", arr);

  return (
    <div className="border-[1px] border-white w-full">
      <div>2024.11</div>
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
