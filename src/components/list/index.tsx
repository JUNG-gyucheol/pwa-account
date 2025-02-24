import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { InfoType } from "../main";
import UpdateAccount from "../updateAccount";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const List: React.FC<{
  setVisibleCreateAccount: Dispatch<SetStateAction<boolean>>;
  setIsFirstMount: Dispatch<SetStateAction<boolean>>;
  setSelectedDateInfos: Dispatch<SetStateAction<InfoType>>;
  selectedDate: string | undefined;
  selectedDateInfos: InfoType;
  refetch: () => void;
}> = ({
  setIsFirstMount,
  setVisibleCreateAccount,
  selectedDate,
  selectedDateInfos,
  setSelectedDateInfos,
  refetch,
}) => {
  const [seletedDateList, setSeletedDateList] = useState<
    {
      id: number;
      isClicked: boolean;
      title: string;
      amount: string;
    }[]
  >([]);
  const [visibleUpdateAccount, setVisibleUpdateAccount] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const removeItem = (index: number) => {
    axios
      .delete("/api/test", {
        data: {
          id: seletedDateList[index].id,
        },
      })
      .then(() => {
        refetch();
      });
  };

  const handleClickItem = useCallback(
    (index: number) => {
      setSeletedDateList((prevList) => {
        return prevList.map((item, i) => {
          if (i === index) {
            return {
              ...item,
              isClicked: !item.isClicked,
            };
          }
          return item;
        });
      });
    },
    [seletedDateList]
  );

  useEffect(() => {
    const itmes =
      selectedDateInfos
        .find((d) => {
          return d.date === selectedDate;
        })
        ?.list.map((v) => ({
          ...v,
        })) || [];
    setSeletedDateList(itmes);
  }, [selectedDate, selectedDateInfos]);

  return (
    <>
      <div>
        <div className="relative text-center text-text-primary p-4 font-bold flex items-center justify-center">
          <div
            onClick={() => {
              setVisibleCreateAccount(true);
              setIsFirstMount(false);
            }}
            className="cursor-pointer flex items-center justify-center bg-button-primary text-text-tertiary rounded-full py-1 px-5 hover:opacity-80 transition-all duration-300 text-[12px]"
          >
            <span className="mr-1">Add</span>
            <FaPlus />
          </div>
        </div>
        <div className="">
          {seletedDateList.map((v, index) => {
            return (
              <div
                key={index}
                className="flex bg-white justify-between border-[0px] border-border-primary mb-[10px]"
                onClick={() => {
                  handleClickItem(index);
                }}
              >
                <div className="flex flex-col h-full mx-[6px] my-[4px]">
                  <span className="text-black">{v.title}</span>
                  <span className="text-[14px] text-gray-600">{v.amount}</span>
                </div>
                <div
                  className={`flex ${
                    seletedDateList[index]?.isClicked ? "w-[240px]" : "w-[0px]"
                  } overflow-hidden transition-all duration-300`}
                >
                  <span
                    onClick={() => {
                      setSelectedIndex(index);
                      setVisibleUpdateAccount(true);
                    }}
                    className=" flex items-center justify-center text-text-primary w-[80px] shrink-0 bg-blue-300"
                  >
                    Update
                  </span>
                  <span
                    onClick={() => removeItem(index)}
                    className="flex items-center justify-center text-red-700 w-[80px] shrink-0 bg-foreground bg-red-300"
                  >
                    Remove
                  </span>
                  <span className="flex items-center justify-center text-gray-700 w-[80px] shrink-0 bg-gray-400">
                    Cancel
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <UpdateAccount
        visibleUpdateAccount={visibleUpdateAccount}
        close={() => setVisibleUpdateAccount(false)}
        selectedDate={selectedDate as string}
        setSelectedDateInfos={setSelectedDateInfos}
        selectedDateInfos={selectedDateInfos}
        selectedIndex={selectedIndex}
        seletedDateList={seletedDateList}
        initSelectedIndex={() => setSelectedIndex(undefined)}
        refetch={refetch}
      />
    </>
  );
};

export default List;
