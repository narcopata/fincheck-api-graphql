import {
  ExecutionContext,
  UnauthorizedException,
  createParamDecorator,
} from '@nestjs/common';

export const ActiveUserId = createParamDecorator<undefined>(
  (_, context: ExecutionContext): string => {
    const request = context.getArgs()[2].req;

    const userId: unknown = request.userId;

    if (typeof userId !== 'string' || !userId) {
      throw new UnauthorizedException(
        'Você não está autorizado a acessar este recurso.',
      );
    }

    return userId;
  },
);
