import mongoose, { Document, Schema } from "mongoose";

export interface IAttendees extends Document {
    name: string;
    email: string;
    staying: boolean;
    banquet: boolean;
    allergy: string;
    other: string;
}
const attendeeSchema: Schema = new Schema ({
    name: {type: String, required: true},
    email: {type: String, required: true},
    staying: {type: Boolean, default: false},
    banquet: {type: Boolean, default: false},
    allergy: {type: String},
    other: {type: String}
})

export const Attendee = mongoose.model<IAttendees>("Attendee", attendeeSchema);
