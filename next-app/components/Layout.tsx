import React, { useState, MouseEvent } from "react";
import { TGlobalSize } from "@/types/general";
import { TbResize } from "react-icons/tb";

export default function Layout({children}) {
  const [size, setSize] = useState<TGlobalSize>({ x: 400, y: 400 });

  const handler = (mouseDownEvent: MouseEvent<HTMLDivElement>) => {
    mouseDownEvent.preventDefault();
    const startSize = size;
    const startPosition = { x: mouseDownEvent.screenX, y: mouseDownEvent.screenY };
    
    function onMouseMove(mouseMoveEvent): void {
      mouseDownEvent.preventDefault();
      setSize(currentSize => ({ 
        x: startSize.x + (startPosition.x - mouseMoveEvent.screenX),
        y: startSize.y - startPosition.y + mouseMoveEvent.screenY 
      }));
    }
    function onMouseUp(): void {
      document.body.removeEventListener("mousemove", onMouseMove);
    }
    
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="flex flex-col min-h-[300px] min-w-[400px] max-h-[600px] max-w-[800px] p-4" style={{ width: size.x, height: size.y }}>
      {children}
      <div onMouseDown={handler} className="absolute bottom-[10px] left-[10px] h-5 w-5 text-lg leading-5 cursor-resize">
        <TbResize />
      </div>
    </div>
  );
}
