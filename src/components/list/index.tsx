import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { InfoType } from "../main";

const List: React.FC<{
  setVisibleCreateAccount: Dispatch<SetStateAction<boolean>>;
  setIsFirstMount: Dispatch<SetStateAction<boolean>>;
  selectedDate: string | undefined;
  selectedDateInfos: InfoType;
}> = ({
  setIsFirstMount,
  setVisibleCreateAccount,
  selectedDate,
  selectedDateInfos,
}) => {
  const [isClickedItems, setIsClickedItems] = useState<boolean[]>([]);

  useEffect(() => {
    const s =
      selectedDateInfos.find((d) => {
        return d.date === selectedDate;
      })?.list || [];
    setIsClickedItems(Array(s.length).fill(false));
  }, [selectedDate, selectedDateInfos]);
  return (
    <div>
      <div
        onClick={() => {
          setVisibleCreateAccount(true);
          setIsFirstMount(false);
        }}
        className="text-center p-4"
      >
        🌟추가하기 버튼🌟(선택한 날짜{selectedDate})
      </div>
      <div className="">
        {selectedDateInfos.map((d) => {
          if (d.date !== selectedDate) {
            return "";
          }
          return (
            <div key={d.date}>
              {d.list.map((v, index) => {
                return (
                  <div
                    onTouchMove={() => {
                      console.log("tttt");
                    }}
                    key={index}
                    className="flex bg-white justify-between border-[1px] border-lime-400 mb-[10px]"
                    onClick={() => {
                      console.log("tttt");
                      setIsClickedItems((prev) => {
                        const newArr = [...prev];
                        newArr[index] = !newArr[index];
                        return newArr;
                      });
                    }}
                  >
                    <div className="flex flex-col h-full mx-[6px] my-[4px]">
                      <span className="text-black">{v.title}</span>
                      <span className="text-[14px] text-gray-600">
                        {v.amount}
                      </span>
                    </div>
                    <div
                      className={`flex ${
                        isClickedItems[index] ? "w-[150px]" : "w-[0px]"
                      } overflow-hidden transition-all duration-300`}
                    >
                      <span className="flex items-center justify-center text-blue-500 w-[50px] shrink-0 bg-black">
                        수정
                      </span>
                      <span className="flex items-center justify-center text-red-500 w-[50px] shrink-0 bg-black">
                        삭제
                      </span>
                      <span className="flex items-center justify-center text-gray-500 w-[50px] shrink-0 bg-black">
                        취소
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default List;
