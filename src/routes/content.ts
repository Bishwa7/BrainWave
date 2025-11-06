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



contentRouter.get("/fetch", (req, res) => {

})

contentRouter.delete("/delete", (req, res) => {

})

contentRouter.post("/share", (req, res) => {

})

export default contentRouter;