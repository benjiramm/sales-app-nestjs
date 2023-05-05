import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import dayjs from "dayjs";
import { Date, Mongoose } from "mongoose";


export type StaffDocument = Staff & Document

@Schema()
export class Staff {
    @Prop({required: true})
    name: string;

    _id: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff)