import React from "react";

export default function NumberCircle ({number}) {
    return (
        <div className="flex m-2 mr-4">
            <div className="flex justify-center items-center w-[1.875rem] h-[1.875rem] rounded-full border border-solid border-accent">{number}</div>
        </div>
    );
}