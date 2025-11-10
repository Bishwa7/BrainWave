# Steps for backend creation:

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



### Step 5 - 
- completed signup and signin routes for user in /routes/user.ts
- added/change in tsconfig.json
- added /config/config.ts which imports environment variables from .env and then exports it to every other file
- added build, start and dev scripts in package.json

dependencies-
```
npm install zod bcrypt jsonwebtoken
npm i --save-dev @types/bcrypt
npm i --save-dev @types/jsonwebtoken
```

/routes/user.ts
```typescript
import { Router } from "express";
const userRouter = Router();
import {z} from "zod"
import bcrypt from "bcrypt";
import { userModel } from "../models/db.js";
import jwt from "jsonwebtoken"
import { JWT_SECRET_USER } from "../config/config.js";

userRouter.post("/signup", async (req, res) => {
    const requiredBody = z.object({
        email: z.email(),
        userName: z.string().min(5).max(30),
        password: z.string().min(8).max(20)
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one number." })
        .regex(/[^A-Za-z0-9]/, { message: "Password must contain at least one special character." })
    })


    const parsedData = requiredBody.safeParse(req.body);

    if(!parsedData.success){
        res.status(411).json({
            message: "incorrect input format",
            error: parsedData.error
        })
        return
    }

    const {email, userName, password} = req.body;
    
    try{
        const hashedPassword = await bcrypt.hash(password, 5)

        await userModel.create({
            email: email,
            userName: userName,
            password: hashedPassword
        })

        res.status(200).json({
            message: "You are signed up"
        })
    }
    catch(e){
        console.log("error while signup (db entry)")

        res.status(403).json({
            message: "User already exists"
        })
    }

})

userRouter.post("/signin", async (req, res) => {
    
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email: email
    })

    if(user)
    {
        const passwordMatch = await bcrypt.compare(password, user.password)

        if(passwordMatch)
        {
            const token = jwt.sign({ id: user._id }, JWT_SECRET_USER!)

            res.status(200).json({
                message: "Login Succesfull",
                token: token
            })

        }
        else{
            res.status(403).json({
                message: "Password incorrect"
            })
        }  
    }
    else
    {
        res.status(403).json({
            message: "Email incorrect"
        })
    }
})

export default userRouter;
```


- added/change in tsconfig.json
```javascript
{
  "compilerOptions": {
    "allowSyntheticDefaultImports": true
  }
}
```

- added /config/config.ts which imports environment variables from .env and then exports it to every other file
/config/config.ts
```typescript
import dotenv from "dotenv"
dotenv.config()

export const JWT_SECRET_USER = process.env.JWT_SECRET_USER;
```

.env.example
```
MONGO_URL = mongodb://[username:password@]host1[:port1][,...hostN[:portN]]/[defaultauthdb]
JWT_SECRET_USER = ExampleStringforJWT
```


- added build, start and dev scripts in package.json
```javascript
{
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "tsc -b",
    "start": "node dist/index.js",
    "dev": "npm run build && npm run start"
  }
}
```


<br/><br/>



### Step 6 - 
- route for adding content in routes/content.ts (modification needed)
- contentSchema added in models/db.ts (modification needed)
- userAuthMiddleware added in middlewares/userAuthMiddleware.ts (modification needed)


routes/content.ts - 
```typescript
import {Router} from "express"
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js"
import { contentModel } from "../models/db.js"
const contentRouter = Router()

contentRouter.post("/add", userAuthMiddleware, async (req, res) => {
    const { title, link} = req.body;

    try{
        await contentModel.create({
            title,
            link,
            // type,
            //@ts-ignore
            userId: req.userId,
            tags:[]
        })

        res.status(201).json({
            message:"Content added"
        })
    }
    catch(err)
    {
        console.log(err)
        res.json({
            message:"db error while adding content"
        })
    }    
})
```

models/db.ts - 
```typescript
// const contentTypes = ['image','video','article','audio'];

const contentSchema = new Schema({
    title: {type: String, required: true},
    link: {type: String, required: true},
    // type: {type: String, enum: contentTypes, required: true},
    tags: [{type: ObjectId, ref: 'Tag'}],
    userId: {type: ObjectId, ref: 'User', required: true}
})

export const contentModel = model("Content", contentSchema)
```

middlewares/userAuthMiddleware.ts - 
```typescript
import jwt from "jsonwebtoken"
import { JWT_SECRET_USER } from "../config/config.js"
import type { NextFunction, Request, Response } from "express"

export const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) =>
{
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
        .status(401)
        .json({ message: "Authorization header is missing or malformed" });
    }

    // if(authHeader){
    //     const token = authHeader.split(" ")[1];

    //     jwt.verify(token!, JWT_SECRET_USER!, (err, decoded)=>{
    //         if(err)
    //         {
    //             res.status(401).send({
    //                 message: "unauthorized1"
    //             })
    //         }
    //         else{
    //             //@ts-ignore
    //             req.userId = decoded.id;
    //             next();
    //         }
    //     })
    // }
    // else{
    //     res.status(401).send({
    //         message: "unauthorized2"
    //     })
    // }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token! ,JWT_SECRET_USER!) //as { id?: string };

        //@ts-ignore
        if (!decoded.id) {
        return res.status(403).json({ message: "Invalid token payload" });
        }

        //@ts-ignore
        req.userId = decoded.id;
        next();
    } 
    catch (err) 
    {
        return res.status(403).json({ message: "Invalid or expired token" });
    }

}
```

<br/><br/>


### Step 7 - 
- added route for fetching content and deleting content from contentModel(DataBase) in routes/content.ts

