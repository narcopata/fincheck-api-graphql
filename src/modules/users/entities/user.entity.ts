import { ObjectType, Field, ID } from '@nestjs/graphql';
import { randomUUID } from 'crypto';

@ObjectType()
export class User {
  @Field(() => ID, {
    defaultValue: randomUUID(),
  })
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;

  @Field()
  password: string;
}
