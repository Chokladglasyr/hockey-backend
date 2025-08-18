"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginAdmin = exports.filterStaying = exports.filterBanquet = exports.createAttendees = exports.getAttendees = void 0;
const attendeeModel_1 = require("../models/attendeeModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const pw = process.env.admin_pw;
const getAttendees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendees = yield attendeeModel_1.Attendee.find();
        if (!attendees || attendees.length === 0) {
            res.status(404).json({ message: "No attendees found" });
            return;
        }
        res.json(attendees);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ err: err.message });
            return;
        }
    }
});
exports.getAttendees = getAttendees;
const createAttendees = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, staying, banquet, allergy, other } = req.body;
        const attendeeExists = yield attendeeModel_1.Attendee.findOne({ email: email });
        if (attendeeExists) {
            res.status(404).json({ message: "Already attending" });
            return;
        }
        const newAttendee = new attendeeModel_1.Attendee({ name, email, staying, banquet, allergy, other });
        yield newAttendee.save();
        res.status(201).json({ newAttendee });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ err: err.message });
            return;
        }
    }
});
exports.createAttendees = createAttendees;
const filterBanquet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendees = yield attendeeModel_1.Attendee.find({ banquet: true });
        if (!attendees || attendees.length === 0) {
            res.status(404).json({ message: "None found" });
            return;
        }
        res.json(attendees);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ err: err.message });
            return;
        }
    }
});
exports.filterBanquet = filterBanquet;
const filterStaying = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const attendees = yield attendeeModel_1.Attendee.find({ staying: true });
        if (!attendees || attendees.length === 0) {
            res.status(404).json({ message: "None found" });
            return;
        }
        res.json(attendees);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ err: err.message });
            return;
        }
    }
});
exports.filterStaying = filterStaying;
const loginAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { password, name } = req.body;
        if (!name || !password) {
            res.status(404).json({ message: "Please enter password and/or username" });
            return;
        }
        if (name != "admin" || password != pw) {
            res.status(403).json({ message: "Incorrect credentials" });
            return;
        }
        res.json({ message: "Pass" });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ err: err.message });
            return;
        }
    }
});
exports.loginAdmin = loginAdmin;
