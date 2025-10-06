import { Router } from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import {
    createSchedule,
    deleteSchedule,
    listSchedules 
} from "../controllers/schedule.controller.js";

const router=Router();

// Create new schedule
router.post('/schedule',authenticate,createSchedule);

//Delete schedule by id 
router.delete('/schedule/:id',authenticate,deleteSchedule);

//Get all schedules for logged in user
router.get('/schedules',authenticate,listSchedules);

export default router;


