import React from "react";
interface ItemDetail {
  text: string;
  Icon: any;
  active?: boolean;
}
export default function SidebarMenuItem({ text, Icon, active }: ItemDetail) {
  return (
    <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
      <Icon className="h-7 text-2xl" />
      <span className={`${active && "font-bold"} hidden xl:inline`}>
        {text}
      </span>
    </div>
  );
}
