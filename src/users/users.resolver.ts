import { Resolver, Query, Args } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { GetUserByIdResponseDTO } from './dto/get-user-by-id-response';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(() => GetUserByIdResponseDTO, { name: 'user', nullable: true })
  async getUserById(@Args('id') id: string) {
    return await this.usersService.getUserById(id);
  }
}
