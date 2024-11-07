"use client";

import { useEffect, useState } from "react";
import Calendar from "../calendar";
import CreateAccount from "../createAccount";
import List from "../list";
import useSWR from "swr";
import axios from "axios";

export type InfoType = {
  date: string;
  list: {
    title: string;
    amount: string;
    isClicked: boolean;
  }[];
}[];

const fetcher = (url: string) =>
  axios.get<InfoType>(url).then((res) => res.data);

const Main = () => {
  const { data, error, mutate } = useSWR("/api/test", fetcher);
  console.log(data);
  const [visibleCreateAccount, setVisibleCreateAccount] = useState(false);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>();
  const [selectedDateInfos, setSelectedDateInfos] = useState<InfoType>([]);

  useEffect(() => {
    if (!data) return;
    const temp = data.map((v) => {
      return {
        date: v.date,
        list: v.list.map((item) => {
          return {
            title: item.title,
            amount: item.amount,
            isClicked: false,
          };
        }),
      };
    });
    setSelectedDateInfos(temp);
  }, [data]);

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
        setSelectedDateInfos={setSelectedDateInfos}
      />
      {!isFirstMount && (
        <CreateAccount
          visibleCreateAccount={visibleCreateAccount}
          close={() => setVisibleCreateAccount(false)}
          selectedDate={selectedDate as string}
          setSelectedDateInfos={setSelectedDateInfos}
          selectedDateInfos={selectedDateInfos}
          mutate={mutate}
        />
      )}
    </div>
  );
};

export default Main;
