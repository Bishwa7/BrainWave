import { CloseIcon } from "../../icons/CloseIcon";
import { InputComp } from "../InputComp";
import { Button } from "./Button";


interface CreateContentModalProps {
    open: boolean;
    onClose: ()=>void;
}

export function CreateContentModal ({open, onClose}: CreateContentModalProps){

    return <div>
        {open && <div className="w-screen h-screen bg-slate-600/80 fixed top-0 left-0 flex justify-center items-center">
            
            <div className="bg-white p-4 rounded-lg">
                <div className="flex justify-end">
                    <div onClick={onClose} className="cursor-pointer">
                        <CloseIcon size="lg" />
                    </div>
                </div>
                <div>
                    <InputComp placeholder="title" onChange={()=>{}} />
                    <InputComp placeholder="Link" onChange={()=>{}} />
                </div>
                <div className="flex justify-center">
                    <Button variant="primary" text="Submit" size="md" onClick={() => alert("Submitted")}></Button>
                </div>
            </div>
        
        </div>}
    </div>
}