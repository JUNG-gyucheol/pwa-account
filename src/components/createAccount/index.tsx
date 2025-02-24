import { Dispatch, SetStateAction, useState } from "react";
import { InfoType } from "../main";
import { KeyedMutator } from "swr";
import { IoClose } from "react-icons/io5";

const CreateAccount: React.FC<{
  visibleCreateAccount: boolean;
  close: () => void;
  selectedDate: string;
  setSelectedDateInfos: Dispatch<SetStateAction<InfoType>>;
  selectedDateInfos: InfoType;
  mutate: KeyedMutator<InfoType>;
}> = ({ close, visibleCreateAccount, selectedDate, mutate }) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div
      className={`fixed top-0 left-0 w-full h-full text-text-primary bg-background_secondary p-[10px] ${
        visibleCreateAccount ? "animate-slide_on" : "animate-slide_off"
      }`}
    >
      <div className="flex justify-between text-[24px] items-center">
        <div>{selectedDate}</div>
        <IoClose onClick={close} className="cursor-pointer" />
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

export default CreateAccount;