routes/content.ts
```typescript
contentRouter.get("/fetch", userAuthMiddleware, async (req, res) => {
    //@ts-ignore
    const userId = req.userId
    
    try{
        const content = await contentModel.find({
            userId: userId
        }).populate("userId", "userName")

        res.json({
            content
        })
    }
    catch(err)
    {
        console.log(err)
        res.json({
            message:"db error while fetching data from contentModel"
        })
    }
})




contentRouter.delete("/delete", userAuthMiddleware, async (req, res) => {

    const contentId = req.body.contentId
    //@ts-ignore
    const userId = req.userId

    try{
        await contentModel.deleteMany({
            _id: contentId,
            userId: userId
        })

        res.json({
            message: "Content Deleted"
        })
    }
    catch(err)
    {
        console.log(err)
        res.json({
            message:"db error while deleting content"
        })
    }
})

```


<br/><br/>

### Step 8 - 
- removed //@ts-ignore from ./routes/content.ts
- removed //@ts-ignore from ./middlewares/userAuthMiddleware.ts

Note- to remove the //@ts-ignore from ./routes/content.ts and ./middlewares/userAuthMiddleware.ts, we need to override the types of Request which are imported from express in userAuthMiddleware. <br/>

Following code added for overriding types of Request in ./routes/content.ts because userAuthMiddleware used in this files routes
```typescript
declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}
```


<br/>

./routes/content.ts
```typescript
declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}

import {Router} from "express"
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js"
import { contentModel } from "../models/db.js"
const contentRouter = Router()


contentRouter.post("/add", userAuthMiddleware, async (req, res) => {
    const { title, link} = req.body;

    try{
        await contentModel.create({
            title,
            link,
            // type,
            userId: req.userId,
            tags:[]
        })

        res.status(201).json({
            message:"Content added"
        })
    }
    catch(err)
    {
        console.log(err)
        res.json({
            message:"db error while adding content"
        })
    }    
})


contentRouter.get("/fetch", userAuthMiddleware, async (req, res) => {
    
    const userId = req.userId
    
    try{
        const content = await contentModel.find({
            userId: userId
        }).populate("userId", "userName")

        res.json({
            content
        })
    }
    catch(err)
    {
        console.log(err)
        res.json({
            message:"db error while fetching data from contentModel"
        })
    }
})


contentRouter.delete("/delete", userAuthMiddleware, async (req, res) => {

    const contentId = req.body.contentId    
    const userId = req.userId

    try{
        await contentModel.deleteMany({
            _id: contentId,
            userId: userId
        })

        res.json({
            message: "Content Deleted"
        })
    }
    catch(err)
    {
        console.log(err)
        res.json({
            message:"db error while deleting content"
        })
    }
})


contentRouter.post("/share", (req, res) => {

})

export default contentRouter;
```


./middlewares/userAuthMiddleware.ts
```typescript
import jwt from "jsonwebtoken"
import { JWT_SECRET_USER } from "../config/config.js"
import type { NextFunction, Request, Response } from "express"


export const userAuthMiddleware = (req: Request, res: Response, next: NextFunction) =>
{
    const authHeader = req.headers["authorization"];

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res
        .status(401)
        .json({ message: "Authorization header is missing or malformed" });
    }

    // if(authHeader){
    //     const token = authHeader.split(" ")[1];

    //     jwt.verify(token!, JWT_SECRET_USER!, (err, decoded)=>{
    //         if(err)
    //         {
    //             res.status(401).send({
    //                 message: "unauthorized1"
    //             })
    //         }
    //         else{
    //             //@ts-ignore
    //             req.userId = decoded.id;
    //             next();
    //         }
    //     })
    // }
    // else{
    //     res.status(401).send({
    //         message: "unauthorized2"
    //     })
    // }

    const token = authHeader.split(" ")[1];
    try {
        const decoded = jwt.verify(token! ,JWT_SECRET_USER!) as { id?: string };

        if (!decoded.id) {
        return res.status(403).json({ message: "Invalid token payload" });
        }
        
        req.userId = decoded.id;
        next();
    } 
    catch (err) 
    {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
```

<br/><br/>


### Step 9 - 
- added content share route in ./src/routes/content.ts
- added linkSchema (for content share route) in ./src/models/db.ts
- added random string generator in ./src/utils/utils.ts (used in content share route)

./src/routes/content.ts
```typescript
import { contentModel, linkModel } from "../models/db.js"
import { randomGenerator } from "../utils/utils.js";

contentRouter.post("/share", userAuthMiddleware, async (req, res) => {

    const {share} = req.body;

    if(share)
    {
        try{
            const alreadyShared = await linkModel.findOne({
                userId: req.userId
            })

            if(alreadyShared)
            {
                res.json({
                    hash: alreadyShared.hash
                })

                return;
            }


            const hash = randomGenerator(10)

            await linkModel.create({
                hash: hash,
                userId: req.userId
            })

            res.json({hash})
        }
        catch(err)
        {
            res.json({err})
        }

        
    }
    else{
        try{
            await linkModel.deleteOne({
                userId: req.userId
            })

            res.json({
                message: "Deleted Shareable Link"
            })
        }
        catch(err)
        {
            res.json({message:"Probaly already deleted shared link", err})
        }
    }
})
```


./src/models/db.ts
```typescript
const linkShema = new Schema({
    hash: String,
    userId: {type: ObjectId, ref: 'User', required: true, unique: true}
})

export const linkModel = model("Links", linkShema)
```


./src/utils/utils.ts
```typescript
export const randomGenerator = (len: number) => {

    let options = "randomStirng10Bishwa7RoanldoGeneratorOptions75e987w7e87sdcvh2VUIK77y87"
    let length = options.length
    let ans = ""

    for(let i=0; i<len; i++)
    {
        ans += options[Math.floor(Math.random() * length)]
    }

    return ans
}
```