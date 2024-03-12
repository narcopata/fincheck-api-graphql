import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignInResponseDTO {
  @Field()
  accessToken: string;
}
