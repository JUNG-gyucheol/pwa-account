import { Dispatch, SetStateAction } from "react";
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
  return (
    <div>
      <div
        onClick={() => {
          setVisibleCreateAccount(true);
          setIsFirstMount(false);
        }}
      >
        추가하기
      </div>
      {selectedDateInfos.map((d) => {
        if (d.date !== selectedDate) {
          return "";
        }
        return (
          <div key={d.date}>
            {d.list.map((v, index) => {
              return (
                <div key={index}>
                  {v.title}/{v.amount}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default List;
