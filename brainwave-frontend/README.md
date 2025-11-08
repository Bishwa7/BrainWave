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

type variants = "primary" | "secondary"
type sizes = "sm" | "md" | "lg"

interface ButtonProps {
    variant: variants,
    size: sizes,
    text: string,
    startIcon?: any,
    endIcon?: any,
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
    return <button className={`${variantStyles[props.variant]} ${defaultStyles} ${sizeStyles[props.size]}`} onClick={()=> {}}>
        <div className="flex">
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

function App() {
  

  return (
    <>
      <Button variant='secondary' size='sm' startIcon={<PlusIcon size="md"/>} text='Share' onClick={()=>{}}></Button>
      <Button variant='secondary' size='md' text='medium' onClick={()=>{}}></Button>
      <Button variant='primary' size='lg' text='Add Content' onClick={()=>{}}></Button>
    </>
  )
}

export default App

```