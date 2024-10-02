import { WsException } from '@nestjs/websockets';
import { ChatType } from '@prisma/client';
import { ChatWebSocket } from 'src/utils/types';
import { ChatService } from '../chat.service';
import { adminMerchantChat } from './interfaces';

export const handleMerchantAdminChatDisconnect = (
  client: ChatWebSocket,
  clientSocketMap: adminMerchantChat['clientSocketMap'],
  chatRooms: adminMerchantChat['chatRooms'],
) => {
  const clientId = client?.id || '';
  const merchantRegistrationId =
    clientSocketMap[clientId]?.merchantRegistrationId || '';
  delete clientSocketMap[clientId];
  const chatRoom = chatRooms[`${merchantRegistrationId}`];
  if (!chatRoom) return;
  chatRooms[`${merchantRegistrationId}`] = chatRoom.filter(
    (socketId) => socketId !== clientId,
  );
  const isEmptyRoom = !chatRooms[`${merchantRegistrationId}`].length;
  if (isEmptyRoom) {
    delete chatRooms[`${merchantRegistrationId}`];
  }
};

export const handleInitialMerchantAdminChat = (
  clientId: string,
  data: adminMerchantChat['initialConnectionData'],
  clientSocketMap: adminMerchantChat['clientSocketMap'],
  chatRooms: adminMerchantChat['chatRooms'],
) => {
  const { merchantRegistrationId, user, role, merchantId } = data;
  clientSocketMap[clientId].userId = user.id;
  clientSocketMap[clientId].merchantRegistrationId = merchantRegistrationId;
  clientSocketMap[clientId].role = role;
  clientSocketMap[clientId].merchantId = merchantId;
  let chatRoom = chatRooms[merchantRegistrationId];
  if (!chatRoom) {
    chatRoom = [];
    chatRooms[merchantRegistrationId] = chatRoom;
  }
  if (!chatRoom.includes(clientId)) {
    chatRoom.push(clientId);
  }
};

export const addAdminMerchantChatMsg = async (
  message: string,
  client: ChatWebSocket,
  clientSocketMap: adminMerchantChat['clientSocketMap'],
  chatService: ChatService,
) => {
  if (typeof message !== 'string') {
    throw new WsException('Message should be a string');
  }
  const clientId = client.id;
  const socketDetails = clientSocketMap[clientId];
  const chatRoomId = socketDetails?.merchantRegistrationId;
  const senderId = socketDetails?.userId;
  const merchantId = socketDetails.merchantId;
  const receiverId = merchantId !== senderId ? merchantId : null;
  if (!chatRoomId)
    throw new WsException(
      'Please initiate the chat first before sending message',
    );
  const msg = await chatService.createChatMsg({
    message,
    senderId,
    chatType: ChatType.merchant_registration,
    entityModelId: chatRoomId,
    messageTime: new Date(),
    receiverId,
  });
  return msg;
};
