import { Dispatch, SetStateAction, useState } from "react";
import { InfoType } from "../main";

const CreateAccount: React.FC<{
  visibleCreateAccount: boolean;
  close: () => void;
  selectedDate: string;
  setSelectedDateInfos: Dispatch<SetStateAction<InfoType>>;
  selectedDateInfos: InfoType;
}> = ({ close, visibleCreateAccount, selectedDate, setSelectedDateInfos }) => {
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
          setSelectedDateInfos((prev) => {
            const prevv = prev.filter((v) => v.date !== selectedDate);
            const selectedDateInfo = prev.find((v) => {
              return v.date === selectedDate;
            });
            return [
              ...prevv,
              {
                date: selectedDateInfo?.date || selectedDate,
                list: [...(selectedDateInfo?.list || []), { title, amount }],
              },
            ];
          });
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
