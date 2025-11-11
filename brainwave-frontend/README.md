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
}
```
<br/>

- creating generic button component (ui library)

src/components/ui/Buttons.tsx

```typescript
import "../../index.css"
import type { ReactElement } from "react"

type variants = "primary" | "secondary"
type sizes = "sm" | "md" | "lg"

interface ButtonProps {
    variant: variants,
    size: sizes,
    text: string,
    startIcon?: ReactElement,
    endIcon?: ReactElement,
    onClick: () => void
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
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]} cursor-pointer`} onClick={props.onClick}>
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

type iconSizes = "sm" | "md" | "lg"


type iconSizeStruc = Record<iconSizes, string>

export const iconSizeStyles : iconSizeStruc ={
    "sm" : "size-2",
    "md" : "size-4",
    "lg" : "size-6"
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