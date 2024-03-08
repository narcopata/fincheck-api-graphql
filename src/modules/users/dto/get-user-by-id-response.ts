import { ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@ObjectType()
export class GetUserByIdResponseDTO extends PickType(User, ['name', 'email']) {}
