import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { FeatureOptionService } from './feature-option.service';
import { Roles } from 'src/auth/role/role.guard';
import { UserRole } from '@prisma/client';
import {
  FeatureOptionCrtValidation,
  FeatureOptionValidation,
} from 'src/validations';
import { User } from 'src/decorators';
import { UserInterface } from 'src/interfaces';

@Controller('feature-option')
export class FeatureOptionController {
  constructor(private featureOptionService: FeatureOptionService) {}

  @Post()
  @Roles(UserRole.admin)
  createFeatureOption(
    @Body() body: FeatureOptionCrtValidation,
    @User() user: UserInterface,
  ) {
    return this.featureOptionService.createFeatureOption({
      createdBy: user.id,
      ...body,
    });
  }

  @Put(':id')
  @Roles(UserRole.admin)
  updateFeatureOption(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: FeatureOptionValidation,
  ) {
    return this.featureOptionService.update({ id }, body);
  }
}
