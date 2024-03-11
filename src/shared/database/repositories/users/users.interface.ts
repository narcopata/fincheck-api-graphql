import { PrismaService } from '../../prisma.service';

interface IUsersRepository {
  create: PrismaService['user']['create'];
  findUnique: PrismaService['user']['findUnique'];
}

export abstract class UsersRepositoryAbstract implements IUsersRepository {
  protected readonly repository: PrismaService['user'];

  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.user;
  }

  public abstract findUnique: IUsersRepository['findUnique'];

  public abstract create: IUsersRepository['create'];
}
