import { useContext } from "react";
import { GeneralDataContext } from "./WordDataProvider";
import CustomInput from "./pageComponents/wordComponents/CustomInput";

export default function Nav() {
  const {setActivePage} = useContext(GeneralDataContext);
  const menuItems = [
    {trigger: "favourites", icon: "", color: "warning"},
    {trigger: "history", icon: "", color: "info"},
    {trigger: "input"},
  ];

  return (
    <div className="mb-4">
        <div className="mb-2 text-2xl text-center">Lookuper</div>
        <div className="flex items-center justify-center gap-3">
            {menuItems.map((item) => (
                {...item.trigger == "input" ? (
                    <CustomInput key="customInput"></CustomInput>
                ) : (
                    <button key={item.trigger} onClick={() => setActivePage(item.trigger)} className={`flex items-center justify-center w-8 h-8 border border-solid rounded-md btn-outline-${item.color}`}>

                    </button>
                )}
            ))}
        </div>
    </div>
  );
}