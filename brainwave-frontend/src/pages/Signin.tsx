import { useRef } from "react";
import { InputComp } from "../components/InputComp";
import { Button } from "../components/ui/Button";
import { Logo } from "../icons/Logo";
import { BackendURL } from "../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signin(){

    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function signin(){
        const email = emailRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        const response = await axios.post(`${BackendURL}/api/v1/user/signin`, {
            email,
            password
        })


        const jwt = response.data.token;
        localStorage.setItem("token", jwt)
        navigate("/dashboard")
    }


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
                    SIGN IN
                </div>

                <InputComp ref={emailRef} placeholder="Email" onChange={()=>{}} />
                <InputComp ref={passwordRef} placeholder="Password" onChange={()=>{}} />

                <Button loading={false} variant="primary" size="lg" text="Signin" onClick={signin} />
            </div>

        </div>
    )
}