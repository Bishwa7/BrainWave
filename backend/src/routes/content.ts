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




contentRouter.post("/share", (req, res) => {

})

export default contentRouter;