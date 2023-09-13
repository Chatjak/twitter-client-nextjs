import Link from "next/link";
import React from "react";
interface ItemDetail {
  text: string;
  Icon: any;
  active?: boolean;
}

export default function SidebarMenuItem({ username, text, Icon, active }: { username?: string; text: string, Icon: any; active?: boolean }) {
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
  } else if (text === 'Profile') {
    side = (
      <Link href={`/${username}`} className="hoverEffect flex items-center text-gray-700 justify-center xl:justify-start text-lg space-x-3">
        <Icon className="h-7 text-2xl" />
        <span className={`${active && "font-bold"} hidden xl:inline`}>
          {text}
        </span>
      </Link>
    );
  }
  return <>{side}</>
}
