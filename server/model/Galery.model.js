import mongoose from "mongoose";

export const GalerySchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true],
    }, 
    resultImg: {type: String},
    description: {type: String},
    postDate: {type: Date}
});

export default mongoose.model.Galeryes || mongoose.model('Galery', GalerySchema);