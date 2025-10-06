import { Schedule } from "../models/schedule.model.js";
import {
    scheduleMessage,
    cancelScheduleById
} from "../services/whatsapp.service.js";

const createSchedule=async(req,res)=>{
    try{
        const { phone,message,cronTime }=req.body;
        const userId=req.user?._id;

        if(!userId){
            return res.status(401).json({ success: false,message: "Unauthorized" });
        }

        const doc=await Schedule.create({ user: userId,phone,message,cronTime });
        scheduleMessage(doc);
        res.json({ success: true,message: "Schedule added",data: doc });

    }catch(err){
        res.status(500).json({ success: false,error: err.message });
    }
}

const deleteSchedule=async(req,res)=>{
    try{
        const id=req.params.id;
        const doc=await Schedule.findByIdAndDelete(id);
        await cancelScheduleById(String(id));
        res.json({ success: true,message: doc ? "Schedule removed" : "Schedule not found" });
    }catch(err){
        res.status(500).json({ success: false,error: err.message });
    }
}

const listSchedules=async(req,res)=>{
    try{
        const userId=req.user?._id;
        if(!userId){
            return res.status(401).json({ success: false,message: "Unauthorized" });
        }
        const data=await Schedule.find({ user: userId });
        res.json(data);
    }catch(err){
        res.status(500).json({ success: false,error: err.message });
    }
}

export {
    createSchedule,
    deleteSchedule,
    listSchedules
};


