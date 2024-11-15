import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketService } from './websocket.service';

@WebSocketGateway()
export class WebsocketController
  implements OnGatewayConnection, OnGatewayDisconnect
{
  constructor(private readonly websocketService: WebsocketService) {}

  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id} `);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnect: ${client.id} `);
  }

  @SubscribeMessage('messageAll')
  sendMessageforAll(@MessageBody() data: any) {
    this.server.emit('messageServerAll', data);
  }

  @SubscribeMessage('messageNotMe')
  sendMessageNotMe(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    client.broadcast.emit('messageServerNotMe', data);
  }

  @SubscribeMessage('createLanguage')
  async createLanguage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: any,
  ) {
    await this.websocketService.createLanguage(data, 1);
    client.broadcast.emit(
      'updateLanguage',
      `Nuevo lenguage agregado!! ${data.name}`,
    );
  }
}
