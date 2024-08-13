import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
import { UserInterface } from 'src/interfaces';
import prisma from 'src/prisma/client';
import { axiosMethods, makeAxiosConfig } from 'src/utils';
import endpoints from 'src/utils/endpoints';

@Injectable()
export class UserAddressService {
  ola_api_key: string;
  constructor(private configService: ConfigService) {
    this.ola_api_key = this.configService.get('ola_maps').api_key;
  }
  async queryLocations(input: string) {
    const config = makeAxiosConfig(
      axiosMethods.get,
      endpoints.ola_query_location,
      { api_key: this.ola_api_key, input },
      null,
    );

    const data = await axios(config);

    return data.data;
  }

  async getAddress(lat: number, lng: number) {
    const config = makeAxiosConfig(
      axiosMethods.get,
      endpoints.ola_get_address,
      { api_key: this.ola_api_key },
      null,
    );
    config.url += `&latlng=${lat},${lng}`;
    const data = await axios(config);

    return data.data;
  }

  async updateUserAddress(update, user: UserInterface) {
    return prisma.userAddress.upsert({
      where: { userId: user.id },
      update,
      create: { ...update, userId: user.id },
    });
  }
}
