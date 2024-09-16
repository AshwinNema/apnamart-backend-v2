import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { FormDataRequest } from 'nestjs-form-data';
import { Roles } from 'src/auth/role/role.guard';
import { RequestProcessor, User } from 'src/decorators';

import { MultiPartDataPipe } from 'src/pipes';
import {
  CreateMerchantDetails,
  MerchantDetails,
  MerchantRegistrationFile,
} from 'src/validations';
import { MerchantService } from './merchant.service';
import { ValidateAndTransformCreateRegistrationPipe } from './utils';

@Controller('merchant')
export class MerchantController {
  constructor(private merchantService: MerchantService) {}

  @Post('registration')
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

    return this.merchantService.createRegistration(data, file);
  }

  @Put('registration/image')
  @Roles(UserRole.merchant)
  @FormDataRequest()
  updateMerchantLogo(@Body() body: MerchantRegistrationFile, @User() user) {
    return this.merchantService.updateRegistrationImg(user.id, body.file);
  }

  @Put('registration')
  @Roles(UserRole.merchant)
  updateMerchantDetails(@Body() body: MerchantDetails, @User() user) {
    return this.merchantService.updateMerchantRegistration(user.id, body);
  }
}
