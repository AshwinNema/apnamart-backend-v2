import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ChatType, Prisma, UserRole } from '@prisma/client';
import * as _ from 'lodash';
import { MerchantRegistration2Service } from 'src/user-entites/merchant/merchant-registration/merchant-registration2.service';
import { initialAdminMerchantChat, validateObject } from 'src/validations';

@Injectable()
export class ValidateAndTransformMerchantAdminChatOptions
  implements PipeTransform
{
  merchantRegistrationService: MerchantRegistration2Service;

  constructor() {
    this.merchantRegistrationService = new MerchantRegistration2Service();
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'body') return value;
    const options = _.pick(value, ['limit', 'merchantRegistrationId', 'role']);

    const { error, message } = await validateObject(
      options,
      initialAdminMerchantChat,
      {
        whitelist: true,
        forbidNonWhitelisted: true,
      },
    );

    if (error) throw new WsException(message);
    const isMerchantRole = options?.role === UserRole.merchant;
    const merchantRegistrationId = isMerchantRole
      ? value?.user?.merchantDetails?.id
      : options.merchantRegistrationId;
    if (!merchantRegistrationId)
      throw new WsException('Merchant Registration not found');
    let merchantId = isMerchantRole ? value?.user?.id : null;

    if (!isMerchantRole) {
      const registrationDetails =
        await this.merchantRegistrationService.getOneMerchantRegistration({
          where: { id: merchantRegistrationId },
        });

      if (!registrationDetails)
        throw new WsException('Merchant registration not found');

      merchantId = registrationDetails.userId;
    }

    const chatQuery: Prisma.ChatFindManyArgs = {
      where: {
        chatType: ChatType.merchant_registration,
        entityModelId: merchantRegistrationId,
      },
      orderBy: {
        messageTime: 'desc',
      },
    };

    return {
      chatQuery,
      user: value.user,
      merchantRegistrationId,
      role: value.role,
      paginationOptions: {
        limit: options.limit,
      },
      merchantId,
    };
  }
}
