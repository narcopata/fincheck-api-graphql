export const CATEGORY_TRANSACTION_TYPES = Object.freeze({
  INCOME: 'income',
  EXPENSE: 'expense',
});

type ValueOf<Obj extends Record<string, unknown>> = Obj[keyof Obj];

export type CategoryTransactionType = ValueOf<
  typeof CATEGORY_TRANSACTION_TYPES
>;
