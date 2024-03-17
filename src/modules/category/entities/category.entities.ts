import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import {
  CATEGORY_TRANSACTION_TYPES,
  CategoryTransactionType,
} from '~shared/constants/category-transaction-types';

registerEnumType(CATEGORY_TRANSACTION_TYPES, {
  name: 'CategoryTransactionTypes',
});

@ObjectType()
export class Category {
  @Field()
  id: string;

  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  icon: string;

  @Field(() => CATEGORY_TRANSACTION_TYPES)
  type: CategoryTransactionType;
}
