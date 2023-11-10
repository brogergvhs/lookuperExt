import { useState } from "react";
import CustomInput from "./pageComponents/wordComponents/CustomInput";

export default function Nav({activePage, setActivePage, setWordData}) {

  const menuItems = [
    {trigger: "favourites", icon: "", color: ""},
    {trigger: "history", icon: "", color: ""},
    {trigger: "input"},
    {trigger: "settings", icon: "", color: ""},
    {trigger: "error"}
  ];

  return (
    <div className="navBar">
        <h2 className="text-center">Words checked: 
            {/* {wordAmount} */}
            {/* <span class="sec-color">({fetchAmount})</span> */}
        </h2>
        <div className="actions">
            {menuItems.map((item, index) => (
                {...item.trigger == "input" ? (
                    <CustomInput key="customInput" setActivePage={setActivePage} setWordData={setWordData}></CustomInput>
                ) : (
                    <div key={item.trigger} onClick={() => setActivePage(item.trigger)} className='btn btn-sm btn-outline-info me-3'>
                        {item.trigger}
                    </div>
                )}
            ))}
        </div>
    </div>
  );
}