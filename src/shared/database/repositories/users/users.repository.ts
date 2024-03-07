import { Injectable } from '@nestjs/common';
import { UsersRepositoryAbstract } from './users.interface';

@Injectable()
export class UsersRepository extends UsersRepositoryAbstract {
  public findUnique: UsersRepositoryAbstract['findUnique'] = (params) => {
    return this.repository.findUnique(params);
  };
}
