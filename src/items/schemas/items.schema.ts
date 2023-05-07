import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type ItemDocument = Item & Document

@Schema()
export class Item {
    @Prop({required: true})
    item_name: string;

    @Prop({required: true})
    value_morning: number

    @Prop({required: true})
    value_evening: number

    @Prop()
    icon: string

    _id: mongoose.Types.ObjectId;
}

export const ItemSchema = SchemaFactory.createForClass(Item)