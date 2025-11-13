import { InputComp } from "../components/InputComp";
import { Button } from "../components/ui/Button";
import { Logo } from "../icons/Logo";


export function Signup(){

    return (
        <div className="h-screen w-screen bg-gray-200 flex flex-col justify-center items-center">

            <div className="text-5xl font-bold p-6 text-brand-600 flex items-center">
                <div className="pr-2 text-brand-600">
                    <Logo size="xl" />
                </div>
                BrainWave
            </div>

            <div className="bg-white rounded-xl border min-w-96 flex flex-col justify-center items-center p-6 gap-2">

                <div className="text-3xl font-semibold p-2">
                    SIGN UP
                </div>

                <InputComp placeholder="Email" onChange={()=>{}} /> 
                <InputComp placeholder="Username" onChange={()=>{}} />
                <InputComp placeholder="Password" onChange={()=>{}} />

                <Button loading={false} variant="primary" size="lg" text="Signup" onClick={()=>{}} />
            </div>

        </div>
    )
}