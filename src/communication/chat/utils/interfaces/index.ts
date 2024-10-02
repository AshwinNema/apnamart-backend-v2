import { Prisma } from '@prisma/client';
import { UserInterface } from 'src/interfaces';
import { ChatWebSocket } from 'src/utils/types';
import { adminMerchantChatRole } from 'src/validations';

export interface adminMerchantChat {
  // Contains details of the socket,clientSocketId is the key that is created in the handleConnection method
  clientSocketMap: {
    [clientSocketId: string]: {
      client: ChatWebSocket;
      userId?: number;
      merchantRegistrationId?: number;
      role?: adminMerchantChatRole;
      merchantId?: number;
    };
  };
  // All chatRooms have a key of merchantRegistrationId and its value is an array of strings.
  // These strings are the keys of clientSocketMap. It stores which client are there in the current room
  chatRooms: {
    [merchantRegistrationId: string]: string[];
  };
  initialConnectionData: {
    chatQuery: Prisma.ChatFindManyArgs;
    user: UserInterface;
    merchantRegistrationId: number;
    role: adminMerchantChatRole;
    paginationOptions: {
      limit: number;
    };
    merchantId: number;
  };
}
