import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { InfoType } from "../main";
import UpdateAccount from "../updateAccount";

const List: React.FC<{
  setVisibleCreateAccount: Dispatch<SetStateAction<boolean>>;
  setIsFirstMount: Dispatch<SetStateAction<boolean>>;
  setSelectedDateInfos: Dispatch<SetStateAction<InfoType>>;
  selectedDate: string | undefined;
  selectedDateInfos: InfoType;
}> = ({
  setIsFirstMount,
  setVisibleCreateAccount,
  selectedDate,
  selectedDateInfos,
  setSelectedDateInfos,
}) => {
  const [seletedDateList, setSeletedDateList] = useState<
    {
      isClicked: boolean;
      title: string;
      amount: string;
    }[]
  >([]);
  const [visibleUpdateAccount, setVisibleUpdateAccount] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number>();
  const removeItem = (index: number) => {
    setSelectedDateInfos((prev) => {
      const excludeInfos = prev.filter((d) => d.date !== selectedDate);
      const includeInfos = prev.find((d) => {
        return d.date === selectedDate;
      });

      if (!includeInfos) {
        return [...excludeInfos];
      }

      const infos = {
        ...includeInfos,
        list:
          includeInfos.list.filter((_, i) => {
            return i !== index;
          }) || [],
      };
      return [...excludeInfos, infos];
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
          {seletedDateList.map((v, index) => {
            return (
              <div
                key={index}
                className="flex bg-white justify-between border-[1px] border-lime-400 mb-[10px]"
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
                    seletedDateList[index]?.isClicked ? "w-[150px]" : "w-[0px]"
                  } overflow-hidden transition-all duration-300`}
                >
                  <span
                    onClick={() => {
                      setSelectedIndex(index);
                      setVisibleUpdateAccount(true);
                    }}
                    className="flex items-center justify-center text-blue-500 w-[50px] shrink-0 bg-black"
                  >
                    수정
                  </span>
                  <span
                    onClick={() => removeItem(index)}
                    className="flex items-center justify-center text-red-500 w-[50px] shrink-0 bg-black"
                  >
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
      />
    </>
  );
};

export default List;
