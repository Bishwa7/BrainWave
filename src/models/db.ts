import mongoose, {Schema, model} from "mongoose"
const ObjectId = mongoose.Types.ObjectId

const userSchema = new Schema({
    email: {type: String, required: true, unique: true},
    userName: {type: String, required: true},
    password: {type: String, required: true}
})



// const contentTypes = ['image','video','article','audio'];

const contentSchema = new Schema({
    title: {type: String, required: true},
    link: {type: String, required: true},
    // type: {type: String, enum: contentTypes, required: true},
    tags: [{type: ObjectId, ref: 'Tag'}],
    userId: {type: ObjectId, ref: 'User', required: true}
})




export const userModel = model("User", userSchema)
export const contentModel = model("Content", contentSchema)