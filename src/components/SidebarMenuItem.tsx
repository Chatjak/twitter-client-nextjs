import Link from "next/link";
import React from "react";
interface ItemDetail {
  text: string;
  Icon: any;
  active?: boolean;
}

export default function SidebarMenuItem({ text, Icon, active }: ItemDetail) {
  let side = (
    <div className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
      <Icon className="h-7 text-2xl" />
      <span className={`${active && "font-bold"} hidden xl:inline`}>
        {text}
      </span>
    </div>
  );
  if (text === 'Home') {
    side = (
      <Link href={'/'} className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
        <Icon className="h-7 text-2xl" />
        <span className={`${active && "font-bold"} hidden xl:inline`}>
          {text}
        </span>
      </Link>
    );
  }
  return <>{side}</>
}
