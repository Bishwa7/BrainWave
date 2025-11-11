import { PlusIcon } from "../../icons/PlusIcon"
import { ShareIcon } from "../../icons/ShareIcon"



interface CardProps {
    title: string,
    link: string,
    type: "twitter" | "youtube"
}

const defaultStyles = "p-4 bg-white rounded-lg shadow-md border-gray-200 max-w-72 border min-w-72"


export function Card (props : CardProps){

    const { title, link, type } = props;

    return <>
    <div className={`${defaultStyles}`}>
        <div className="flex justify-between">
            <div className="flex items-center">
                <div className="pr-2 text-gray-500">
                    <PlusIcon size="md"/>
                </div>
                
                {title}
            </div>
            <div className="flex items-center text-gray-500">
                <div className="pr-2">
                    <a href={link} target="_blank" className="cursor-pointer">
                        <ShareIcon size="md" />
                    </a>
                </div>
                
                <ShareIcon size="md" />
            </div>
        </div>

        <div className="pt-4">

            {type === "youtube" && <iframe className="w-full" src={link.replace("watch","embed").replace("?v=","/").replace(/&.*/, "")} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}
            

            {type === "twitter" && (
                <div className="overflow-y-auto max-h-72">
                    <blockquote className="twitter-tweet">
                        <a href={link.replace("x.com","twitter.com")}></a> 
                    </blockquote>
                </div>
            )}
            
        </div>
        
    </div>
    </>
}