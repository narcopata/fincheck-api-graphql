import { Injectable } from '@nestjs/common';
import { UsersRepository } from 'src/shared/database/repositories/users/users.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  public async getUserById(id: string) {
    return await this.usersRepository.findUnique({
      where: {
        id,
      },
      select: {
        email: true,
        name: true,
      },
    });
  }
}
