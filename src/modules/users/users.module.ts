import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from '~shared/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
