import { Dispatch, SetStateAction, useState } from "react";
import { InfoType } from "../main";
import { KeyedMutator } from "swr";

const CreateAccount: React.FC<{
  visibleCreateAccount: boolean;
  close: () => void;
  selectedDate: string;
  setSelectedDateInfos: Dispatch<SetStateAction<InfoType>>;
  selectedDateInfos: InfoType;
  mutate: KeyedMutator<InfoType>;
}> = ({
  close,
  visibleCreateAccount,
  selectedDate,
  setSelectedDateInfos,
  mutate,
}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full bg-slate-700 ${
        visibleCreateAccount ? "animate-slide_on" : "animate-slide_off"
      }`}
    >
      <div onClick={close}>Close</div>
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
          fetch("/api/test", {
            method: "POST",
            body: JSON.stringify({ title, amount, date: selectedDate }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("dsds", data);
              // console.log(data);
              mutate();
            });
          // setSelectedDateInfos((prev) => {
          //   const prevv = prev.filter((v) => v.date !== selectedDate);
          //   const selectedDateInfo = prev.find((v) => {
          //     return v.date === selectedDate;
          //   });
          //   return [
          //     ...prevv,
          //     {
          //       date: selectedDateInfo?.date || selectedDate,
          //       list: [
          //         ...(selectedDateInfo?.list || []),
          //         { title, amount, isClicked: false },
          //       ],
          //     },
          //   ];
          // });
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

export default CreateAccount;
