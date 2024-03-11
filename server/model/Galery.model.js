import mongoose from "mongoose";

export const GalerySchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true],
    }, 
    resultImg: {type: String},
    postDate: {type: Date},
    description: {type: String}
});

export default mongoose.model.Galery || mongoose.model('Galery', GalerySchema);