// import mongoose from "mongoose";

// const PostSchema = new mongoose.Schema({
//     title:String,
//     summary:String,
//     content:String,
//     cover:String,
//     author:{type:Schema.Types.ObjectId, ref:'User'},
//   }, {
//     timestamps: true,
//   });
  
//   const PostModel = mongoose.model('Post', PostSchema);
  
//   module.exports = PostModel;

import mongoose from "mongoose";

export const PostSchema = new mongoose.Schema({
    title:String,
    summary:String,
    content:String,
    cover:String,
    // author:{type:Schema.Types.ObjectId, ref:'User'},
    author: String
}
// ,{timestamps: true,}
);

export default mongoose.model.Posts || mongoose.model('Post', PostSchema);