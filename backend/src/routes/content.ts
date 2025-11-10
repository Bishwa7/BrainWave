
declare global {
  namespace Express {
    export interface Request {
      userId?: string;
    }
  }
}



import {Router} from "express"
import { userAuthMiddleware } from "../middlewares/userAuthMiddleware.js"
import { contentModel, linkModel } from "../models/db.js"
import { randomGenerator } from "../utils/utils.js";

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




contentRouter.post("/share", userAuthMiddleware, async (req, res) => {

    const {share} = req.body;

    if(share)
    {
        try{
            await linkModel.create({
                hash: randomGenerator(10),
                userId: req.userId
            })
        }
        catch(err)
        {
            res.json({message: "Probably user already exists", err})
        }
    }
    else{
        await linkModel.deleteOne({
            userId: req.userId
        })
    }

    res.json({
        message: "Updated sharable link"
    })
})



export default contentRouter;