import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Item } from 'src/items/schemas/items.schema';
import { Staff } from 'src/staff/schemas/staff.schema';
import { User } from 'src/users/schemas/user.schema';

export type LogDocument = Log & Document;

@Schema()
export class Log {
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Staff.name,
  })
  staff: Staff;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: Item.name,
  })
  item: Item;

  @Prop({ required: true, enum: ['morning', 'evening'] })
  shift_type: string; // either 'morning' or 'evening', TODO - change this to an enumarable

  @Prop({ required: true })
  amount: number;

  @Prop({ type: Date, default: mongoose.Schema.Types.Date })
  date: Date;

  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  timestamp: Date;

  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: User.name,
  })
  author: User;

  _id: mongoose.Schema.Types.ObjectId;
}

export const LogSchema = SchemaFactory.createForClass(Log);
