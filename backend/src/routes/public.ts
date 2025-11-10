import {Router} from "express"
import { contentModel, linkModel, userModel } from "../models/db.js"
const publicRouter = Router()



publicRouter.get("/:shareLink", async (req, res) => {

    const hash = req.params.shareLink

    try{
        const link = await linkModel.findOne({
            hash: hash
        })

        if(!link)
        {
            res.json({ message: "Incorrect link"})
            return;
        }

        const content = await contentModel.find({
            userId : link.userId
        }).select("title link tags")

        const user = await userModel.findOne({
            _id: link.userId
        })


        res.json({
            userName: user?.userName,
            content
        })


    }
    catch(err)
    {
        res.json({err})
    }
    
})



export default publicRouter;