import { useContext } from "react";
import { GeneralDataContext } from "./WordDataProvider";
import CustomInput from "./pageComponents/wordComponents/CustomInput";
import { HiStar, HiClock } from 'react-icons/hi';


export default function Nav() {
  const {setActivePage} = useContext(GeneralDataContext);
  const menuItems = [
    {trigger: "favourites", color: "warning"},
    {trigger: "history", color: "info"},
    {trigger: "input"},
  ];

  return (
    <div className="mt-3 mb-4">
        <div className="flex items-center justify-center gap-3">
            {menuItems.map((item) => (
                {...item.trigger == "input" ? (
                    <CustomInput key="customInput"></CustomInput>
                ) : (
                    <button key={item.trigger} onClick={() => setActivePage(item.trigger)} className={`flex items-center justify-center w-8 h-8 border border-solid rounded-md btn-outline-${item.color}`}>
                      {item.trigger == 'favourites' ? (<HiStar />) : (<HiClock />)}
                    </button>
                )}
            ))}
        </div>
    </div>
  );
}