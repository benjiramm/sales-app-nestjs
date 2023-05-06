import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Date } from "mongoose";


export type LogDocument = Log & Document

@Schema()
export class Log {
    @Prop({required: true})
    staff: string

    @Prop({required: true})
    item: string

    @Prop({required: true})
    shift_type: string // either 'morning' or 'evening', TODO - change this to an enumarable

    @Prop({required: true})
    amount: number

    @Prop({required: true}) // format: DD/MM/YYYY
    date: string

    @Prop({required: true, type: Date})
    timestamp: Date

    @Prop({required: true})
    author: string

    _id: string
}

export const LogSchema = SchemaFactory.createForClass(Log)