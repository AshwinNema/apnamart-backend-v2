import {
  ArgumentMetadata,
  Injectable,
  NotFoundException,
  PipeTransform,
} from '@nestjs/common';
import prisma from 'src/prisma/client';
import * as _ from 'lodash';

@Injectable()
export class ProductUpdateTransformer implements PipeTransform {
  async validateAndGetProduct(body, params, user) {
    const product = await prisma.product.findUnique({
      where: { id: params.id, merchant: user.id },
      include: {
        filterOptions: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    return product;
  }

  processData(data, product) {
    if (data.filterOptions) {
      const optionIds = _.map([...product.filterOptions], 'id');
      const newIds = _.pullAll([...data.filterOptions], [...optionIds]);
      const removedIds = _.pullAll([...optionIds], [...data.filterOptions]);
      data.filterOptions = {
        connect: newIds.map((id) => ({ id })),
        disconnect: removedIds.map((id) => ({ id })),
      };
    }

    return _.omit(data, ['filterOptions']);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    if (metadata.type !== 'custom') {
      return value;
    }

    const { body, params, user } = value;
    params.id = parseInt(params.id);
    const product = await this.validateAndGetProduct(body, params, user);

    return this.processData(body, product);
  }
}
