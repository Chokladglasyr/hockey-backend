"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const attendeeController_1 = require("../controllers/attendeeController");
const attendeeRouter = express_1.default.Router();
attendeeRouter.get('/', attendeeController_1.getAttendees);
attendeeRouter.post('/login', attendeeController_1.loginAdmin);
attendeeRouter.post('/', attendeeController_1.createAttendees);
attendeeRouter.get('/filterBanquet', attendeeController_1.filterBanquet);
attendeeRouter.get('/filterStaying', attendeeController_1.filterStaying);
exports.default = attendeeRouter;
