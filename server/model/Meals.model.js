import mongoose from "mongoose";

export const MealsSchema = new mongoose.Schema({
    username : {
        type: String,
        required : [true],
    }, 
    title: {type: String},
    mealsNumber: {type: Number},
    mealsInfo: {type: Object},
    calories: {type: Number},
    kiloSugestionOne: {type: Number},
    kiloSugestionTwo: {type: Number}, 
    mealsImage: {type: String}
});

export default mongoose.model.Meals || mongoose.model('Meal', MealsSchema);