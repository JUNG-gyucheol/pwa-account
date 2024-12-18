"use client";

import { useEffect, useState } from "react";
import Calendar from "../calendar";
import CreateAccount from "../createAccount";
import List from "../list";
import useSWR from "swr";
import axios from "axios";
import dayjs from "dayjs";

export type InfoType = {
  date: string;
  list: {
    id: number;
    title: string;
    amount: string;
    isClicked: boolean;
  }[];
}[];

const fetcher = (url: string) =>
  axios.get<InfoType>(url).then((res) => res.data);

const Main = () => {
  const { data, mutate } = useSWR("/api/test", fetcher);
  const [visibleCreateAccount, setVisibleCreateAccount] = useState(false);
  const [isFirstMount, setIsFirstMount] = useState(true);
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format("YYYY-MM-D")
  );
  const [selectedDateInfos, setSelectedDateInfos] = useState<InfoType>([]);

  useEffect(() => {
    if (!data) return;
    const temp = data.map((v) => {
      return {
        date: v.date,
        list: v.list.map((item) => {
          return {
            id: item.id,
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
      <Calendar
        setVisibleCreateAccount={setVisibleCreateAccount}
        setIsFirstMount={setIsFirstMount}
        setSelectedDate={setSelectedDate}
        selectedDateInfos={selectedDateInfos}
        selectedDate={selectedDate}
      />
      <List
        selectedDate={selectedDate}
        selectedDateInfos={selectedDateInfos}
        setVisibleCreateAccount={setVisibleCreateAccount}
        setIsFirstMount={setIsFirstMount}
        setSelectedDateInfos={setSelectedDateInfos}
        refetch={() => mutate()}
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
