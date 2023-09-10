import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Message, MessageDocument } from 'src/messages/schemas/messages.schema';
import { ESocketActions } from './types/socket.types';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MessagesService } from 'src/messages/messages.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection {
  constructor(private readonly messagesService: MessagesService) {}
  @WebSocketServer()
  server: Server;

  async handleConnection(socket: Socket) {}

  @SubscribeMessage(ESocketActions.SEND_MESSAGE)
  async getMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody() content: any,
  ) {
    // store the message in database with new Messages module

    // send the message to all other sockets
    console.log('received message -> ', content);

    const message = await this.messagesService.saveMessage(content);

    this.server.sockets.emit(ESocketActions.RECEIVE_MESSAGE, message);
  }

  @SubscribeMessage(ESocketActions.GET_ALL_MESSAGES)
  async getAllMessages(@ConnectedSocket() socket: Socket) {
    // get all messages - blank for now (using Messages service)
    const messages = await this.messagesService.getAllMessages();
    socket.emit(ESocketActions.RECEIVE_ALL_MESSAGES, messages);
  }
}
