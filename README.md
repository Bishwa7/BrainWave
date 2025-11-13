# BrainWave
BrainWave, a TypeScript project, is a personal knowledge management application designed to help users store, organize, and retrieve information effortlessly from multiple content sources like - Twitter, YouTube, Google Docs, and more — all in one centralized hub. Second Brain enables users to build a personal digital repository that grows with them over time.

## Key Features:
- ✨ Save content from various platforms (Twitter threads, YouTube links/notes, Google Docs references, and custom text entries)
- 📂 Categorize and tag content for easy organization
- 🧠 Knowledge dashboard to view, filter, and explore saved content
- 🏷️ Smart tagging and content grouping for meaningful organization
- 🔐 Secure personal access with user authentication
- ☁️ Cloud-based storage to access information anywhere

## Technology Stack:
- Frontend: React.js (with component-based UI)
- Backend: Node.js + Express.js REST API
- Database: MongoDB for scalable and flexible content storage
- Other Tools: JWT authentication, APIs for fetching content metadata, and modern UI libraries for clean UX

## Objective:
To create a centralized personal knowledge system that streamlines content capture from multiple sources, helping users store, learn, and revisit valuable information seamlessly — essentially building a digital extension of their memory and learning system.

## Installation:
```
Will Update after project completion
```


<br/><br/><br/>





## Steps to connect Backend & Frontend

### Step 1 - 
- install cors on backend
- install react-router-dom on frontend (and add all the pages in App.tsx)
- Connect Signup.tsx (frontend) to backend

<br/>

- install cors on backend
```
cd backend

npm install cors @types/cors
```
backend/src/index.ts
```typescript
import cors from "cors";

app.use(cors())
```

<br/>

- install react-router-dom on frontend (and add all the pages in App.tsx)

```
cd brainwave-frontend

npm react-router-dom
```

brainwave-frontend/src/App.tsx
```typescript
import "./index.css"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import Dashboard from "./pages/Dashboard"


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

<br/>

- Connect Signup.tsx (frontend) to backend

brainwave-frontend/src/components/InputComp.tsx
```typescript
interface InputCompProps {
    onChange: ()=> void;
    placeholder?: string;
    ref?: any
}


export function InputComp({onChange, placeholder, ref}: InputCompProps ){

    return <div>
        <input type="text" placeholder={placeholder} className="px-4 py-2 border m-2 rounded-md" onChange={onChange} ref={ref}></input>
    </div>
}
```


brainwave-frontend/src/config/config.tsx
```typescript
export const BackendURL = "http://localhost:3000"
```


brainwave-frontend/src/pages/Signup.tsx
```typescript
import { useRef } from "react";
import { InputComp } from "../components/InputComp";
import { Button } from "../components/ui/Button";
import { Logo } from "../icons/Logo";
import { BackendURL } from "../config/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export function Signup(){
    
    const emailRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate();

    async function signup(){
        const email = emailRef.current?.value || "";
        const userName = usernameRef.current?.value || "";
        const password = passwordRef.current?.value || "";

        await axios.post(`${BackendURL}/api/v1/user/signup`, {
            email,
            userName,
            password
        })


        navigate("/signin")
        alert("You have Signed Up")
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
                    SIGN UP
                </div>

                <InputComp ref={emailRef} placeholder="Email" onChange={()=>{}} /> 
                <InputComp ref={usernameRef} placeholder="Username" onChange={()=>{}} />
                <InputComp ref={passwordRef} placeholder="Password" onChange={()=>{}} />

                <Button loading={false} variant="primary" size="lg" text="Signup" onClick={signup} />
            </div>

        </div>
    )
}
```


<br/><br/>


### Step 2 - 
- Connect Signin.tsx (frontend) to backend

brainwave-frontend/src/pages/Signin.tsx

```typescript
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
```