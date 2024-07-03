import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';
import { FeatureService } from './feature.service';
import { Roles } from 'src/auth/role/role.guard';
import { UserRole } from '@prisma/client';
import { BodyPipe } from 'src/pipes';
import { FeatureUpdateValidation, FeatureValidation } from 'src/validations';
import {
  CrtFeatureBodyTransformer,
  featureCreateTransformer,
} from './feature.utils';
import { RequestProcessor } from 'src/decorators';
import { SkipAccessAuth } from 'src/auth/jwt/access.jwt';

@Controller('feature')
export class FeatureController {
  constructor(private featureService: FeatureService) {}

  @Get(':id')
  @SkipAccessAuth()
  getFeature(@Param('id', ParseIntPipe) id: number) {
    return this.featureService.getFeatureById({ id });
  }

  @Post()
  @Roles(UserRole.admin)
  @UsePipes(new CrtFeatureBodyTransformer())
  @UsePipes(new BodyPipe(FeatureValidation, featureCreateTransformer))
  createFeature(@Body() _, @RequestProcessor() processedRequest) {
    return this.featureService.createFeature(processedRequest.body);
  }

  @Put(':id')
  @Roles(UserRole.admin)
  updateFeature(
    @Body() body: FeatureUpdateValidation,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return this.featureService.updateFeature(id, body);
  }
}
