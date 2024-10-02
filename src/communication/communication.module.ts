import { Module } from '@nestjs/common';
import { NotificationService } from './notification/notification.service';
import { MerchantAdminChatGateway } from './chat/merchant-admin-chat.gateway';
import { TokenVerificationService } from 'src/auth/token/token-verification.service';
import { ChatService } from './chat/chat.service';
import { CommonService } from 'src/common/common.service';
import { MerchantRegistration2Service } from 'src/user-entites/merchant/merchant-registration/merchant-registration2.service';

@Module({
  providers: [
    NotificationService,
    MerchantAdminChatGateway,
    TokenVerificationService,
    ChatService,
    CommonService,
    MerchantRegistration2Service,
  ],
  exports: [NotificationService, MerchantAdminChatGateway, ChatService],
})
export class CommunicationModule {}
