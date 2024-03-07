import { PrismaService } from '../../prisma.service';

interface IUsersRepository {
  findUnique: PrismaService['user']['findUnique'];
}

export abstract class UsersRepositoryAbstract implements IUsersRepository {
  protected readonly repository: PrismaService['user'];

  constructor(private readonly prismaService: PrismaService) {
    this.repository = this.prismaService.user;
  }

  public abstract findUnique: IUsersRepository['findUnique'];
}
