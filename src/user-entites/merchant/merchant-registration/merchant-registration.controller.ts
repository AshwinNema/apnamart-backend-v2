import { Body, Controller, Post, Put, UsePipes } from '@nestjs/common';
import { MerchantRegistrationStatus, UserRole } from '@prisma/client';
import { FormDataRequest } from 'nestjs-form-data';
import { Roles } from 'src/auth/role/role.guard';
import { RequestProcessor, User } from 'src/decorators';
import { MultiPartDataPipe } from 'src/pipes';
import {
  CreateMerchantDetails,
  MerchantDetails,
  MerchantRegistrationFile,
} from 'src/validations';
import { MerchantRegistrationService } from './/merchant-registration.service';
import { ValidateAndTransformCreateRegistrationPipe } from '../utils';

@Controller('registration')
export class MerchantRegistrationController {
  constructor(
    private merchantRegistrationService: MerchantRegistrationService,
  ) {}

  @Post()
  @UsePipes(new ValidateAndTransformCreateRegistrationPipe())
  @UsePipes(new MultiPartDataPipe(MerchantDetails))
  @FormDataRequest()
  @Roles(UserRole.merchant)
  register(
    @Body() _: CreateMerchantDetails,
    @RequestProcessor() procesedRequest,
  ) {
    const {
      body: { file, data },
    } = procesedRequest;

    return this.merchantRegistrationService.createRegistration(data, file);
  }

  @Put('/image')
  @Roles(UserRole.merchant)
  @FormDataRequest()
  updateMerchantLogo(@Body() body: MerchantRegistrationFile, @User() user) {
    return this.merchantRegistrationService.updateRegistrationImg(
      user.id,
      body.file,
    );
  }

  @Put()
  @Roles(UserRole.merchant)
  updateMerchantDetails(@Body() body: MerchantDetails, @User() user) {
    return this.merchantRegistrationService.updateMerchantRegistration(
      user.id,
      body,
      {
        registrationStatus: { not: MerchantRegistrationStatus.review_by_admin },
      },
      'Details cannot be updated when details are being edited by the admin',
    );
  }
}
