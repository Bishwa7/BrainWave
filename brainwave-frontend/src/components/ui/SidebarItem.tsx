import type { ReactElement } from "react";

interface SidebarItemProps{
    text: string;
    icon: ReactElement
}


export function SidebarItem({text, icon} : SidebarItemProps){

    return <div className="flex text-gray-700 py-2 pl-2 cursor-pointer hover:bg-gray-200 rounded-lg max-w-62 transition-all duration-200">
        <div className="pr-2">
            {icon}
        </div>

        {text}
    </div>
}