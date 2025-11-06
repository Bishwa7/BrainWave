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