import { Injectable } from '@nestjs/common';
import { CategoriesRepository } from '~shared/database/repositories/categories/categories.repository';

@Injectable()
export class CategoryService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  public async findAllByUserId(userId: string) {
    return await this.categoriesRepository.findMany({
      where: {
        userId,
      },
    });
  }
}
