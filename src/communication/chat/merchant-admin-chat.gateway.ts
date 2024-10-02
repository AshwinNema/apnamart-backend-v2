import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UsePipes } from '@nestjs/common';
import { SocketAuthValidationPipe } from '../socket-auth-validation.pipe';
import { UserRole } from '@prisma/client';
import { ValidateAndTransformMerchantAdminChatOptions } from './validation-pipes/merchant-admin-chat.pipe';
import { v4 as uuidv4 } from 'uuid';
import { ChatWebSocket } from 'src/utils/types';
import {
  addAdminMerchantChatMsg,
  adminMerchantChat,
  handleInitialMerchantAdminChat,
  handleMerchantAdminChatDisconnect,
} from './utils';
import { ChatService } from './chat.service';

@WebSocketGateway({
  path: 'chat',
})
export class MerchantAdminChatGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  clientSocketMap: adminMerchantChat['clientSocketMap'];
  chatRooms: adminMerchantChat['chatRooms'];

  constructor(private chatService: ChatService) {
    this.clientSocketMap = {};
    this.chatRooms = {};
  }

  handleConnection(client: ChatWebSocket) {
    const id = uuidv4();
    client.id = id;
    this.clientSocketMap[id] = {
      client,
    };
  }

  handleDisconnect(client: ChatWebSocket) {
    handleMerchantAdminChatDisconnect(
      client,
      this.clientSocketMap,
      this.chatRooms,
    );
  }

  @UsePipes(new ValidateAndTransformMerchantAdminChatOptions())
  @UsePipes(
    new SocketAuthValidationPipe([UserRole.admin, UserRole.merchant], {
      includeMerchantDetails: true,
    }),
  )
  @SubscribeMessage('initiate-merchant-admin-chat')
  async initiateChat(
    @ConnectedSocket() client: ChatWebSocket,
    @MessageBody()
    data: adminMerchantChat['initialConnectionData'],
  ) {
    const { chatQuery, paginationOptions } = data;
    handleInitialMerchantAdminChat(
      client.id,
      data,
      this.clientSocketMap,
      this.chatRooms,
    );
    const chatData = await this.chatService.queryChats(
      chatQuery,
      paginationOptions,
    );
    return {
      ...chatData,
      event: 'initiate-merchant-admin-chat',
    };
  }

  @SubscribeMessage('merchant-admin-chat-msg')
  async initiateMerchantAdminChat(
    @ConnectedSocket() client: ChatWebSocket,
    @MessageBody()
    message: string,
  ) {
    const data = await addAdminMerchantChatMsg(
      message,
      client,
      this.clientSocketMap,
      this.chatService,
    );
    return {
      data,
      event: 'merchant-admin-chat-msg',
    };
  }
}
