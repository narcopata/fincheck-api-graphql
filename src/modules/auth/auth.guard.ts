import { HTTPGraphQLRequest } from '@apollo/server';
import { CanActivate, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { env } from '~shared/config/env';
import { METADATA_TOKENS } from '~shared/metadataTokens';

type AuthGuardType = CanActivate & {
  canActivate(
    context: GqlExecutionContext,
  ): ReturnType<CanActivate['canActivate']>;
};

@Injectable()
export class AuthGuard implements AuthGuardType {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
  ) {}

  private static extractTokenFromHeader = (
    request: HTTPGraphQLRequest,
  ): string | null => {
    if (
      !('authorization' in request.headers) ||
      typeof request.headers.authorization !== 'string'
    ) {
      return null;
    }

    const [type, token] = request.headers.authorization.split(' ') ?? [];

    return type === 'Bearer' ? token : null;
  };

  async canActivate(context: GqlExecutionContext) {
    const ctx = GqlExecutionContext.create(context);

    const isPublic = this.reflector.getAllAndOverride<boolean>(
      METADATA_TOKENS.IS_PUBLIC,
      [context.getClass(), context.getHandler()],
    );

    if (isPublic) {
      return true;
    }

    const request = ctx.getContext();

    const TOKEN = AuthGuard.extractTokenFromHeader(request.req);

    if (!TOKEN) {
      throw new UnauthorizedException(
        'Você não está autorizado a acessar este recurso.',
      );
    }

    try {
      const payload: {
        [key in PropertyKey]: unknown;
      } & {
        sub: string;
      } = await this.jwtService.verifyAsync(TOKEN, {
        secret: env.jwtSecret,
      });

      request.req.userId = payload.sub;
    } catch {
      throw new UnauthorizedException(
        'Você não está autorizado a acessar este recurso.',
      );
    }

    return true;
  }
}
