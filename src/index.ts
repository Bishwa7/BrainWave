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