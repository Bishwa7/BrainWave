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