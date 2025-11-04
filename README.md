# BrainWave
BrainWave ,a TypeScript project, is a personal knowledge management application designed to help users store, organize, and retrieve information effortlessly from multiple content sources like - Twitter, YouTube, Google Docs, and more — all in one centralized hub. Second Brain enables users to build a personal digital repository that grows with them over time.

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

## Steps for Project creation:

### Step 1 -
- initializing the project - 
```
npm init -y
```
- installing TypeScript as a dev dependency & initializing ts project -
```
npm install -D typescript

npx tsc --init
```

- change rootDir and outDir in tsconfig.json
```javascript
"rootDir": "./src",
"outDir": "./dist"
```
<br/>

- install express - 
```
npm install express
```
<br/>

- src/index.ts - 
```typescript
import express from "express"
const app = express()
```

<br/>

- add/change in tsconfig.json
```javascript
{
  "compilerOptions": {
    "module": "ESNext",     // or "NodeNext"
    "target": "ES2020",     // or higher
    "moduleResolution": "NodeNext", 
    "esModuleInterop": true,
    "skipLibCheck": true
  }
}

```

- change in package.json -
```javascript
{
  "type": "module"
}

```

<br/><br/>

### Step 2 - 
- added skeleton route handlers

index.ts
```typescript
import express from "express"
const app = express()
app.use(express.json())

app.post("/api/v1/signup", (req, res) => {

})


app.post("/api/v1/signin", (req, res) => {
    
})


app.post("/api/v1/content", (req, res) => {
    
})


app.get("/api/v1/content", (req, res) => {
    
})


app.delete("/api/v1/signup", (req, res) => {
    
})


app.post("/api/v1/brain/share", (req, res) => {
    
})


app.get("/api/v1/brain/:shareLink", (req, res) => {
    
})


app.listen(3000)
```

<br/><br/>


### Step 3 -
- added express routing for user, content and public routes

index.ts
```typescript
import express from "express"
import userRouter from "./routes/user.js"
import contentRouter from "./routes/content.js"
import publicRouter from "./routes/public.js"

const app = express()
app.use(express.json())

app.use("/api/v1/user", userRouter)
app.use("/api/v1/content", contentRouter)
app.use("/api/v1/brain", publicRouter)


app.listen(3000)
```

user.ts
```typescript
import { Router } from "express";
const userRouter = Router();

userRouter.post("/signup", (req, res) => {
    res.json({
        message: "You are signed up"
    })
})

userRouter.post("/signin", (req, res) => {
    res.json({
        message: "You are signed in"
    })
})

export default userRouter;
```

content.ts
```typescript
import {Router} from "express"
const contentRouter = Router()

contentRouter.post("/add", (req, res) => {

})

contentRouter.get("/fetch", (req, res) => {

})

contentRouter.delete("/delete", (req, res) => {

})

contentRouter.post("/share", (req, res) => {

})

export default contentRouter;
```

public.ts
```typescript
import {Router} from "express"
const publicRouter = Router()

publicRouter.get("/:shareLink", (req, res) => {

})


export default publicRouter;
```

<br/><br/>



### Step 4 - 
- defining the user Schema and model in db.ts
- connecting moongoose in index.ts with dotenv

dependencies
```
npm install mongoose dotenv
```

db.ts
```typescript
import {Schema, model} from "mongoose"


const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    userName: {type: String, required: true},
    password: {type: String, required: true}
})



export const userModel = model("user", userSchema)
```

index.ts
```typescript
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"


async function main(){
    if (!process.env.MONGO_URL) {
    throw new Error("MONGO_URL not found in .env file");
  }

  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected to MongoDB");

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
}

main().catch(err => console.log(err));
```

.env.example
```
MONGO_URL = mongodb://[username:password@]host1[:port1][,...hostN[:portN]]/[defaultauthdb]
```

<br/><br/>