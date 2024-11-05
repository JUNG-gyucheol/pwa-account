"use client";

import { useState } from "react";
import Calendar from "../calendar";
import CreateAccount from "../createAccount";
import List from "../list";

export type InfoType = {
  date: string;
  list: {
    title: string;
    amount: string;
  }[];
}[];

const Main = () => {
  const [visibleCreateAccount, setVisibleCreateAccount] = useState(false);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedDateInfos, setSelectedDateInfos] = useState<InfoType>([]);

  return (
    <div className="border-white w-full">
      Main
      <Calendar
        setVisibleCreateAccount={setVisibleCreateAccount}
        setIsFirstMount={setIsFirstMount}
        setSelectedDate={setSelectedDate}
        selectedDateInfos={selectedDateInfos}
      />
      <List
        selectedDate={selectedDate}
        selectedDateInfos={selectedDateInfos}
        setVisibleCreateAccount={setVisibleCreateAccount}
        setIsFirstMount={setIsFirstMount}
      />
      {!isFirstMount && (
        <CreateAccount
          visibleCreateAccount={visibleCreateAccount}
          close={() => setVisibleCreateAccount(false)}
          selectedDate={selectedDate as string}
          setSelectedDateInfos={setSelectedDateInfos}
          selectedDateInfos={selectedDateInfos}
        />
      )}
    </div>
  );
};

export default Main;
