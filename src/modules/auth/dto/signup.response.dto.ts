import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class SignUpResponseDTO {
  @Field()
  accessToken: string;
}
