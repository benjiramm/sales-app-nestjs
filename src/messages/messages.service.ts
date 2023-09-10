import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Message, MessageDocument } from './schemas/messages.schema';
import { Model } from 'mongoose';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly model: Model<MessageDocument>,
  ) {}

  async getAllMessages(): Promise<Array<Message>> {
    return await this.model.find();
  }

  async saveMessage(message: Message) {
    return await new this.model(message).save();
  }
}
