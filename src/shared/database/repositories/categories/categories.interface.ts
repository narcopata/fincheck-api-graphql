import { PrismaService } from '~shared/database/prisma.service';

type PSC = PrismaService['category'];

export type PrismaServiceCategoryMethod<Key extends keyof PSC = keyof PSC> =
  PSC[Key] extends () => unknown
    ? {
        Params: Parameters<PSC[Key]>;
        Response: ReturnType<PSC[Key]>;
      }
    : never;

interface ICategoriesRepository {
  findMany<PSFn extends PrismaServiceCategoryMethod<'findMany'>>(
    ...params: PSFn['Params']
  ): PSFn['Response'];
  findFirst<PSFn extends PrismaServiceCategoryMethod<'findFirst'>>(
    ...params: PSFn['Params']
  ): PSFn['Response'];
}

export abstract class CategoriesRepositoryAbstract
  implements ICategoriesRepository
{
  abstract findMany(
    ...params: Parameters<PrismaService['category']['findMany']>
  ): ReturnType<PrismaService['category']['findMany']>;

  abstract findFirst<PSFn extends PrismaServiceCategoryMethod<'findFirst'>>(
    ...params: PSFn['Params']
  ): PSFn['Response'];
}
