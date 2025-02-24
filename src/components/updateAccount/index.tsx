import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InfoType } from "../main";
import axios from "axios";
import { IoClose } from "react-icons/io5";

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
      className={`fixed top-0 left-0 w-full h-full text-text-primary bg-background_secondary p-[10px] ${
        visibleUpdateAccount ? "animate-slide_on" : "animate-slide_off"
      }`}
    >
      <div className="flex justify-between text-[24px] items-center">
        <div>{selectedDate}</div>
        <IoClose
          onClick={() => {
            initSelectedIndex();
            close();
          }}
          className="cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-[10px] mt-[20px]">
        <div className="flex flex-col gap-[4px]">
          <span>title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            className="text-black"
          />
        </div>
        <div className="flex flex-col gap-[4px]">
          <span>amount</span>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="text"
            className="text-black"
          />
        </div>
      </div>
      <div className="fixed bottom-0 left-0 translate-y-[-100%] w-full flex items-center justify-center">
        <button
          className="cursor-pointer w-[90%] h-[50px] bg-button-primary rounded-xl text-text-tertiary font-bold"
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
            initSelectedIndex();
            setTitle("");
            setAmount("");
            close();
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default UpdateAccount;
