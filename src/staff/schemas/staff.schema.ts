import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type StaffDocument = Staff & Document

@Schema()
export class Staff {
    @Prop({required: true})
    name: string;

    _id: string;
}

export const StaffSchema = SchemaFactory.createForClass(Staff)