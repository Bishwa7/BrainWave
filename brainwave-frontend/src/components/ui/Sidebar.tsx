import { Logo } from "../../icons/Logo";
import { TwitterIcon } from "../../icons/TwitterIcon";
import { YoutubeIcon } from "../../icons/YoutubeIcon";
import { SidebarItem } from "./SidebarItem";

export function Sidebar(){
    
    return <div className="h-screen bg-white border-r w-72 fixed left-0 top-0 pl-2">

        <div className="flex items-center text-4xl font-semibold py-4">
            <div className="pr-2 text-brand-600">
                <Logo size="xl" />
            </div>

            BrainWave
        </div>

        <div className="pt-2 pl-4">
            <SidebarItem text="Twitter" icon={<TwitterIcon size="lg" />} />
            <SidebarItem text="Youtube" icon={<YoutubeIcon size="lg" />} />
        </div>

    </div>
}