# Steps for frontend creation - 
<br/>

### Step 1 -
- bootstrapping react project using vite
- bootstrapping tailwindcss
<br/>

- bootstrapping react project using vite
```
npm create vite@latest brainwave-frontend

>React
>Typescript

cd brainwave-frontend
npm install
npm run dev
```

- bootstrapping tailwindcss
```
npm install tailwindcss @tailwindcss/vite
```
vite.config.ts (Add the @tailwindcss/vite plugin to your Vite configuration.)
```
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```

Add an @import to your CSS file that imports Tailwind CSS.
```
@import "tailwindcss";
```

Start using Tailwindcss in the project
```
npm run dev
```


<br/><br/>


### Step 2 -
- creating generic button component (ui library)
- added config.tsx for icons
- added custom colors
- added ShareIcon.tsx

<br/>

- added custom colors
index.css
```css
@import "tailwindcss";

@theme {
    --color-brand-300: oklch(0.9296 0.0321 272.27);
    --color-brand-500: oklch(0.4202 0.1717 278.42);
    --color-brand-600: oklch(0.5103 0.2286 277.36);
    --color-brandgray-100: oklch(0.9494 0.0013 286.37);
    --color-brandgray-200: oklch(0.9329 0.0063 255.48);
    --color-brandgray-600: oklch(0.6785 0.0068 255.49);
}
```
<br/>

- creating generic button component (ui library)

src/components/ui/Buttons.tsx

```typescript
import type { ReactElement } from "react"
import "../../index.css"

type variants = "primary" | "secondary"
type sizes = "sm" | "md" | "lg"

interface ButtonProps {
    variant: variants,
    size: sizes,
    text: string,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    onClick: () => void,
    loading?: boolean
}


const defaultStyles = "rounded-md p-4"

type varStruc = Record<variants, string>

const variantStyles : varStruc = {
    "primary" : "bg-brand-600 text-white",
    "secondary": "bg-brand-300 text-purple-600"
}

type sizeStruc = Record<sizes, string>

const sizeStyles : sizeStruc ={
    "sm" : "py-1 px-2",
    "md" : "py-2 px-4",
    "lg" : "py-2 px-6"
}


export const Button = (props : ButtonProps) => {
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} ${props.loading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`} onClick={props.loading ? undefined: props.onClick} disabled={props.loading}>
        <div className="flex items-center">
            {props.startIcon? <div className="pr-2">{props.startIcon}</div> : null}
            {props.text}
            {props.endIcon}
        </div>
    </button>
}
```
<br/>

added config.tsx for icons
src/icons/config.tsx

```typescript
type iconSizes = "sm" | "md" | "lg" | "xl"


type iconSizeStruc = Record<iconSizes, string>

export const iconSizeStyles : iconSizeStruc ={
    "sm" : "size-2",
    "md" : "size-4",
    "lg" : "size-6",
    "xl" : "size-8"
}

export interface iconProps{
    size: iconSizes
}
```


src/icons/plusicon.tsx

```typescript
import { iconSizeStyles, type iconProps } from "./config"


export const PlusIcon = (props : iconProps) => {

    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={iconSizeStyles[props.size]}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>
}

```


- using Button component from Button.tsx
- using PlusIcon from PlusIcon.tsx

src/App.tsx

```typescript
import "./index.css"
import { Button } from './components/ui/Button'
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"

function App() {
  
  return (
    <>
      <Button variant='secondary' size='sm' startIcon={<PlusIcon size="sm"/>} text='Small' onClick={()=>alert("Clicked")}></Button>
      <Button variant='secondary' size='md' startIcon={<PlusIcon size="md"/>} text='Medium' onClick={()=>alert("Clicked")}></Button>
      <Button variant='primary' size='lg' startIcon={<ShareIcon size="md"/>} text='Large' onClick={()=>alert("Clicked")}></Button>
    </>
  )
}

export default App
```

- added ShareIcon.tsx
```typescript
import { iconSizeStyles, type iconProps } from "./config"

export const ShareIcon = (props: iconProps) =>{
    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={iconSizeStyles[props.size]}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M7.217 10.907a2.25 2.25 0 1 0 0 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186 9.566-5.314m-9.566 7.5 9.566 5.314m0 0a2.25 2.25 0 1 0 3.935 2.186 2.25 2.25 0 0 0-3.935-2.186Zm0-12.814a2.25 2.25 0 1 0 3.933-2.185 2.25 2.25 0 0 0-3.933 2.185Z" />
</svg>
}
```

<br/><br/>


### Step 3 - 
- added generic Card component
- added twitter's embed script


./src/components/ui/Card.tsx
```typescript
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
```

index.html
```html
<!-- to embed twitter posts -->
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
```


./src/App.tsx
```typescript
import "./index.css"
import { Button } from './components/ui/Button'
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"
import { Card } from "./components/ui/Card"

