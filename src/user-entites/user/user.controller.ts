import { Body, Controller, Get, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { FormDataRequest } from 'nestjs-form-data';
import {
  GetAddress,
  ProfilePhotoValidation,
  QueryLocations,
  UpdateUserAddress,
} from 'src/validations';
import { User } from 'src/decorators';
import { UserAddressService } from './user-address.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private userAddressService: UserAddressService,
  ) {}

  @Put('profile-photo')
  @FormDataRequest()
  updateProfileImg(@Body() body: ProfilePhotoValidation, @User() user) {
    return this.userService.updateProfileImg(user, body.file);
  }

  @Get('profile')
  getProfile(@User() user) {
    return user;
  }

  @Get('query-location')
  queryLocations(@Query() query: QueryLocations) {
    return this.userAddressService.queryLocations(query.input);
  }

  @Get('address')
  queryAddress(@Query() query: GetAddress) {
    return this.userAddressService.getAddress(query.lat, query.lng);
  }

  @Put('address')
  updateAddress(@Body() body: UpdateUserAddress, @User() user) {
    return this.userAddressService.updateUserAddress(body, user);
  }
}
