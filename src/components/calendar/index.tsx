"use client";

import { Dispatch, SetStateAction } from "react";
import useCalendar from "./hooks/useCalendar";
import { InfoType } from "../main";

const Calendar: React.FC<{
  setVisibleCreateAccount: Dispatch<SetStateAction<boolean>>;
  setIsFirstMount: Dispatch<SetStateAction<boolean>>;
  setSelectedDate: Dispatch<SetStateAction<string | undefined>>;
  selectedDateInfos: InfoType;
}> = ({ setSelectedDate, selectedDateInfos }) => {
  const { date, setDate, days } = useCalendar();

  return (
    <div className="border-[1px] border-white w-full">
      <div className="flex gap-2 justify-center items-center">
        <div onClick={() => setDate((prev) => prev.subtract(1, "month"))}>
          Prev
        </div>
        <div>
          {date.get("year")}.{date.get("month") + 1}
        </div>
        <div onClick={() => setDate((prev) => prev.add(1, "month"))}>Next</div>
      </div>
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
        {days.map((d, index) => {
          const count =
            selectedDateInfos?.find((info) => info.date === d)?.list.length ||
            0;
          return (
            <div
              key={index}
              className={`border-[1px] border-white w-[14.285714285714286%] h-[80px] relative`}
              onClick={() => {
                setSelectedDate(d);
              }}
            >
              {d.split("-")[2]}
              <div className="absolute left-0 bottom-0 text-red-500">
                {count}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
};

export default Calendar;
