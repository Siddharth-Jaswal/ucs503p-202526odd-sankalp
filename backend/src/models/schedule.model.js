import mongoose from "mongoose";

const scheduleSchema=new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    phone:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    cronTime:{
        type: String,
        required: true,
    },
    active:{
        type: Boolean,
        default: true,
    }
},{timestamps: true});

export const Schedule=mongoose.model('Schedule',scheduleSchema);