function App() {
  
  return (
    <div className="p-4">
      <div className="flex justify-end gap-4">
        <Button variant='secondary' size='lg' startIcon={<PlusIcon size="md"/>} text='Share Brain' onClick={()=>alert("Clicked")}></Button>
        <Button variant='primary' size='lg' startIcon={<ShareIcon size="md"/>} text='Add Content' onClick={()=>alert("Clicked")}></Button>
      </div>
      

      <div className="flex gap-4 p-6">
        <Card title="Fisrt card" type="youtube" link="https://www.youtube.com/watch?v=Uu2FQ2hW4_o" />
        <Card title="Fisrt card" type="youtube" link="https://www.youtube.com/watch?v=wsHt2YReQzA&t=6s" />
        
        <Card title="Second card" type="twitter" link="https://x.com/BishwaP5/status/1811428154327634194?s=20" />
        <Card title="Second card" type="twitter" link="https://x.com/merishabh_singh/status/1987919007903879417?s=20" />
        
      </div>
      
    </div>
  )
}

export default App
```

<br/><br/>


### Step 4 - 
- added CreateContentModal
- added ./src/icons/CloseIcon.tsx
- added ./src/components/InputComp.tsx (Custon Input Component)


./src/icons/CloseIcon.tsx
```typescript
import { iconSizeStyles, type iconProps } from "./config";

export function CloseIcon(props : iconProps){

    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={iconSizeStyles[props.size]}>
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>
}
```

./src/components/InputComp.tsx
```typescript
interface InputCompProps {
    onChange: ()=> void;
    placeholder?: string;
}


export function InputComp({onChange, placeholder}: InputCompProps ){

    return <div>
        <input type="text" placeholder={placeholder} className="px-4 py-2 border m-2 rounded-md" onChange={onChange}></input>
    </div>
}
```

<br/>

./src/components/ui/CreateContentModal.tsx
```typescript
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
```

./src/App.tsx
```typescript
import "./index.css"
import { Button } from './components/ui/Button'
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"
import { Card } from "./components/ui/Card"
import { CreateContentModal } from "./components/ui/CreateContentModal"
import { useState } from "react"

function App() {
  
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div className="p-4">

      <CreateContentModal open={modalOpen} onClose={() => {setModalOpen(false)}} />

      <div className="flex justify-end gap-4">
        <Button variant='secondary' size='lg' startIcon={<PlusIcon size="md"/>} text='Share Brain' onClick={()=>alert("Clicked")}></Button>
        <Button variant='primary' size='lg' startIcon={<ShareIcon size="md"/>} text='Add Content' onClick={()=>{setModalOpen(true)}}></Button>
      </div>
      

      <div className="flex gap-4 p-6">
        <Card title="Fisrt card" type="youtube" link="https://www.youtube.com/watch?v=Uu2FQ2hW4_o" />
        <Card title="Fisrt card" type="youtube" link="https://www.youtube.com/watch?v=wsHt2YReQzA&t=6s" />
        
        <Card title="Second card" type="twitter" link="https://x.com/BishwaP5/status/1811428154327634194?s=20" />
        <Card title="Second card" type="twitter" link="https://x.com/merishabh_singh/status/1987919007903879417?s=20" />
        
      </div>
      
    </div>
  )
}

export default App
```

<br/><br/>


### Step 5 - 
- added Sidebar
- added generic SidebarItem.tsx
- added Logo.tsx, TwitterIcon.tsx & YoutubeICon.tsx
- added everything above mentioned in App.tsx

./src/components/ui/Sidebar.tsx

```typescript
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
```

./src/components/ui/SidebarItem.tsx

```typescript
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
```


./src/icons/Logo.tsx

```typescript
import { iconSizeStyles, type iconProps } from "./config";

export function Logo(props: iconProps){

    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className={iconSizeStyles[props.size]}>
        <path stroke-linecap="round" stroke-linejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
    </svg>

}
```

./src/icons/TwitterIcon.tsx

```typescript
import { iconSizeStyles, type iconProps } from "./config";

export function TwitterIcon(props: iconProps){

    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" x="0px" y="0px" viewBox="0 0 30 30" stroke="currentColor" className={iconSizeStyles[props.size]}>
        <path d="M26.37,26l-8.795-12.822l0.015,0.012L25.52,4h-2.65l-6.46,7.48L11.28,4H4.33l8.211,11.971L12.54,15.97L3.88,26h2.65 l7.182-8.322L19.42,26H26.37z M10.23,6l12.34,18h-2.1L8.12,6H10.23z"></path>
    </svg>
}
```

./src/icons/YoutubeIcon.tsx

```typescript
import { iconSizeStyles, type iconProps } from "./config";


