import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type StaffDocument = Staff & Document

@Schema()
export class Staff {
    @Prop({required: true})
    staff_name: string;

    _id: mongoose.Schema.Types.ObjectId;
}

export const StaffSchema = SchemaFactory.createForClass(Staff)