import express from "express"
import { createAttendees, filterBanquet, filterStaying, getAttendees, loginAdmin } from "../controllers/attendeeController";

const attendeeRouter = express.Router();

attendeeRouter.get('/', getAttendees);
attendeeRouter.post('/login', loginAdmin);
attendeeRouter.post('/', createAttendees);
attendeeRouter.get('/filterBanquet', filterBanquet)
attendeeRouter.get('/filterStaying', filterStaying)

export default attendeeRouter;