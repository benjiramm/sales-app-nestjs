import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ItemDocument = Item & Document

@Schema()
export class Item {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    value_morning: number

    @Prop({required: true})
    value_evening: number

    @Prop()
    icon: string

    _id: string;
}

export const ItemSchema = SchemaFactory.createForClass(Item)