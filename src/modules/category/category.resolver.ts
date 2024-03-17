import { Query, Resolver } from '@nestjs/graphql';
import { CategoryService } from './category.service';
import { ActiveUserId } from '~shared/decorators/ActiveUserId';
import { Category } from './entities/category.entities';

@Resolver()
export class CategoryResolver {
  constructor(private readonly categoryService: CategoryService) {}

  @Query(() => [Category], {
    name: 'categories',
  })
  async findAllByUserId(
    @ActiveUserId()
    userId: string,
  ) {
    const categories = await this.categoryService.findAllByUserId(userId);

    return categories;
  }
}
