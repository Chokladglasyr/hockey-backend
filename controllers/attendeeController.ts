import { Request, Response } from "express";
import { Attendee } from "../models/attendeeModel";
import dotenv from "dotenv";

dotenv.config();
const pw = process.env.admin_pw;
export const getAttendees = async (req: Request, res: Response) => {
    try{
        const attendees = await Attendee.find();
        if (!attendees || attendees.length === 0) {
            res.status(404).json({message: "No attendees found"})
            return;
        }
        res.json(attendees)

    }catch (err: unknown) {
        if(err instanceof Error){
            res.status(500).json({err: err.message});
            return;
        }
    }
}
export const createAttendees = async (req: Request, res: Response) => {
    try{
        const {name, email, staying, banquet, allergy, other } = req.body;
        const attendeeExists = await Attendee.findOne({email: email});
        if(attendeeExists) {
            res.status(404).json({message: "Already attending"});
            return;
        }
        const newAttendee = new Attendee ({name, email, staying, banquet, allergy, other});
        await newAttendee.save();
        res.status(201).json({message: "Thank you for signing up!"})

    }catch (err: unknown) {
        if(err instanceof Error){
            res.status(500).json({err: err.message});
            return;
        }
    }
}
export const filterBanquet = async (req: Request, res: Response) => {
    try{
        const attendees = await Attendee.find({banquet: true});
        if(!attendees || attendees.length === 0){
            res.status(404).json({message: "None found"});
            return;
        }
        res.json(attendees)

    }catch (err: unknown) {
        if(err instanceof Error){
            res.status(500).json({err: err.message});
            return;
        }
    }
}
export const filterStaying = async (req: Request, res: Response) => {
    try{
        const attendees = await Attendee.find({staying: true});
        if(!attendees || attendees.length === 0){
            res.status(404).json({message: "None found"});
            return;
        }
        res.json(attendees)

    }catch (err: unknown) {
        if(err instanceof Error){
            res.status(500).json({err: err.message});
            return;
        }
    }
}
export const loginAdmin = async (req: Request, res: Response) => {
    try{
        const {password, name} = req.body
        if (!name || !password) {
            res.status(404).json({message: "Please enter password and/or username"});
            return;
        }
        if(name != "admin" || password != pw) {
            res.status(403).json({message: "Incorrect credentials"})
            return;
        }
        res.json({message: "Pass"})

    }catch (err: unknown) {
        if(err instanceof Error){
            res.status(500).json({err: err.message});
            return;
        }
    }
}