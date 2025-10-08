import {Schema} from "mongoose";
import mongoose from "mongoose";

const scheduleSchema=new Schema({
    user:{
        type: Schema.Types.ObjectId,
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
    remainingRuns:{
        type: Number,
        default: 1,
    },
    active:{
        type: Boolean,
        default: true,
    }
},{timestamps: true});

export const Schedule=mongoose.model('Schedule',scheduleSchema);


