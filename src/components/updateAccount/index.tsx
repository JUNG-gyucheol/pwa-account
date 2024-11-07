import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InfoType } from "../main";
import axios from "axios";

const UpdateAccount: React.FC<{
  visibleUpdateAccount: boolean;
  close: () => void;
  selectedDate: string;
  setSelectedDateInfos: Dispatch<SetStateAction<InfoType>>;
  selectedDateInfos: InfoType;
  selectedIndex?: number;
  seletedDateList: {
    id: number;
    isClicked: boolean;
    title: string;
    amount: string;
  }[];
  initSelectedIndex: () => void;
  refetch: () => void;
}> = ({
  close,
  visibleUpdateAccount,
  selectedDate,
  selectedIndex,
  seletedDateList,
  initSelectedIndex,
  refetch,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (selectedIndex !== undefined) {
      setTitle(seletedDateList[selectedIndex].title);
      setAmount(seletedDateList[selectedIndex].amount);
    }
  }, [selectedIndex]);

  return (
    <div
      className={`fixed top-0 left-0 overflow-hidden ${
        visibleUpdateAccount ? "translate-x-[0%]" : "-translate-x-[-100%]"
      } w-full  h-full bg-slate-700 transition-all duration-300`}
    >
      <div
        onClick={() => {
          initSelectedIndex();
          close();
        }}
      >
        Close
      </div>
      <div>{selectedDate}</div>
      <div>
        title:
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="text-black"
        />
      </div>
      <div>
        amount:
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="text"
          className="text-black"
        />
      </div>
      <button
        onClick={() => {
          axios
            .put("/api/test", {
              id: seletedDateList[selectedIndex as number].id,
              title,
              amount,
            })
            .then(() => {
              refetch();
            });
          // setSelectedDateInfos((prev) => {
          //   return prev.map((dateInfo) => {
          //     if (dateInfo.date === selectedDate) {
          //       return {
          //         ...dateInfo,
          //         list: dateInfo.list.map((item, index) => {
          //           if (index === selectedIndex) {
          //             return {
          //               ...item,
          //               title,
          //               amount,
          //             };
          //           }
          //           return item;
          //         }),
          //       };
          //     }
          //     return dateInfo;
          //   });
          // });
          initSelectedIndex();
          setTitle("");
          setAmount("");
          close();
        }}
      >
        저장
      </button>
    </div>
  );
};

export default UpdateAccount;
