import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryResolver } from './category.resolver';
import { DatabaseModule } from '~shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CategoryResolver, CategoryService],
})
export class CategoryModule {}
