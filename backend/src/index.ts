import dotenv from "dotenv"
dotenv.config()

import express from "express"
import userRouter from "./routes/user.js"
import contentRouter from "./routes/content.js"
import publicRouter from "./routes/public.js"
import mongoose from "mongoose"
import cors from "cors"


const app = express()
app.use(express.json())
app.use(cors())


app.use("/api/v1/user", userRouter)
app.use("/api/v1/content", contentRouter)
app.use("/api/v1/brain", publicRouter)





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