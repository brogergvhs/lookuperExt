import { useState } from "react";
import CustomInput from "./pageComponents/wordComponents/CustomInput";

export default function Nav({activePage, setActivePage, setWordData}) {

  const menuItems = [
    {trigger: "favourites", icon: "", color: ""},
    {trigger: "history", icon: "", color: ""},
    {trigger: "input"},
    {trigger: "settings", icon: "", color: ""},
  ];

  return (
    <div className="navBar">
        <div className="mb-2 text-2xl text-center">Lookuper</div>
        <div className="flex items-center justify-center gap-3">
            {menuItems.map((item, index) => (
                {...item.trigger == "input" ? (
                    <CustomInput key="customInput" setActivePage={setActivePage} setWordData={setWordData}></CustomInput>
                ) : (
                    <button key={item.trigger} onClick={() => setActivePage(item.trigger)} className='flex items-center justify-center w-8 h-8 border border-solid border- rounded-md'>

                    </button>
                )}
            ))}
        </div>
    </div>
  );
}