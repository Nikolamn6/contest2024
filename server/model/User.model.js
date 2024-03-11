import mongoose from "mongoose";

export const UserSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true, "Потребителското име е заето"],
        unique: [true, "Потребителското име е заето"]
    },
    password: {
        type: String,
        required: [true, "Моля въведете парола"],
        unique : false,
    },
    email: {
        type: String,
        required : [true, "Email-ът е зает"],
        unique: true,
    },
    firstName: { 
        type: String, 
        required: [true, "Моля въведете име"],
        unique : false,
    },
    lastName: { 
        type: String,
        required: [true, "Моля въведете име"],
        unique : false,
    },
    job : { type : String},
    kilos: { type: Number},
    goalKilos: {type: Number},
    profile: { type: String}
}
// ,{collection: ""}
);

export default mongoose.model.Users || mongoose.model('User', UserSchema);