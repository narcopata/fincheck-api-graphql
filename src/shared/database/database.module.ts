import { Module, ModuleMetadata } from '@nestjs/common';
import { UsersRepository } from './repositories/users/users.repository';
import { PrismaService } from './prisma.service';
import { CategoriesRepository } from './repositories/categories/categories.repository';

const moduleExports = [UsersRepository, CategoriesRepository];

const moduleProviders = [PrismaService, ...moduleExports];

const moduleData: ModuleMetadata = {
  exports: moduleExports,
  providers: moduleProviders,
};

@Module(moduleData)
export class DatabaseModule {}
