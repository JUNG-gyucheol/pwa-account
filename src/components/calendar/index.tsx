"use client";

import { Dispatch, SetStateAction } from "react";
import useCalendar from "./hooks/useCalendar";
import { InfoType } from "../main";

const randoms = Array.from({ length: 100 }).map((_, index) => {
  return {
    positionX: Math.floor(Math.random() * 96 + 1),
    positionY: Math.floor(Math.random() * 100 + 1),
  };
});

const Calendar: React.FC<{
  setVisibleCreateAccount: Dispatch<SetStateAction<boolean>>;
  setIsFirstMount: Dispatch<SetStateAction<boolean>>;
  setSelectedDate: Dispatch<SetStateAction<string>>;
  selectedDateInfos: InfoType;
  selectedDate: string | undefined;
}> = ({ setSelectedDate, selectedDateInfos, selectedDate }) => {
  const { date, setDate, days } = useCalendar();

  return (
    <div className="w-full rounded-lg shadow-primary bg-background_secondary relative">
      <div className="p-4 flex gap-2 justify-center items-center text-text-primary font-bold">
        <div onClick={() => setDate((prev) => prev.subtract(1, "month"))}>
          Prev
        </div>
        <div>
          {date.get("year")}.{date.get("month") + 1}
        </div>
        <div onClick={() => setDate((prev) => prev.add(1, "month"))}>Next</div>
      </div>
      <header className="border-b-border-primary border-b-[1px] flex justify-between items-center text-text-primary font-bold">
        <span className={"w-[14.285714285714286%] text-center"}>Sun</span>
        <span className={"w-[14.285714285714286%] text-center"}>Mon</span>
        <span className={"w-[14.285714285714286%] text-center"}>Tue</span>
        <span className={"w-[14.285714285714286%] text-center"}>Wed</span>
        <span className={"w-[14.285714285714286%] text-center"}>Thu</span>
        <span className={"w-[14.285714285714286%] text-center"}>Fri</span>
        <span className={"w-[14.285714285714286%] text-center"}>Sat</span>
      </header>
      <section className="flex flex-1 flex-wrap">
        {days.map((d, index) => {
          const count =
            selectedDateInfos?.find((info) => info.date === d)?.list.length ||
            0;
          return (
            <div
              key={index}
              className={`${
                (index + 1) % 7 === 0 ? "border-r-[0px]" : "border-r-[1px]"
              } flex justify-center border-r-border-primary border-b-[1px]  border-b-border-primary w-[14.285714285714286%] h-[80px] relative text-text-secondary text-center p-2`}
              onClick={() => {
                setSelectedDate(d);
              }}
            >
              <div
                className={`${
                  d === selectedDate
                    ? "text-text-tertiary bg-text-primary"
                    : "text-text-secondary"
                } w-[30px] h-[30px] flex items-center justify-center cursor-pointer rounded-full hover:bg-text-primary hover:text-text-tertiary transition-all duration-300`}
              >
                {d.split("-")[2]}
              </div>
              <div className="absolute left-0 bottom-0 text-text-primary font-normal text-center w-full">
                {count}
              </div>
            </div>
          );
        })}
      </section>
      {randoms.map((random) => {
        return (
          <>
            <div
              style={{
                left: `${random.positionX}%`,
                transform: `translateY(${random.positionY}%)`,
                height: `100px`,
              }}
              className="z-[-1] absolute bottom-0 w-[20px] bg-background_secondary rounded-b-full shadow-secondary "
            ></div>
          </>
        );
      })}
      {/* <div className="z-[-1] absolute right-0 bottom-0 w-[20px] h-[100px] bg-background_secondary rounded-b-full translate-y-[100%] shadow-secondary"></div>
      <div className="z-[-1] absolute right-0 bottom-0 w-[20px] h-[80px] bg-background_secondary rounded-b-full translate-y-[100%] translate-x-[-100%] shadow-secondary"></div>
      <div className="z-[-1] absolute right-0 bottom-0 w-[20px] h-[60px] bg-background_secondary rounded-b-full translate-y-[100%] translate-x-[-200%] shadow-secondary"></div>
      <div className="z-[-1] absolute right-0 bottom-0 w-[20px] h-[40px] bg-background_secondary rounded-b-full translate-y-[100%] translate-x-[-300%] shadow-secondary"></div>
      <div className="z-[-1] absolute right-0 bottom-0 w-[20px] h-[20px] bg-background_secondary rounded-b-full translate-y-[100%] translate-x-[-400%] shadow-secondary"></div>
      <div className="z-[-1] absolute right-0 bottom-0 w-[20px] h-[0px] bg-background_secondary rounded-b-full translate-y-[100%] translate-x-[-500%] shadow-secondary"></div> */}
    </div>
  );
};

export default Calendar;
