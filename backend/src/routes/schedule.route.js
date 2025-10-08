import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
    deleteSchedule,
    listSchedules,
    createFromPrescription
} from "../controllers/schedule.controller.js";

const router=Router();

//Create schedules from prescription
router.post('/schedules/from-prescription',authenticate,createFromPrescription);

//Delete schedule by id 
router.delete('/schedule/:id',authenticate,deleteSchedule);

//Get all schedules for logged in user
router.get('/schedules',authenticate,listSchedules);

export default router;


