
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



export default contentRouter;