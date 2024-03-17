import { Injectable } from '@nestjs/common';
import {
  CategoriesRepositoryAbstract,
  PrismaServiceCategoryMethod,
} from './categories.interface';
import { PrismaService } from '~shared/database/prisma.service';

@Injectable()
export class CategoriesRepository extends CategoriesRepositoryAbstract {
  readonly #categoriesRepository: PrismaService['category'];

  constructor(private readonly prismaService: PrismaService) {
    super();

    this.#categoriesRepository = this.prismaService.category;
  }

  public findMany<PSFn extends PrismaServiceCategoryMethod<'findMany'>>(
    ...params: PSFn['Params']
  ): PSFn['Response'] {
    return this.#categoriesRepository.findMany(...params);
  }

  public findFirst<PSFn extends PrismaServiceCategoryMethod<'findFirst'>>(
    ...params: PSFn['Params']
  ): PSFn['Response'] {
    return this.#categoriesRepository.findFirst(...params);
  }
}
