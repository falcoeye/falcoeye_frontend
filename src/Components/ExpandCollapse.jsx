import { BiChevronDown, BiChevronUp } from "react-icons/bi";
import React, { useState } from "react";
const ExpandCollapse = ({ expand, collaplse, children, icon, title }) => {
  const [open, setOpen] = useState(true);
  const handleCollapse = () => {
    setOpen(!open);
  };
  return (
    <div className="flex flex-col w-full pb-4 border-b border-primary">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-xl">{icon}</div>
          <h4 className="text-black text-sm capitalize">{title}</h4>
        </div>

        <button onClick={handleCollapse} className="text-primary text-lg ">
          {open ? <BiChevronDown /> : <BiChevronUp />}
        </button>
      </div>
      <div
        className={`${
          open ? expand : collaplse
        }  transition-all duration-500 ease-in-out overflow-hidden`}
      >
        {children}
      </div>
    </div>
  );
};

export default ExpandCollapse;