export function YoutubeIcon(props: iconProps){

    return <svg xmlns="http://www.w3.org/2000/svg" fill="none" x="0px" y="0px" viewBox="0 0 50 50" stroke="currentColor" className={iconSizeStyles[props.size]}>
        <path d="M 44.898438 14.5 C 44.5 12.300781 42.601563 10.699219 40.398438 10.199219 C 37.101563 9.5 31 9 24.398438 9 C 17.800781 9 11.601563 9.5 8.300781 10.199219 C 6.101563 10.699219 4.199219 12.199219 3.800781 14.5 C 3.398438 17 3 20.5 3 25 C 3 29.5 3.398438 33 3.898438 35.5 C 4.300781 37.699219 6.199219 39.300781 8.398438 39.800781 C 11.898438 40.5 17.898438 41 24.5 41 C 31.101563 41 37.101563 40.5 40.601563 39.800781 C 42.800781 39.300781 44.699219 37.800781 45.101563 35.5 C 45.5 33 46 29.398438 46.101563 25 C 45.898438 20.5 45.398438 17 44.898438 14.5 Z M 19 32 L 19 18 L 31.199219 25 Z"></path>
    </svg>
}
```


./src/App.tsx

```typescript
import "./index.css"
import { Button } from './components/ui/Button'
import { PlusIcon } from "./icons/PlusIcon"
import { ShareIcon } from "./icons/ShareIcon"
import { Card } from "./components/ui/Card"
import { CreateContentModal } from "./components/ui/CreateContentModal"
import { useState } from "react"
import { Sidebar } from "./components/ui/Sidebar"

function App() {
  
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <div className="border-2">
        <Sidebar />
      </div>
      <div className="p-2 ml-72 min-h-screen bg-brandgray-100">

      <CreateContentModal open={modalOpen} onClose={() => {setModalOpen(false)}} />

      <div className="flex justify-end gap-4">
        <Button variant='secondary' size='lg' startIcon={<PlusIcon size="md"/>} text='Share Brain' onClick={()=>alert("Clicked")}></Button>
        <Button variant='primary' size='lg' startIcon={<ShareIcon size="md"/>} text='Add Content' onClick={()=>{setModalOpen(true)}}></Button>
      </div>
      

      <div className="flex gap-4 p-6">
        <Card title="Fisrt card" type="youtube" link="https://www.youtube.com/watch?v=Uu2FQ2hW4_o" />
        <Card title="Fisrt card" type="youtube" link="https://www.youtube.com/watch?v=wsHt2YReQzA&t=6s" />
        
        <Card title="Second card" type="twitter" link="https://x.com/BishwaP5/status/1811428154327634194?s=20" />
        <Card title="Second card" type="twitter" link="https://x.com/merishabh_singh/status/1987919007903879417?s=20" />
        
      </div>
      
    </div>

    </div>
    
  )
}

export default App
```



### Step 6 - 
- added Signup and Signin pages
- added Dashboard page

./src/pages/Signup.tsx

```typescript
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
```



./src/pages/Signin.tsx

```typescript
import { InputComp } from "../components/InputComp";
import { Button } from "../components/ui/Button";
import { Logo } from "../icons/Logo";


export function Signin(){

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

                <InputComp placeholder="Email" onChange={()=>{}} />
                <InputComp placeholder="Password" onChange={()=>{}} />

                <Button loading={false} variant="primary" size="lg" text="Signin" onClick={()=>{}} />
            </div>

        </div>
    )
}
```


./src/pages/Dashboard.tsx


```typescript
import "../index.css"
import { Button } from '../components/ui/Button'
import { PlusIcon } from "../icons/PlusIcon"
import { ShareIcon } from "../icons/ShareIcon"
import { Card } from "../components/ui/Card"
import { CreateContentModal } from "../components/ui/CreateContentModal"
import { useState } from "react"
import { Sidebar } from "../components/ui/Sidebar"

function Dashboard() {
  
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <div>
      <div className="border-2">
        <Sidebar />
      </div>
      <div className="p-2 ml-72 min-h-screen bg-brandgray-100">

      <CreateContentModal open={modalOpen} onClose={() => {setModalOpen(false)}} />

      <div className="flex justify-end gap-4">
        <Button variant='secondary' size='lg' startIcon={<PlusIcon size="md"/>} text='Share Brain' onClick={()=>alert("Clicked")}></Button>
        <Button variant='primary' size='lg' startIcon={<ShareIcon size="md"/>} text='Add Content' onClick={()=>{setModalOpen(true)}}></Button>
      </div>
      

      <div className="flex gap-4 p-6">
        <Card title="Fisrt card" type="youtube" link="https://www.youtube.com/watch?v=Uu2FQ2hW4_o" />
        <Card title="Fisrt card" type="youtube" link="https://www.youtube.com/watch?v=wsHt2YReQzA&t=6s" />
        
        <Card title="Second card" type="twitter" link="https://x.com/BishwaP5/status/1811428154327634194?s=20" />
        <Card title="Second card" type="twitter" link="https://x.com/merishabh_singh/status/1987919007903879417?s=20" />
        
      </div>
      
    </div>

    </div>
    
  )
}

export default Dashboard
```