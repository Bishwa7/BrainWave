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