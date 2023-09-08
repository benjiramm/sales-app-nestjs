import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type MessageDocument = Message & Document;

@Schema()
export class Message {
  @Prop({ required: true })
  author_id: string;

  @Prop({ required: true })
  author_name: string;

  @Prop({ required: true })
  content: string;

  @Prop({ default: false })
  timestamp: string;

  _id: mongoose.Types.ObjectId;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
