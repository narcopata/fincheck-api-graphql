import { Injectable } from '@nestjs/common';
import { UsersRepositoryAbstract } from './users.interface';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class UsersRepository extends UsersRepositoryAbstract {
  constructor(prismaService: PrismaService) {
    super(prismaService);
  }

  public findUnique: UsersRepositoryAbstract['findUnique'] = (params) => {
    return this.repository.findUnique(params);
  };

  public create: UsersRepositoryAbstract['create'] = (params) => {
    return this.repository.create(params);
  };
}
